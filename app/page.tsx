"use client";

import { useState } from "react"
import ReactMarkdown from "react-markdown"

export default function Home() {
  const [url, setUrl] = useState("");
  const [roast, setRoast] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true);
    setRoast("")

    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      const data = await response.json();
      if (response.ok) {
        setRoast(data.roast)
      } else {
        setRoast(data.error)
      }
    } catch (error) {
      setRoast("Your site was so bad it broke prod.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-3xl flex flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-star">
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-8">
          Let&apos;s roast your site:
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md ">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL (e.g. example.com)"
            className="px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Roasting..." : "Roast It!"}
          </button>
        </form>
        {roast && (
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <h2 className="text-xl font-semibold">The Roast:</h2>
            <ReactMarkdown>{roast}</ReactMarkdown>
          </div>
        )}
      </main>
    </div>
  )
}