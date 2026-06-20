import { del, list, put } from "@vercel/blob"
import { DEFAULT_SPORTS_PROMO_URL } from "@/lib/sports-promo-constants"

export { DEFAULT_SPORTS_PROMO_URL }

/** Vercel Blob folder: store_GxciiOAbWRKAHdfe / Sharkys */
const BLOB_FOLDER = "Sharkys"
const CONFIG_BLOB_PATH = `${BLOB_FOLDER}/sports-promo-config.json`
const PROMO_BLOB_PREFIX = `${BLOB_FOLDER}/sports-promo/`

type SportsPromoConfig = {
  url: string
}

function isVercelBlobUrl(url: string) {
  return url.includes(".blob.vercel-storage.com/")
}

async function readConfigFromBlob(): Promise<SportsPromoConfig | null> {
  const { blobs } = await list({ prefix: CONFIG_BLOB_PATH, limit: 1 })

  if (!blobs.length) {
    return null
  }

  const response = await fetch(blobs[0].url, { cache: "no-store" })
  if (!response.ok) {
    return null
  }

  return response.json()
}

export async function getSportsPromoUrl() {
  try {
    const config = await readConfigFromBlob()
    return config?.url || DEFAULT_SPORTS_PROMO_URL
  } catch {
    return DEFAULT_SPORTS_PROMO_URL
  }
}

async function saveSportsPromoConfig(url: string) {
  await put(CONFIG_BLOB_PATH, JSON.stringify({ url }), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
    allowOverwrite: true,
  })
}

export async function uploadSportsPromoImage(file: File) {
  const currentUrl = await getSportsPromoUrl()
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg"
  const pathname = `${PROMO_BLOB_PREFIX}weekend-promo-${Date.now()}.${extension}`

  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type || "image/jpeg",
  })

  await saveSportsPromoConfig(blob.url)

  if (isVercelBlobUrl(currentUrl)) {
    try {
      await del(currentUrl)
    } catch {
      // Old blob may already be removed; continue with the new upload.
    }
  }

  return blob.url
}
