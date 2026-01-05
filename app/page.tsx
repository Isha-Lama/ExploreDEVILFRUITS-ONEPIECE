"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchFruits } from "@/lib/queries";
import Link from "next/link";
import { Fruit } from "@/lib/types";

export default function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fruits"],
    queryFn: fetchFruits,
  });

  const [search, setSearch] = useState("");

  if (isLoading)
    return (
      <p className="p-8 text-center text-white text-lg">Loading fruits...</p>
    );
  if (error)
    return (
      <p className="p-8 text-center text-red-400 text-lg">
        Failed to load fruits
      </p>
    );

  // Ensure filteredFruits is always an array
  const filteredFruits: Fruit[] = (data ?? [])
    .filter((fruit) => fruit.filename) // only fruits with images
    .filter(
      (fruit) =>
        fruit.name.toLowerCase().includes(search.toLowerCase()) ||
        (fruit.description &&
          fruit.description.toLowerCase().includes(search.toLowerCase()))
    );

  return (
    <main className="p-8 min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-4 text-white text-center drop-shadow-md">
        Devil Fruits
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Fruits Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredFruits.length > 0 ? (
          filteredFruits.map((fruit) => (
            <Link key={fruit.id} href={`/fruits/${fruit.id}`}>
              <div className="flex flex-col items-center bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-4 h-[260px] hover:scale-105 hover:shadow-lg transition-transform cursor-pointer">
                
                {/* Image container with bluish-purple glow */}
                <div className="w-full h-32 relative mb-3 flex items-center justify-center">
                  <div className="absolute w-28 h-28 rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 blur-2xl opacity-40 transition-all duration-300 hover:opacity-70 hover:blur-3xl"></div>

                  <img
                    src={fruit.filename}
                    alt={fruit.name}
                    className="relative w-full h-full object-contain rounded-lg"
                  />
                </div>

                {/* Fruit Name */}
                <h3 className="text-white font-bold text-center text-base line-clamp-1">
                  {fruit.name}
                </h3>

                {/* Fruit Type */}
                <span className="mt-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold">
                  {fruit.type}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-white text-center col-span-full">
            No fruits found.
          </p>
        )}
      </div>
    </main>
  );
}
