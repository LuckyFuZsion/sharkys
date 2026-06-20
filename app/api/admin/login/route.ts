import { NextResponse } from "next/server"
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  verifyAdminCredentials,
} from "@/lib/admin-auth"

export async function POST(request: Request) {
  const body = await request.json()
  const username = typeof body.username === "string" ? body.username : ""
  const password = typeof body.password === "string" ? body.password : ""

  if (!verifyAdminCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(), getAdminSessionCookieOptions())

  return response
}
