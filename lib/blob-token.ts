function stripEnvQuotes(value: string) {
  const trimmed = value.trim()

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

export function getBlobReadWriteToken() {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    return undefined
  }

  return stripEnvQuotes(token)
}

export function requireBlobReadWriteToken() {
  const token = getBlobReadWriteToken()

  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is missing from the environment.")
  }

  return token
}

export function loadEnvFileIntoProcess(envPath: string, fs: typeof import("fs")) {
  if (!fs.existsSync(envPath)) {
    return
  }

  const content = fs.readFileSync(envPath, "utf8")

  for (const line of content.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue

    const separatorIndex = trimmed.indexOf("=")
    if (separatorIndex === -1) continue

    const key = trimmed.slice(0, separatorIndex).trim()
    const value = stripEnvQuotes(trimmed.slice(separatorIndex + 1))

    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}
