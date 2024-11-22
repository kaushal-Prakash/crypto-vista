"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensures hydration works properly
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen w-full bg-cover bg-center transition-colors duration-300 bg-fit  ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white"
          : "bg-gradient-to-br from-gray-100 via-purple-100 to-blue-100 text-gray-900"
      }`}
      style={{ backgroundImage: "url('/landing/bg.jpg')" }}
    >
      <div className="absolute w-full min-h-screen inset-0 backdrop-blur-sm"></div>
      {/* Hero Section */}
      <section
        className="relative flex flex-col min-h-screen items-center justify-center text-center py-20 px-4 text-white"
        style={{ textShadow: "5px 2px 10px black" }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Welcome to CryptoVista
        </h1>
        <p className="text-xl md:text-2xl font-semibold max-w-3xl mx-auto mb-8">
          Your ultimate destination for tracking cryptocurrencies, analyzing
          market trends, and making informed decisions.
        </p>
        <Link
          href="/home"
          className={`py-3 px-8 rounded-lg text-lg shadow-lg transition ${
            theme === "dark"
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-purple-500 hover:bg-purple-600 text-white"
          }`}
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section
        className={`py-20 px-6 min-h-screen flex justify-center items-center transition-colors ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        <div>
          <h2 className="text-4xl font-bold text-center mb-12">
            Why CryptoVista?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div
              className={`p-6 rounded-lg text-center transition ${
                theme === "dark"
                  ? "bg-white bg-opacity-10 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              <Image
                src="/landing/feature-1.png"
                alt="Market Analysis"
                width={120}
                height={120}
                className="mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">
                Real-Time Market Data
              </h3>
              <p className="text-sm">
                Stay up-to-date with the latest market trends and data for all
                major cryptocurrencies.
              </p>
            </div>
            {/* Feature 2 */}
            <div
              className={`p-6 rounded-lg text-center transition ${
                theme === "dark"
                  ? "bg-white bg-opacity-10 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              <Image
                src="/landing/feature-2.png"
                alt="Portfolio Management"
                width={120}
                height={120}
                className="mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">Add to Favorites</h3>
              <p className="text-sm">
                Easily save and access your favorite cryptocurrencies. Build
                your personal list to keep track of coins that matter most to
                you.
              </p>
            </div>
            {/* Feature 3 */}
            <div
              className={`p-6 rounded-lg text-center transition ${
                theme === "dark"
                  ? "bg-white bg-opacity-10 text-white"
                  : "bg-white text-gray-900"
              }`}
            >
              <Image
                src="/landing/feature-3.png"
                alt="Secure Platform"
                width={140}
                height={140}
                className="mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-sm">
                Experience a secure and reliable platform tailored for crypto
                enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section
        className={`flex flex-col items-center justify-center text-center py-20 px-4 transition-colors ${
          theme === "dark" ? "bg-purple-800" : "bg-purple-200"
        }`}
      >
        <h2 className="text-4xl font-bold mb-6">Ready to Dive into Crypto?</h2>
        <p className="text-lg font-light max-w-2xl mx-auto mb-8">
          Dive into the crypto universe with CryptoVista today! Visit us now and
          unlock the limitless potential of the crypto world.
        </p>
        <Link
          href="/home"
          className={`py-3 px-8 rounded-lg text-lg shadow-lg transition ${
            theme === "dark"
              ? "bg-gray-900 hover:bg-gray-800 text-white"
              : "bg-gray-300 hover:bg-gray-400 text-gray-900"
          }`}
        >
          Visit Now
        </Link>
      </section>
    </div>
  );
}
