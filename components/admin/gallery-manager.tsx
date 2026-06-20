"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { GalleryItem } from "@/lib/gallery-types"
import { ArrowDownToLine, ArrowUpToLine, GripVertical, Loader2, Trash2, Upload, X } from "lucide-react"
import { bypassImageOptimization } from "@/lib/image-utils"

type SelectedPreview = {
  id: string
  file: File
  url: string
}

function fileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`
}

function previewAltText(file: File, altText: string, totalSelected: number) {
  if (totalSelected === 1 && altText.trim()) {
    return altText.trim()
  }

  const base = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim()
  if (!base) return "Gallery image"
  return base.charAt(0).toUpperCase() + base.slice(1)
}

export default function GalleryManager() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [savingOrder, setSavingOrder] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<SelectedPreview[]>([])
  const [altText, setAltText] = useState("")
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  const loadItems = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/gallery")
      const data = await response.json()

      if (response.status === 401) {
        setError("Your admin session expired. Please sign in again.")
        return
      }

      if (response.status === 404) {
        setError("Gallery API not found. Restart the dev server or deploy the latest code.")
        return
      }

      if (!response.ok) {
        setError(data.error || "Could not load gallery items.")
        return
      }

      setItems(data.items || [])
    } catch {
      setError("Could not load gallery items.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  useEffect(() => {
    return () => {
      selectedFiles.forEach((preview) => URL.revokeObjectURL(preview.url))
    }
  }, [selectedFiles])

  const persistOrder = async (nextItems: GalleryItem[]) => {
    setSavingOrder(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/admin/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: nextItems.map((item) => item.id) }),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Could not save gallery order.")
        await loadItems()
        return
      }

      setItems(data.items || nextItems)
      setSuccess("Gallery order updated.")
    } catch {
      setError("Could not save gallery order.")
      await loadItems()
    } finally {
      setSavingOrder(false)
    }
  }

  const reorderItems = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= items.length || toIndex >= items.length) {
      return
    }

    const nextItems = [...items]
    const [movedItem] = nextItems.splice(fromIndex, 1)
    nextItems.splice(toIndex, 0, movedItem)
    setItems(nextItems)
    void persistOrder(nextItems)
  }

  const moveItemToPosition = (index: number, position: number) => {
    const targetIndex = Math.max(0, Math.min(items.length - 1, position - 1))
    reorderItems(index, targetIndex)
  }

  const moveItemToStart = (index: number) => {
    reorderItems(index, 0)
  }

  const moveItemToEnd = (index: number) => {
    reorderItems(index, items.length - 1)
  }

  const handleDragStart = (index: number) => (event: React.DragEvent) => {
    if (items[index]?.id.startsWith("pending-") || savingOrder) {
      event.preventDefault()
      return
    }

    setDraggedIndex(index)
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("text/plain", String(index))
  }

  const handleDragOver = (index: number) => (event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
    if (draggedIndex !== index) {
      setDragOverIndex(index)
    }
  }

  const handleDrop = (index: number) => (event: React.DragEvent) => {
    event.preventDefault()
    const fromIndex = draggedIndex ?? Number(event.dataTransfer.getData("text/plain"))
    if (!Number.isNaN(fromIndex)) {
      reorderItems(fromIndex, index)
    }
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleFileSelection = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) {
      return
    }

    setSelectedFiles((current) => {
      const existingKeys = new Set(current.map((preview) => fileKey(preview.file)))
      const nextPreviews = Array.from(fileList)
        .filter((file) => !existingKeys.has(fileKey(file)))
        .map((file) => ({
          id: `${fileKey(file)}-${crypto.randomUUID()}`,
          file,
          url: URL.createObjectURL(file),
        }))

      return [...current, ...nextPreviews]
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const clearSelectedFiles = () => {
    setSelectedFiles((current) => {
      current.forEach((preview) => URL.revokeObjectURL(preview.url))
      return []
    })
  }

  const removePreview = (id: string) => {
    setSelectedFiles((current) => {
      const preview = current.find((entry) => entry.id === id)
      if (preview) {
        URL.revokeObjectURL(preview.url)
      }
      return current.filter((entry) => entry.id !== id)
    })
  }

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault()

    if (selectedFiles.length === 0) {
      setError("Choose one or more images to upload.")
      return
    }

    const pendingItems: GalleryItem[] = selectedFiles.map((preview) => ({
      id: `pending-${preview.id}`,
      type: "image",
      src: preview.url,
      thumbnail: preview.url,
      alt: previewAltText(preview.file, altText, selectedFiles.length),
    }))

    setItems((current) => [...current, ...pendingItems])
    setUploading(true)
    setError("")
    setSuccess("")

    try {
      const formData = new FormData()
      selectedFiles.forEach(({ file }) => formData.append("images", file))
      if (selectedFiles.length === 1 && altText.trim()) {
        formData.append("alt", altText.trim())
      }

      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()

      if (!response.ok) {
        setItems((current) => current.filter((item) => !item.id.startsWith("pending-")))
        setError(data.error || "Upload failed.")
        return
      }

      if (Array.isArray(data.items) && data.items.length > 0) {
        setItems(data.items)
      } else if (Array.isArray(data.added) && data.added.length > 0) {
        setItems((current) => [
          ...current.filter((item) => !item.id.startsWith("pending-")),
          ...data.added,
        ])
      } else {
        await loadItems()
      }

      clearSelectedFiles()
      setAltText("")
      setSuccess(
        data.count === 1 ? "Gallery image added." : `${data.count} gallery images added.`,
      )
    } catch {
      setItems((current) => current.filter((item) => !item.id.startsWith("pending-")))
      setError("Upload failed.")
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string, type: GalleryItem["type"]) => {
    if (type === "video") {
      setError("Video items cannot be deleted from the admin panel yet.")
      return
    }

    if (!window.confirm("Delete this gallery image? This cannot be undone.")) {
      return
    }

    setDeletingId(id)
    setError("")
    setSuccess("")

    try {
      const response = await fetch(`/api/admin/gallery?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Delete failed.")
        return
      }

      setItems(data.items || [])
      setSuccess("Gallery image deleted.")
    } catch {
      setError("Delete failed.")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 mt-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-2">Manage Gallery</h2>
      <p className="text-gray-600 mb-6">
        Add images in bulk, delete images, and drag to reorder the homepage gallery. You can also jump an image to a
        specific position number.
      </p>

      <form onSubmit={handleUpload} className="space-y-4 mb-8 pb-8 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-blue-900">Add gallery images</h3>

        <div className="space-y-2">
          <Label htmlFor="gallery-images">Images</Label>
          <Input
            ref={fileInputRef}
            id="gallery-images"
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => handleFileSelection(event.target.files)}
          />
          <p className="text-xs text-gray-500">
            Select one or many images. JPG, PNG, or WebP up to 10MB each.
          </p>
        </div>

        {selectedFiles.length === 1 && (
          <div className="space-y-2">
            <Label htmlFor="gallery-alt">Alt text (optional)</Label>
            <Input
              id="gallery-alt"
              value={altText}
              onChange={(event) => setAltText(event.target.value)}
              placeholder="Describe the photo for accessibility"
            />
          </div>
        )}

        {selectedFiles.length > 1 && (
          <p className="text-sm text-gray-600">
            Alt text for bulk uploads is generated from each filename.
          </p>
        )}

        {selectedFiles.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              {selectedFiles.length} image{selectedFiles.length === 1 ? "" : "s"} selected
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {selectedFiles.map((preview) => (
                <div
                  key={preview.id}
                  className="relative aspect-square rounded-md overflow-hidden border border-gray-200 group"
                >
                  <Image
                    src={preview.url}
                    alt={preview.file.name}
                    fill
                    className="object-cover"
                    sizes="120px"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={() => removePreview(preview.id)}
                    className="absolute top-1.5 right-1.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
                    aria-label={`Remove ${preview.file.name} from upload`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="bg-blue-900 hover:bg-blue-800"
          disabled={uploading || selectedFiles.length === 0}
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading {selectedFiles.length} image{selectedFiles.length === 1 ? "" : "s"}...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Add {selectedFiles.length} image{selectedFiles.length === 1 ? "" : "s"} to gallery
            </>
          )}
        </Button>
      </form>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      {success && <p className="text-sm text-green-700 mb-4">{success}</p>}

      {!loading && items.length > 0 && (
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Gallery preview</h3>
          <p className="text-sm text-gray-600 mb-4">
            Drag and drop images to reorder. This matches the order shown on the homepage gallery.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                draggable={!item.id.startsWith("pending-") && !savingOrder}
                onDragStart={handleDragStart(index)}
                onDragOver={handleDragOver(index)}
                onDrop={handleDrop(index)}
                onDragEnd={handleDragEnd}
                className={`relative aspect-square rounded-md overflow-hidden border transition-all ${
                  item.id.startsWith("pending-")
                    ? "border-blue-400 ring-2 ring-blue-200 cursor-wait"
                    : draggedIndex === index
                      ? "border-blue-500 opacity-50 cursor-grabbing"
                      : dragOverIndex === index
                        ? "border-blue-600 ring-2 ring-blue-300 scale-[1.02] cursor-grab"
                        : "border-gray-200 cursor-grab hover:border-blue-300"
                }`}
              >
                <Image
                  src={item.thumbnail || item.src}
                  alt={item.alt}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="120px"
                  unoptimized={bypassImageOptimization(item.thumbnail || item.src)}
                />
                {!item.id.startsWith("pending-") && (
                  <div className="absolute top-1.5 left-1.5 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white">
                    <GripVertical className="h-3 w-3" aria-hidden="true" />
                    {index + 1}
                  </div>
                )}
                {item.id.startsWith("pending-") && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blue-900">Gallery items</h3>
        {savingOrder && (
          <span className="text-sm text-gray-500 flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving order...
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-900" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-gray-600">No gallery items yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              draggable={!item.id.startsWith("pending-") && !savingOrder}
              onDragStart={handleDragStart(index)}
              onDragOver={handleDragOver(index)}
              onDrop={handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={`flex flex-col sm:flex-row gap-4 items-start sm:items-center border rounded-lg p-4 transition-colors ${
                dragOverIndex === index ? "border-blue-400 bg-blue-50" : "border-gray-200"
              } ${draggedIndex === index ? "opacity-50" : ""}`}
            >
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  className="text-gray-400 hover:text-blue-700 cursor-grab active:cursor-grabbing disabled:cursor-not-allowed"
                  aria-label={`Drag to reorder ${item.alt}`}
                  disabled={item.id.startsWith("pending-") || savingOrder}
                >
                  <GripVertical className="h-5 w-5" />
                </button>
                <div className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-200">
                  <Image
                    src={item.thumbnail || item.src}
                    alt={item.alt}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="96px"
                    unoptimized={bypassImageOptimization(item.thumbnail || item.src)}
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{item.alt}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.type === "video" ? "Video" : "Image"} · Position {index + 1} of {items.length}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <Label htmlFor={`position-${item.id}`} className="text-xs text-gray-500 whitespace-nowrap">
                    Move to
                  </Label>
                  <Input
                    id={`position-${item.id}`}
                    type="number"
                    min={1}
                    max={items.length}
                    defaultValue={index + 1}
                    key={`${item.id}-${index}`}
                    className="w-20 h-9"
                    disabled={item.id.startsWith("pending-") || savingOrder}
                    onKeyDown={(event) => {
                      if (event.key !== "Enter") return
                      event.currentTarget.blur()
                    }}
                    onBlur={(event) => {
                      const nextPosition = Number(event.target.value)
                      if (!Number.isInteger(nextPosition) || nextPosition === index + 1) {
                        event.target.value = String(index + 1)
                        return
                      }
                      moveItemToPosition(index, nextPosition)
                    }}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => moveItemToStart(index)}
                  disabled={index === 0 || item.id.startsWith("pending-") || savingOrder}
                  aria-label="Move to start"
                >
                  <ArrowUpToLine className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => moveItemToEnd(index)}
                  disabled={index === items.length - 1 || item.id.startsWith("pending-") || savingOrder}
                  aria-label="Move to end"
                >
                  <ArrowDownToLine className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(item.id, item.type)}
                  disabled={deletingId === item.id || item.type === "video"}
                  aria-label="Delete image"
                >
                  {deletingId === item.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
