'use client';

import Link from 'next/link';
import Image from 'next/image';

const Custom404 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen z-50 bg-gradient-to-br from-blue-800 via-purple-800 to-gray-900 text-white absolute w-full top-0">
      <div className="text-center">
        <div className="relative w-96 h-96 mx-auto">
          <Image
            src="/404-space.png" 
            alt="Lost in Space"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-extrabold mt-8">404</h1>
        <p className="mt-4 text-lg font-medium text-gray-300">
          Oops! It looks like you’re lost in space.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link href="/home">
          <p className="mt-6 inline-block px-6 py-3 text-lg font-semibold bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 transition duration-200">
            Go Back Home
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
