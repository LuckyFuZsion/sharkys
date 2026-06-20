"""Scrape TripAdvisor reviews for Sharky's Bar via internal GraphQL API."""
from __future__ import annotations

import json
import random
import re
import string
import sys
import time
from datetime import datetime
from pathlib import Path

from curl_cffi import requests as cffi_requests

GRAPHQL_URL = "https://www.tripadvisor.co.uk/data/graphql/ids"
QUERY_ID = "ef1a9f94012220d3"
REVIEWS_PER_PAGE = 20
LOCATION_ID = 10049522
OUTPUT_PATH = Path(__file__).parent.parent / "lib" / "reviews-data.json"
RATING_PATH = Path(__file__).parent.parent / "lib" / "tripadvisor-meta.json"


def generate_request_id(length: int = 180) -> str:
    chars = string.ascii_letters + string.digits
    return "".join(random.choices(chars, k=length))


def build_headers() -> dict[str, str]:
    request_id = generate_request_id()
    return {
        "Origin": "https://www.tripadvisor.co.uk",
        "Referer": "https://www.tripadvisor.co.uk/",
        "Pragma": "no-cache",
        "X-Requested-By": request_id,
        "Cookie": f"TAUnique={request_id}",
        "Content-Type": "application/json;charset=utf-8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-GB,en;q=0.9",
    }


def fetch_reviews_page(offset: int) -> dict | None:
    payload = [
        {
            "variables": {
                "locationId": LOCATION_ID,
                "offset": offset,
                "limit": REVIEWS_PER_PAGE,
            },
            "extensions": {"preRegisteredQueryId": QUERY_ID},
        }
    ]

    for attempt in range(1, 4):
        try:
            resp = cffi_requests.post(
                GRAPHQL_URL,
                headers=build_headers(),
                json=payload,
                impersonate="chrome124",
                timeout=30,
            )
            if resp.status_code in (429, 403):
                wait = 10 * attempt
                print(f"  [{resp.status_code}] blocked, retrying in {wait}s...")
                time.sleep(wait)
                continue
            resp.raise_for_status()
            data = resp.json()
            if isinstance(data, list) and data and "errors" in data[0]:
                print(f"  GraphQL error: {data[0]['errors'][0].get('message', 'unknown')}")
                return None
            return data
        except Exception as exc:
            print(f"  Request error (attempt {attempt}/3): {exc}")
            time.sleep(5 * attempt)
    return None


def format_date(published: str) -> str:
    if not published:
        return ""
    try:
        dt = datetime.fromisoformat(published.replace("Z", "+00:00"))
        return dt.strftime("%B %Y")
    except ValueError:
        return published[:10]


def parse_reviews(raw: list) -> tuple[list[dict], int]:
    reviews: list[dict] = []
    total = 0

    page = raw[0]["data"]["ReviewsProxy_getReviewListPageForLocation"][0]
    total = page.get("totalCount", 0)

    for r in page.get("reviews", []):
        user_profile = r.get("userProfile") or {}
        reviews.append(
            {
                "tripadvisorId": r.get("id", 0),
                "author": user_profile.get("displayName") or user_profile.get("username") or "Anonymous",
                "rating": r.get("rating", 0),
                "title": r.get("title", ""),
                "content": r.get("text", ""),
                "date": format_date(r.get("publishedDate", "")),
                "publishedDate": r.get("publishedDate", ""),
            }
        )

    return reviews, total


def fetch_location_meta() -> dict:
    url = f"https://www.tripadvisor.co.uk/data/1.0/location/{LOCATION_ID}"
    resp = cffi_requests.get(url, impersonate="chrome124", timeout=30)
    resp.raise_for_status()
    data = resp.json()
    return {
        "rating": float(data.get("rating", 0)),
        "reviewCount": int(data.get("num_reviews", 0)),
        "name": data.get("name", "Sharky's Bar"),
    }


def scrape_all() -> dict:
    print(f"Fetching location metadata for {LOCATION_ID}...")
    meta = fetch_location_meta()
    print(f"  {meta['name']}: {meta['rating']} stars, {meta['reviewCount']} reviews")

    all_reviews: list[dict] = []
    seen_ids: set[int] = set()
    offset = 0
    total = meta["reviewCount"]

    while True:
        print(f"Fetching offset={offset}...", end=" ", flush=True)
        raw = fetch_reviews_page(offset)
        if raw is None:
            print("FAILED")
            break

        page_reviews, api_total = parse_reviews(raw)
        if api_total:
            total = api_total

        new_count = 0
        for review in page_reviews:
            tid = review["tripadvisorId"]
            if tid not in seen_ids:
                seen_ids.add(tid)
                all_reviews.append(review)
                new_count += 1

        print(f"OK (+{new_count}, total {len(all_reviews)}/{total})")

        if not page_reviews:
            break
        if len(all_reviews) >= total:
            break

        offset += REVIEWS_PER_PAGE
        time.sleep(random.uniform(2, 4))

    return {
        "meta": meta,
        "scrapedAt": datetime.now().isoformat(),
        "totalScraped": len(all_reviews),
        "reviews": all_reviews,
    }


def generate_typescript(data: dict) -> str:
    reviews = data["reviews"]
    meta = data["meta"]

    lines = [
        'import type { ReviewType } from "./types"',
        "",
        f"// Auto-scraped from TripAdvisor on {data['scrapedAt'][:10]}",
        f"// {meta['name']}: {meta['rating']} rating, {meta['reviewCount']} total reviews",
        f"// Scraped {data['totalScraped']} reviews",
        "",
        "export const tripAdvisorMeta = {",
        f'  rating: {meta["rating"]},',
        f'  reviewCount: {meta["reviewCount"]},',
        "}",
        "",
        "export const reviews: ReviewType[] = [",
    ]

    for i, r in enumerate(reviews, 1):
        title = json.dumps(r["title"], ensure_ascii=False)
        content = json.dumps(r["content"], ensure_ascii=False)
        author = json.dumps(r["author"], ensure_ascii=False)
        date = json.dumps(r["date"], ensure_ascii=False)
        lines.append("  {")
        lines.append(f"    id: {i},")
        lines.append(f"    author: {author},")
        lines.append(f"    rating: {r['rating']},")
        lines.append(f"    title: {title},")
        lines.append(f"    content: {content},")
        lines.append(f"    date: {date},")
        lines.append("  },")

    lines.append("]")
    lines.append("")
    return "\n".join(lines)


def main() -> None:
    data = scrape_all()

    OUTPUT_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nRaw JSON saved to {OUTPUT_PATH}")

    ts_path = Path(__file__).parent.parent / "lib" / "data.ts"
    ts_content = generate_typescript(data)
    ts_path.write_text(ts_content, encoding="utf-8")
    print(f"TypeScript data saved to {ts_path}")

    print(f"\nDone: {data['totalScraped']} reviews scraped ({data['meta']['rating']} stars, {data['meta']['reviewCount']} total on TripAdvisor)")


if __name__ == "__main__":
    main()
