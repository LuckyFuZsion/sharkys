import { del, put } from "@vercel/blob"
import { readJsonFromBlob, writeJsonToBlob } from "@/lib/blob-config"
import { BLOB_FOLDER } from "@/lib/blob-constants"
import { getBlobReadWriteToken } from "@/lib/blob-token"
import { DEFAULT_GALLERY_ITEMS } from "@/lib/gallery-defaults"
import type { GalleryConfig, GalleryItem } from "@/lib/gallery-types"

const GALLERY_CONFIG_PATH = `${BLOB_FOLDER}/gallery-config.json`
const GALLERY_BLOB_PREFIX = `${BLOB_FOLDER}/gallery/`

function blobOptions() {
  const token = getBlobReadWriteToken()
  return token ? { token } : undefined
}

function isManagedBlobUrl(url: string) {
  return url.includes(".blob.vercel-storage.com/") && url.includes(`/${BLOB_FOLDER}/gallery/`)
}

async function readGalleryConfig(): Promise<GalleryConfig | null> {
  return readJsonFromBlob<GalleryConfig>(GALLERY_CONFIG_PATH)
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const config = await readGalleryConfig()
    if (config?.items?.length) {
      return config.items
    }
  } catch {
    // Fall back to defaults when blob is unavailable.
  }

  return DEFAULT_GALLERY_ITEMS
}

async function saveGalleryItems(items: GalleryItem[]) {
  await writeJsonToBlob<GalleryConfig>(GALLERY_CONFIG_PATH, { items })
}

export async function saveGalleryOrder(items: GalleryItem[]) {
  await saveGalleryItems(items)
}

function humanizeFilename(filename: string) {
  const base = filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim()
  if (!base) return "Gallery image"
  return base.charAt(0).toUpperCase() + base.slice(1)
}

async function uploadGalleryFile(file: File, id: string) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg"
  const pathname = `${GALLERY_BLOB_PREFIX}${id}.${extension}`

  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type || "image/jpeg",
    ...blobOptions(),
  })

  return blob.url
}

export async function addGalleryImages(files: File[], alt = "") {
  const items = await getGalleryItems()
  const baseTime = Date.now()
  const newItems: GalleryItem[] = []

  for (let index = 0; index < files.length; index++) {
    const file = files[index]
    const id = `gallery-${baseTime}-${index}`
    const url = await uploadGalleryFile(file, id)
    const itemAlt =
      files.length === 1 && alt.trim() ? alt.trim() : humanizeFilename(file.name)

    newItems.push({
      id,
      type: "image",
      src: url,
      thumbnail: url,
      alt: itemAlt,
    })
  }

  await saveGalleryItems([...items, ...newItems])

  return newItems
}

export async function addGalleryImage(file: File, alt: string) {
  const [item] = await addGalleryImages([file], alt)
  return item
}

async function deleteBlobIfManaged(url: string) {
  if (!isManagedBlobUrl(url)) {
    return
  }

  try {
    await del(url, blobOptions())
  } catch {
    // Blob may already be removed.
  }
}

export async function deleteGalleryItem(id: string) {
  const items = await getGalleryItems()
  const item = items.find((entry) => entry.id === id)

  if (!item) {
    return null
  }

  if (item.type === "image") {
    await deleteBlobIfManaged(item.src)
    if (item.thumbnail !== item.src) {
      await deleteBlobIfManaged(item.thumbnail)
    }
  }

  const nextItems = items.filter((entry) => entry.id !== id)
  await saveGalleryItems(nextItems)

  return item
}

export async function seedGalleryConfig(items: GalleryItem[]) {
  await saveGalleryItems(items)
  return items
}

export { GALLERY_BLOB_PREFIX, GALLERY_CONFIG_PATH }
