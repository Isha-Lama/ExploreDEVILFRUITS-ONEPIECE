"use client";

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

  if (loading) {
    return (
      <p className="p-8 text-center text-white text-lg">
        Loading fruit...
      </p>
    );
  }

  if (!fruit) {
    return (
      <p className="p-8 text-center text-red-400 text-lg">
        Fruit not found
      </p>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-800 to-black p-4 sm:p-6">

      {/* OUTER WRAPPER */}
      <div className="relative max-w-md w-full">

        {/* LUFFY – fully responsive peeking */}
        <div
          className="
            absolute
            right-[-6rem] sm:right-[-10rem] md:right-[-15rem]
            top-[72%] sm:top-[74%] md:top-[77%]
            -translate-y-1/2
            z-20
            pointer-events-none
            opacity-30 sm:opacity-45 md:opacity-60
            hidden sm:block
          "
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          }}
        >
          <Image
            src="/luffy-bg.png"
            alt="Luffy peeking"
            width={320}
            height={220}
            className="
              object-contain
              drop-shadow-xl
              w-32 sm:w-48 md:w-72 lg:w-80
              h-auto
            "
          />
        </div>

        {/* CARD */}
        <div
          className="
            relative
            bg-white/5
            border border-white/20
            backdrop-blur-md
            rounded-3xl
            p-5 sm:p-6 md:p-8
            shadow-lg
            flex flex-col items-center
            gap-5 sm:gap-6
            overflow-hidden
          "
        >
          {/* GLOW EFFECTS */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 opacity-40 blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 opacity-30 blur-3xl animate-pulse-slow" />

          {/* FRUIT IMAGE */}
          <div
            className="
              relative
              w-44 h-44
              sm:w-56 sm:h-56
              md:w-64 md:h-64
              flex items-center justify-center
              z-10
            "
          >
            <div className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 blur-2xl opacity-50 animate-pulse-slow" />
            <Image
              src={fruit.filename}
              alt={fruit.name}
              width={250}
              height={250}
              className="relative w-full h-full object-contain rounded-lg shadow-xl"
            />
          </div>

          {/* NAME */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg z-10">
            {fruit.name}
          </h1>

          {/* TYPE */}
          <span className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-sm font-medium drop-shadow-md z-10">
            {fruit.type}
          </span>

          {/* DESCRIPTION */}
          <p className="text-sm sm:text-base text-white/70 text-center z-10">
            {fruit.description}
          </p>

          {/* SPARKLES */}
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

      {/* ANIMATIONS */}
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
