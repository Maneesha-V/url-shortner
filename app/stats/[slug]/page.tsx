"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { StatsProps } from "@/interfaces/statsInterface";

export default function StatsPage() {
  const { slug } = useParams();
  const [stats, setStats] = useState<StatsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch(`/api/stats/${slug}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setStats(data);
      }
      setLoading(false);
    }

    fetchStats();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">Link Stats</h1>

        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <p className="text-gray-400 text-sm mb-1">Short URL</p>
          <p className="text-blue-400 font-semibold">
            http://localhost:3000/{slug}
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <p className="text-gray-400 text-sm mb-1">Original URL</p>
          <a
            href={stats?.url}
            target="_blank"
            className="text-white break-all hover:underline"
          >
            {stats?.url}
          </a>
        </div>

        <div className="bg-blue-600 p-6 rounded-lg text-center">
          <p className="text-blue-200 text-sm mb-1">Total Visits</p>
          <p className="text-5xl font-bold">{stats?.hits}</p>
        </div>

        <a
          href="/"
          className="mt-6 block text-center text-gray-400 hover:text-white transition"
        >
          ← Shorten another URL
        </a>

      </div>
    </main>
  );
}