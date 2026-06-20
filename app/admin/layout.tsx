import type { Viewport } from "next"
import type React from "react"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh overflow-x-hidden pb-[env(safe-area-inset-bottom)]">{children}</div>
  )
}
