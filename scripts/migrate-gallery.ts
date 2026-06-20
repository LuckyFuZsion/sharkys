import { readFileSync, existsSync } from "fs"
import { join } from "path"
import { put } from "@vercel/blob"
import { loadEnvFileIntoProcess, requireBlobReadWriteToken } from "../lib/blob-token"
import { DEFAULT_GALLERY_ITEMS } from "../lib/gallery-defaults"
import { seedGalleryConfig, GALLERY_BLOB_PREFIX } from "../lib/gallery"
import type { GalleryItem } from "../lib/gallery-types"

import { SITE_URL } from "../lib/site-config"

const SITE_ORIGIN = process.env.GALLERY_MIGRATE_ORIGIN || SITE_URL

async function loadAsset(pathOrUrl: string) {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    const response = await fetch(pathOrUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${pathOrUrl}: ${response.status}`)
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream"
    const buffer = Buffer.from(await response.arrayBuffer())
    return { buffer, contentType, extension: contentType.includes("png") ? "png" : "jpg" }
  }

  const localPath = join(process.cwd(), "public", pathOrUrl.replace(/^\//, ""))
  if (existsSync(localPath)) {
    const buffer = readFileSync(localPath)
    const extension = localPath.split(".").pop()?.toLowerCase() || "jpg"
    const contentType = extension === "png" ? "image/png" : "image/jpeg"
    return { buffer, contentType, extension }
  }

  const remoteUrl = `${SITE_ORIGIN}${pathOrUrl}`
  const response = await fetch(remoteUrl)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${remoteUrl}: ${response.status}`)
  }

  const contentType = response.headers.get("content-type") || "image/jpeg"
  const buffer = Buffer.from(await response.arrayBuffer())
  const extension = pathOrUrl.split(".").pop()?.toLowerCase() || "jpg"
  return { buffer, contentType, extension }
}

async function migrateGallery() {
  loadEnvFileIntoProcess(join(process.cwd(), ".env.local"), { existsSync, readFileSync })
  const token = requireBlobReadWriteToken()

  console.log("Migrating gallery items to Vercel Blob...")
  const migratedItems: GalleryItem[] = []

  for (const item of DEFAULT_GALLERY_ITEMS) {
    if (item.type === "video") {
      console.log(`Keeping video item: ${item.id}`)
      migratedItems.push(item)
      continue
    }

    if (item.src.includes(".blob.vercel-storage.com/")) {
      console.log(`Keeping existing blob item: ${item.id}`)
      migratedItems.push(item)
      continue
    }

    console.log(`Uploading ${item.id}: ${item.src}`)
    const asset = await loadAsset(item.src)
    const pathname = `${GALLERY_BLOB_PREFIX}${item.id}.${asset.extension}`
    const blob = await put(pathname, asset.buffer, {
      access: "public",
      addRandomSuffix: false,
      contentType: asset.contentType,
      allowOverwrite: true,
      token,
    })

    migratedItems.push({
      ...item,
      src: blob.url,
      thumbnail: blob.url,
    })
  }

  await seedGalleryConfig(migratedItems)
  console.log(`Migration complete. Saved ${migratedItems.length} gallery items to blob config.`)
}

migrateGallery().catch((error) => {
  console.error(error)
  process.exit(1)
})
