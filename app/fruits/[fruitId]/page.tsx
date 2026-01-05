"use client"; // ✅ Important: mark as client

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchFruits } from "@/lib/queries";
import { useParams } from "next/navigation";

type Fruit = {
  id: number;
  name: string;
  type: string;
  description: string;
  filename: string;
};

export default function FruitDetail() {
  const params = useParams();
  const fruitId = Number(params?.fruitId);

  const [fruit, setFruit] = useState<Fruit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFruit = async () => {
      const fruits = await fetchFruits();
      const f = fruits.find((fruit) => fruit.id === fruitId);
      setFruit(f ?? null);
      setLoading(false);
    };
    loadFruit();
  }, [fruitId]);

  if (loading)
    return (
      <p className="p-8 text-center text-white text-lg">Loading fruit...</p>
    );

  if (!fruit)
    return (
      <p className="p-8 text-center text-red-400 text-lg">Fruit not found</p>
    );

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-800 to-black p-6">

      {/* OUTER WRAPPER (allows overflow) */}
      <div className="relative max-w-md w-full">

        {/* LUFFY – outside card, touching border */}
        <div className="absolute -right-60.5 top-[77%] -translate-y-1/2 z-20 pointer-events-none opacity-50">
  <Image
    src="/luffy-bg.png"
    alt="Luffy peeking"
    width={320}
    height={220}
    className="object-contain drop-shadow-xl"
  />
</div>


        {/* CARD */}
        <div className="relative bg-white/5 border border-white/20 backdrop-blur-md rounded-3xl p-8 shadow-lg flex flex-col items-center gap-6 overflow-hidden">

          {/* Glows (CLIPPED INSIDE CARD) */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-40 blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 opacity-30 blur-3xl animate-pulse-slow"></div>

          {/* Fruit Image */}
          <div className="relative w-64 h-64 flex items-center justify-center z-10">
            <div className="absolute w-56 h-56 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 blur-2xl opacity-50 animate-pulse-slow"></div>
            <Image
              src={fruit.filename}
              alt={fruit.name}
              width={250}
              height={250}
              className="relative rounded-lg shadow-xl"
            />
          </div>

          {/* Fruit Name */}
          <h1 className="text-3xl font-bold text-white drop-shadow-lg z-10">
            {fruit.name}
          </h1>

          {/* Fruit Type */}
          <span className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium drop-shadow-md z-10">
            {fruit.type}
          </span>

          {/* Fruit Description */}
          <p className="text-white/70 text-center z-10">
            {fruit.description}
          </p>

          {/* Sparkles (inside only) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-50 animate-float"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.15); opacity: 0.7; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 6s ease-in-out infinite;
          }

          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
            100% { transform: translateY(0) rotate(360deg); opacity: 0.5; }
          }
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
        `}
      </style>
    </main>
  );
}
