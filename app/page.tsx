"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleShorten() {
    setLoading(true);
    setError("");
    setShortUrl("");
    const res = await fetch("/api/shorten",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ url })
    })
    const data = await res.json();
    setLoading(false);
    if(data.error){
      setError(data.error)
    }else{
      setShortUrl(data.shortUrl)
    }
  }
  return (
     <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
        
        <h1 className="text-3xl font-bold text-center text-green-300 mb-2">URL Shortener</h1>
        <p className="text-gray-400 text-center mb-6">Paste a long URL and get a short one</p>

        <input
          type="text"
          placeholder="Type original url here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500 mb-4"
        />

        <button
          onClick={handleShorten}
          disabled={loading || !url}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 rounded-lg transition"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>

        {error && (
          <p className="mt-4 text-red-400 text-center">{error}</p>
        )}

        {shortUrl && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center">
            <p className="text-gray-400 text-sm mb-2">Your short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              className="text-blue-400 font-semibold break-all hover:underline"
            >
              {shortUrl}
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              className="mt-3 w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg text-sm transition"
            >
              Copy to Clipboard
            </button>
            <a href={`/stats/${shortUrl.split("/").pop()}`}
            className="mt-3 block text-center text-gray-400 hover:text-white text-sm transition"
            >
              View Stats →
            </a>
          </div>
        )}

      </div>
    </main>
  );
}
