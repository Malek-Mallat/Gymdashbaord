"use client";

import Link from "next/link";
import { Dumbbell, HeartPulse, ChartBar, Timer } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* 🔥 BACKGROUND YOUTUBE VIDEO */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <iframe
          className="w-full h-full scale-150"
          src="https://www.youtube.com/embed/UrZlTz8NMr0?autoplay=1&mute=1&controls=0&loop=1&playlist=UrZlTz8NMr0&modestbranding=1"
          allow="autoplay; fullscreen"
        ></iframe>

        {/* FILTRE SOMBRE */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/55"></div>
      </div>

      {/* 👇 CONTENU DU SITE */}
      <div className="min-h-screen text-white">

        {/* Navbar */}
        <header className="w-full flex justify-center py-6">
          <nav className="w-[95%] md=w-[90%] lg:w-[85%]
            bg-white/70 text-black rounded-full px-6 py-4 flex items-center
            justify-between shadow-xl backdrop-blur-xl">

            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-wider">
                FITNESS<span className="text-gray-400">PRO</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-gray-300">
              <Link href="/login" className="text-black">Se connecter</Link>
              <Link href="/" className="text-black">Commencer</Link>
            </div>
          </nav>
        </header>

        {/* HERO SECTION */}
        <section className="container mx-auto px-6 md:px-15 py-10">
          <h1 className="md:text-7xl font-black text-4xl leading-tight drop-shadow-xl">
            Boost Your Performance
            <br />
            <span className="italic text-gray-200">with FITNESS PRO</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mt-6 max-w-2xl drop-shadow-xl">
            Train smart, stay strong, reach your goals.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <Link
              href="/register"
              className="bg-white/90 text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-white transition"
            >
              Vous êtes membre ?
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
