"use client"; // mark as client for effects and animations

import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchFruits } from "@/lib/queries";

type Fruit = {
  id: number;
  name: string;
  type: string;
  description: string;
  filename: string;
};

type Props = {
  params: { fruitId: string };
};

export default function FruitDetail({ params }: Props) {
  const fruitId = Number(params.fruitId);

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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black p-6">
      <div className="relative bg-white/5 border border-white/20 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-lg flex flex-col items-center gap-6 overflow-hidden">
        
        {/* Subtle glowing circles */}
        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-25 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 opacity-20 blur-2xl animate-pulse-slow"></div>

        {/* Fruit Image with small glow */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute w-52 h-52 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 blur-2xl opacity-30 animate-pulse-slow"></div>
          <Image
            src={fruit.filename}
            alt={fruit.name}
            width={250}
            height={250}
            className="relative rounded-lg shadow-md"
          />
        </div>

        {/* Fruit Name */}
        <h1 className="text-3xl font-bold text-white drop-shadow-md">{fruit.name}</h1>

        {/* Fruit Type */}
        <span className="px-4 py-1 rounded-full bg-white/10 text-white/80 text-sm font-medium drop-shadow-sm">
          {fruit.type}
        </span>

        {/* Fruit Description */}
        <p className="text-white/70 text-center">{fruit.description}</p>
      </div>

      {/* Tailwind animations */}
      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.25; }
            50% { transform: scale(1.1); opacity: 0.5; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 6s ease-in-out infinite;
          }
        `}
      </style>
    </main>
  );
}
