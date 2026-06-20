"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { GalleryItem } from "@/lib/gallery-types"
import { ArrowDown, ArrowUp, Loader2, Trash2, Upload, X } from "lucide-react"

type SelectedPreview = {
  id: string
  file: File
  url: string
}

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [savingOrder, setSavingOrder] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<SelectedPreview[]>([])
  const [altText, setAltText] = useState("")
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

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

  const moveItem = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= items.length) return

    const nextItems = [...items]
    const [movedItem] = nextItems.splice(index, 1)
    nextItems.splice(targetIndex, 0, movedItem)
    setItems(nextItems)
    void persistOrder(nextItems)
  }

  const handleFileSelection = (fileList: FileList | null) => {
    selectedFiles.forEach((preview) => URL.revokeObjectURL(preview.url))

    if (!fileList || fileList.length === 0) {
      setSelectedFiles([])
      return
    }

    const previews = Array.from(fileList).map((file) => ({
      id: `${file.name}-${file.lastModified}-${file.size}-${crypto.randomUUID()}`,
      file,
      url: URL.createObjectURL(file),
    }))

    setSelectedFiles(previews)
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
        setError(data.error || "Upload failed.")
        return
      }

      setItems(data.items || [])
      handleFileSelection(null)
      setAltText("")
      setSuccess(
        data.count === 1 ? "Gallery image added." : `${data.count} gallery images added.`,
      )
    } catch {
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
        Add images in bulk, delete images, and change the order shown on the homepage gallery.
      </p>

      <form onSubmit={handleUpload} className="space-y-4 mb-8 pb-8 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-blue-900">Add gallery images</h3>

        <div className="space-y-2">
          <Label htmlFor="gallery-images">Images</Label>
          <Input
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
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center border border-gray-200 rounded-lg p-4"
            >
              <div className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-200 shrink-0">
                <Image
                  src={item.thumbnail || item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{item.alt}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.type === "video" ? "Video" : "Image"} · Position {index + 1}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0 || savingOrder}
                  aria-label="Move up"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => moveItem(index, 1)}
                  disabled={index === items.length - 1 || savingOrder}
                  aria-label="Move down"
                >
                  <ArrowDown className="h-4 w-4" />
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
