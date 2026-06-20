import { list, put } from "@vercel/blob"
import { getBlobReadWriteToken } from "@/lib/blob-token"

function blobOptions() {
  const token = getBlobReadWriteToken()
  return token ? { token } : undefined
}

export async function readJsonFromBlob<T>(path: string): Promise<T | null> {
  const { blobs } = await list({ prefix: path, limit: 1, ...blobOptions() })

  if (!blobs.length) {
    return null
  }

  const response = await fetch(blobs[0].url, { cache: "no-store" })
  if (!response.ok) {
    return null
  }

  return response.json()
}

export async function writeJsonToBlob<T>(path: string, data: T) {
  await put(path, JSON.stringify(data), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
    allowOverwrite: true,
    ...blobOptions(),
  })
}
