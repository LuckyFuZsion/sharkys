/** Local browser URLs cannot be processed by the Next.js image optimizer. */
export function bypassImageOptimization(src: string): boolean {
  return src.startsWith("blob:") || src.startsWith("data:")
}
