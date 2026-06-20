import { NextResponse } from "next/server"
import { getSportsPromoUrl } from "@/lib/sports-promo"

export async function GET() {
  const url = await getSportsPromoUrl()
  return NextResponse.json(
    { url },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  )
}
