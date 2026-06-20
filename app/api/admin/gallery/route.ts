import { NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { addGalleryImages, deleteGalleryItem, getGalleryItems, saveGalleryOrder } from "@/lib/gallery"
import type { GalleryItem } from "@/lib/gallery-types"

export async function GET() {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const items = await getGalleryItems()
  return NextResponse.json({ items })
}

export async function POST(request: Request) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const alt = typeof formData.get("alt") === "string" ? formData.get("alt") : ""
  const files = [
    ...formData.getAll("images"),
    ...(formData.get("image") instanceof File ? [formData.get("image")] : []),
  ].filter((entry): entry is File => entry instanceof File && entry.size > 0)

  if (files.length === 0) {
    return NextResponse.json({ error: "At least one image file is required" }, { status: 400 })
  }

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Each image must be 10MB or smaller" }, { status: 400 })
    }
  }

  try {
    const added = await addGalleryImages(files, alt || "")
    const items = await getGalleryItems()
    return NextResponse.json({ success: true, added, count: added.length, items })
  } catch (error) {
    console.error("Gallery upload failed:", error)
    return NextResponse.json(
      { error: "Upload failed. Check that BLOB_READ_WRITE_TOKEN is configured." },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const order = Array.isArray(body.order) ? body.order : null

  if (!order || !order.every((id: unknown) => typeof id === "string")) {
    return NextResponse.json({ error: "A valid order array is required" }, { status: 400 })
  }

  const currentItems = await getGalleryItems()
  const itemMap = new Map(currentItems.map((item) => [item.id, item]))
  const reorderedItems: GalleryItem[] = []

  for (const id of order) {
    const item = itemMap.get(id)
    if (item) {
      reorderedItems.push(item)
      itemMap.delete(id)
    }
  }

  for (const item of itemMap.values()) {
    reorderedItems.push(item)
  }

  await saveGalleryOrder(reorderedItems)

  return NextResponse.json({ success: true, items: reorderedItems })
}

export async function DELETE(request: Request) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Item id is required" }, { status: 400 })
  }

  try {
    const deleted = await deleteGalleryItem(id)
    if (!deleted) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 })
    }

    const items = await getGalleryItems()
    return NextResponse.json({ success: true, items })
  } catch (error) {
    console.error("Gallery delete failed:", error)
    return NextResponse.json({ error: "Delete failed." }, { status: 500 })
  }
}
