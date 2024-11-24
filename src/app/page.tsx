"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensures hydration works properly
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const t1 = gsap.timeline();
    const t2 = gsap.timeline();

    t1.fromTo(
      ".hero-content",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, delay: 0.4, stagger: 0.4, ease: "none" }
    );

    t2.fromTo(
      ".floating-img",
      { opacity: 0, y: 60, x: -10 },
      { opacity: 1, y: 0, x: 0, duration: 1, stagger: 0.3, ease: "none" }
    );

    const t3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-content-container",
        start: "top 90%",
        end: "top 0%",
        scrub: 0.6,
      },
    });

    t3.fromTo(
      ".feature-content",
      { opacity: 0, y: 130, x: -10 },
      { opacity: 1, y: 0, x: 0, duration: 1, stagger: 0.4, ease: "none" }
    );

    const t4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".end-content-container",
        start: "top 100%",
        end: "top 40%",
        scrub: 0.3,
      },
    });
    t4.fromTo(
      ".landing-end-content",
      { opacity: 0, y: 130, x: -10 },
      { opacity: 1, y: 0, x: 0, duration: 1, stagger: 0.4, ease: "none" }
    );
  });

  return (
    <>
      {!mounted ? null : (
        <div
          className={`min-h-screen w-full bg-cover bg-center transition-colors duration-300 bg-fit ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white"
              : "bg-gradient-to-br from-gray-100 via-purple-100 to-blue-100 text-gray-900"
          }`}
          style={{ backgroundImage: "url('/landing/bg.jpg')" }}
        >
          <div className="absolute w-full min-h-screen inset-0 backdrop-blur-sm"></div>

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 sm:top-16 sm:left-20 floating-img opacity-30 blur-sm">
              <Image
                src="/landing/1.png"
                alt="Image 1"
                width={120}
                height={120}
              />
            </div>
            <div className="absolute top-20 right-10 sm:top-32 sm:right-16 floating-img opacity-30 blur-sm">
              <Image
                src="/landing/2.png"
                alt="Image 2"
                width={100}
                height={100}
                className="-rotate-12"
              />
            </div>
            <div className="absolute bottom-20 left-10 sm:bottom-32 sm:left-16 floating-img opacity-30 blur-sm">
              <Image
                src="/landing/3.png"
                alt="Image 3"
                width={100}
                height={100}
                className="rotate-45"
              />
            </div>
            <div className="absolute bottom-10 right-10 sm:bottom-16 sm:right-20 floating-img opacity-30 blur-sm">
              <Image
                src="/landing/4.png"
                alt="Image 4"
                width={120}
                height={120}
                className="rotate-12"
              />
            </div>
            <div className="absolute top-3/4 sm:top-1/2 left-1/4 transform -translate-y-1/2 floating-img opacity-30 blur-sm">
              <Image
                src="/landing/5.png"
                alt="Image 5"
                width={140}
                height={140}
              />
            </div>
            <div className="absolute top-1/4 right-1/4 transform -translate-y-1/2 floating-img opacity-30 blur-sm">
              <Image
                src="/landing/6.png"
                alt="Image 6"
                width={140}
                height={140}
                className="-rotate-12"
              />
            </div>
          </div>

          {/* Hero Section */}
          <section
            className="relative flex flex-col min-h-screen items-center justify-center text-center py-20 px-4 text-white"
            style={{ textShadow: "5px 2px 10px black" }}
          >
            <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 hero-content">
              Welcome to <span className="text-blue-500">Crypto</span>Vista
            </h1>
            {/* Slight overlay */}
            <p className="text-xl md:text-2xl font-semibold max-w-3xl mx-auto mb-8 hero-content relative z-20">
              Your ultimate destination for tracking cryptocurrencies, analyzing
              market trends, and making informed decisions.
            </p>
            <Link
              href="/home"
              className={`py-3 px-8 hero-content rounded-lg text-lg font-semibold transform-gpu transition duration-300 ease-in-out hover:scale-105 relative z-20 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-purple-800/50"
                  : "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white shadow-lg shadow-pink-500/50"
              }`}
            >
              Get Started
            </Link>
          </section>

          {/* Features Section */}
          <section
            className={`py-20 px-6 min-h-screen flex justify-center items-center transition-colors hero-content-container ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <div>
              <h2 className="text-4xl font-bold text-center mb-12 feature-content">
                Why <span className="text-blue-500">Crypto</span>Vista?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Feature 1 */}
                <div
                  className={`p-6 rounded-lg text-center transition feature-content ${
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
                    Stay up-to-date with the latest market trends and data for
                    all major cryptocurrencies.
                  </p>
                </div>
                {/* Feature 2 */}
                <div
                  className={`p-6 rounded-lg text-center transition feature-content ${
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
                  <h3 className="text-2xl font-semibold mb-2">
                    Add to Favorites
                  </h3>
                  <p className="text-sm">
                    Easily save and access your favorite cryptocurrencies. Build
                    your personal list to keep track of coins that matter most
                    to you.
                  </p>
                </div>
                {/* Feature 3 */}
                <div
                  className={`p-6 rounded-lg text-center transition feature-content ${
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
                  <h3 className="text-2xl font-semibold mb-2">
                    Secure & Reliable
                  </h3>
                  <p className="text-sm">
                    Experience a secure and reliable platform tailored for
                    crypto enthusiasts.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call-to-Action Section */}
          <section
            className={`flex flex-col items-center justify-center text-center py-20 px-4 transition-colors end-content-container ${
              theme === "dark" ? "bg-purple-800" : "bg-purple-200"
            }`}
          >
            <h2 className="text-4xl font-bold mb-6 landing-end-content">
              Ready to Dive into Crypto?
            </h2>
            <p className="text-lg font-light max-w-2xl mx-auto mb-8 landing-end-content">
              Dive into the crypto universe with CryptoVista today! Visit us now
              and unlock the limitless potential of the crypto world.
            </p>
            <Link
              href="/home"
              className={`py-3 landing-end-content px-8 rounded-lg text-lg shadow-lg transition ${
                theme === "dark"
                  ? "bg-gray-900 hover:bg-gray-800 text-white"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-900"
              }`}
            >
              Check out now !
            </Link>
          </section>
        </div>
      )}
    </>
  );
}
