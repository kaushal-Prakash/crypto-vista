import React from "react";

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 text-gray-800 dark:text-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-10">
      {/* Container */}
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-10">
        {/* Title */}
        <h1 className="text-4xl mt-20 sm:mt-24 sm:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          About CryptoVista
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300 max-w-4xl">
          Welcome to CryptoVista, your gateway to exploring the exciting and dynamic world of cryptocurrencies. 
          Built with passion and precision, CryptoVista is a platform dedicated to helping enthusiasts, traders, and dreamers 
          navigate the crypto universe.
        </p>

        {/* Personal Note */}
        <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-10">
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            A Word from devShadow
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Hi, I&apos;m devShadow—a passionate developer who thrives on turning ideas into meaningful experiences. CryptoVista started as a dream to create a space where everyone, from seasoned crypto traders to curious beginners, could find reliable, beautifully presented information.
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-4">
            In a world that&apos;s constantly evolving, staying informed is the key to success. Through features like real-time price tracking, favorite lists, market analysis, and easy-to-use interfaces, CryptoVista is designed to make the world of cryptocurrencies accessible, exciting, and manageable.
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-4">
            Thank you for being part of this journey. Your trust and enthusiasm inspire me to keep improving and innovating. If you have suggestions, feedback, or just want to connect, feel free to reach out!
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-4 italic">
            Here&apos;s to your success in the crypto world — let&apos;s build a brighter future together.
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
