import Link from "next/link";
import { Fruit } from "@/lib/types";

export default function FruitCard({ fruit }: { fruit: Fruit }) {
  return (
    <Link href={`/fruits/${fruit.id}`}>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center cursor-pointer hover:scale-[1.03] transition-transform">
        <p className="text-lg font-semibold">{fruit.name}</p>
      </div>
    </Link>
  );
}
