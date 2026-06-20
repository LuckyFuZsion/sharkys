import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

export const ADMIN_SESSION_COOKIE = "sharkys_admin_session"
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24

function getSessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.admin_password ||
    process.env.ADMIN_PASSWORD ||
    "sharkys-admin-fallback"
  )
}

export function getAdminCredentials() {
  return {
    username:
      process.env.admin_username ||
      process.env.ADMIN_USERNAME ||
      process.env.admin_udername ||
      "",
    password:
      process.env.admin_password ||
      process.env.ADMIN_PASSWORD ||
      process.env.admin_passwords ||
      "",
  }
}

export function verifyAdminCredentials(username: string, password: string) {
  const expected = getAdminCredentials()

  if (!expected.username || !expected.password) {
    return false
  }

  const usernameMatch =
    username.length === expected.username.length &&
    timingSafeEqual(Buffer.from(username), Buffer.from(expected.username))
  const passwordMatch =
    password.length === expected.password.length &&
    timingSafeEqual(Buffer.from(password), Buffer.from(expected.password))

  return usernameMatch && passwordMatch
}

function signPayload(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex")
}

export function createAdminSessionToken() {
  const payload = `admin:${Date.now()}`
  return `${payload}.${signPayload(payload)}`
}

export function verifyAdminSessionToken(token: string | undefined) {
  if (!token) return false

  const separatorIndex = token.lastIndexOf(".")
  if (separatorIndex === -1) return false

  const payload = token.slice(0, separatorIndex)
  const signature = token.slice(separatorIndex + 1)

  if (!payload.startsWith("admin:")) return false

  const expectedSignature = signPayload(payload)
  if (signature.length !== expectedSignature.length) return false

  return timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  return verifyAdminSessionToken(token)
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  }
}
