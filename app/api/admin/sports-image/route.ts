import { NextResponse } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { getSportsPromoUrl, uploadSportsPromoImage } from "@/lib/sports-promo"

export async function GET() {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = await getSportsPromoUrl()
  return NextResponse.json({ url })
}

export async function POST(request: Request) {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("image")

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "An image file is required" }, { status: 400 })
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 })
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "Image must be 10MB or smaller" }, { status: 400 })
  }

  try {
    const url = await uploadSportsPromoImage(file)
    return NextResponse.json({ success: true, url })
  } catch (error) {
    console.error("Sports image upload failed:", error)
    return NextResponse.json(
      { error: "Upload failed. Check that BLOB_READ_WRITE_TOKEN is configured." },
      { status: 500 },
    )
  }
}
