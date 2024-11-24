"use client";
import gsap from "gsap";
import { useEffect } from "react";

function AboutPage() {
  useEffect(() => {
    const t1 = gsap.timeline();
    t1.fromTo(
      ".about-content",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.4 }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 text-gray-800 dark:text-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-10">
      {/* Container */}
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-10">
        {/* Title */}
        <h1 className="text-4xl mt-20 sm:mt-24 sm:text-5xl about-content font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          About CryptoVista
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl font-medium about-content text-gray-700 dark:text-gray-300 max-w-4xl">
          Welcome to CryptoVista, your gateway to exploring the exciting and
          dynamic world of cryptocurrencies. Built with passion and precision,
          CryptoVista is a platform dedicated to helping enthusiasts, traders,
          and dreamers navigate the crypto universe.
        </p>

        {/* Personal Note */}
        <div className="w-full bg-white about-content dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-10">
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            A Word from devShadow
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Hi, I&apos;m devShadow, the creator of CryptoVista. My goal is to
            provide a user-friendly platform that makes navigating the crypto
            world easier and more accessible for everyone.
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-4">
            CryptoVista features real-time price tracking, customizable
            watchlists, and insightful market analysis, all designed to help you
            stay ahead in the fast-paced crypto market.
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-4">
            If you have any feedback, suggestions, or just want to connect, feel
            free to reach out. Your input helps shape CryptoVista into the best
            crypto companion.
          </p>
          <p className="mt-6 text-xl font-semibold text-blue-600 dark:text-blue-400">
            - devShadow
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
