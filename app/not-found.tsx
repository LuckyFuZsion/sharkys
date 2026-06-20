import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">Page not found</h1>
        <p className="text-gray-600 mb-6">That page does not exist.</p>
        <Link href="/" className="text-blue-700 hover:underline">
          Back to Sharky&apos;s Bar
        </Link>
      </div>
    </main>
  )
}
