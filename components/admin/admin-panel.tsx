"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, LogOut, Upload } from "lucide-react"

export default function AdminPanel() {
  const [checkingSession, setCheckingSession] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [loggingIn, setLoggingIn] = useState(false)

  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState("")
  const [uploadSuccess, setUploadSuccess] = useState("")
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetch("/api/admin/session")
      .then((res) => res.json())
      .then((data) => setAuthenticated(Boolean(data.authenticated)))
      .finally(() => setCheckingSession(false))
  }, [])

  useEffect(() => {
    if (!authenticated) return

    fetch("/api/admin/sports-image")
      .then((res) => res.json())
      .then((data) => {
        if (data.url) setCurrentImageUrl(data.url)
      })
      .catch(() => setUploadError("Could not load the current sports image."))
  }, [authenticated])

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoggingIn(true)
    setLoginError("")

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        setLoginError("Invalid username or password")
        return
      }

      setAuthenticated(true)
      setPassword("")
    } catch {
      setLoginError("Login failed. Please try again.")
    } finally {
      setLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    setAuthenticated(false)
    setSelectedFile(null)
    setCurrentImageUrl(null)
    setUploadError("")
    setUploadSuccess("")
  }

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!selectedFile) {
      setUploadError("Choose an image to upload.")
      return
    }

    setUploading(true)
    setUploadError("")
    setUploadSuccess("")

    try {
      const formData = new FormData()
      formData.append("image", selectedFile)

      const response = await fetch("/api/admin/sports-image", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        setUploadError(data.error || "Upload failed.")
        return
      }

      setCurrentImageUrl(data.url)
      setSelectedFile(null)
      setUploadSuccess("Sports promo image updated. The homepage sports section will show the new image.")
    } catch {
      setUploadError("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-900" />
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">Sharky&apos;s Admin</h1>
          <p className="text-gray-600 mb-6">Sign in to manage site content.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {loginError && <p className="text-sm text-red-600">{loginError}</p>}

            <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800" disabled={loggingIn}>
              {loggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-blue-700 hover:underline">
              Back to website
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Sharky&apos;s Admin</h1>
            <p className="text-blue-100 text-sm">Content management</p>
          </div>
          <Button variant="outline" className="text-blue-900 bg-white hover:bg-blue-50" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Log out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Add Sports Image</h2>
          <p className="text-gray-600 mb-6">
            Upload a new image for the weekend sports promo on the Live Sports section. The previous blob image will be
            deleted and replaced.
          </p>

          {currentImageUrl && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Current image</p>
              <div className="relative rounded-lg overflow-hidden border border-gray-200 max-w-md">
                <Image
                  src={currentImageUrl}
                  alt="Current sports promo"
                  width={600}
                  height={600}
                  className="w-full object-cover"
                  unoptimized
                />
              </div>
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sports-image">New sports promo image</Label>
              <Input
                id="sports-image"
                type="file"
                accept="image/*"
                onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
              />
              <p className="text-xs text-gray-500">JPG, PNG, or WebP up to 10MB.</p>
            </div>

            {previewUrl && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
                <div className="relative rounded-lg overflow-hidden border border-gray-200 max-w-md">
                  <Image
                    src={previewUrl}
                    alt="Sports promo preview"
                    width={600}
                    height={600}
                    className="w-full object-cover"
                    unoptimized
                  />
                </div>
              </div>
            )}

            {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
            {uploadSuccess && <p className="text-sm text-green-700">{uploadSuccess}</p>}

            <Button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800"
              disabled={uploading || !selectedFile}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Replace sports image
                </>
              )}
            </Button>
          </form>
        </section>

        <div className="mt-6 text-center">
          <Link href="/#sports" className="text-sm text-blue-700 hover:underline">
            View sports section on homepage
          </Link>
        </div>
      </main>
    </div>
  )
}
