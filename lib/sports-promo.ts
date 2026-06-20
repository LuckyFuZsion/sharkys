import { del, put } from "@vercel/blob"
import { readJsonFromBlob, writeJsonToBlob } from "@/lib/blob-config"
import { BLOB_FOLDER } from "@/lib/blob-constants"
import { getBlobReadWriteToken } from "@/lib/blob-token"
import { DEFAULT_SPORTS_PROMO_URL } from "@/lib/sports-promo-constants"

export { DEFAULT_SPORTS_PROMO_URL }

const CONFIG_BLOB_PATH = `${BLOB_FOLDER}/sports-promo-config.json`
const PROMO_BLOB_PREFIX = `${BLOB_FOLDER}/sports-promo/`

function blobOptions() {
  const token = getBlobReadWriteToken()
  return token ? { token } : undefined
}

type SportsPromoConfig = {
  url: string
}

function isVercelBlobUrl(url: string) {
  return url.includes(".blob.vercel-storage.com/")
}

async function readConfigFromBlob(): Promise<SportsPromoConfig | null> {
  return readJsonFromBlob<SportsPromoConfig>(CONFIG_BLOB_PATH)
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
  await writeJsonToBlob<SportsPromoConfig>(CONFIG_BLOB_PATH, { url })
}

export async function uploadSportsPromoImage(file: File) {
  const currentUrl = await getSportsPromoUrl()
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg"
  const pathname = `${PROMO_BLOB_PREFIX}weekend-promo-${Date.now()}.${extension}`

  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type || "image/jpeg",
    ...blobOptions(),
  })

  await saveSportsPromoConfig(blob.url)

  if (isVercelBlobUrl(currentUrl)) {
    try {
      await del(currentUrl, blobOptions())
    } catch {
      // Old blob may already be removed; continue with the new upload.
    }
  }

  return blob.url
}
