export type ReviewSource = "tripadvisor" | "google" | "facebook"

export type ReviewType = {
  id: number
  source?: ReviewSource
  author: string
  avatar?: string
  rating: number
  title: string
  content: string
  date: string
}
