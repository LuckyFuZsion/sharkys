export type GalleryItem = {
  id: string
  type: "image" | "video"
  src: string
  thumbnail: string
  alt: string
}

export type GalleryConfig = {
  items: GalleryItem[]
}
