'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const closeMenu = () => setIsMenuOpen(false);

  if (!mounted) return null;

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      {/* Navbar */}
      <nav
        className={`fixed w-full top-0 left-0 z-30 rounded-b-lg bg-transparent backdrop-blur-2xl transition-all ${
          theme === 'dark'
            ? 'bg-gray-900 text-white shadow-lg'
            : 'bg-white text-gray-900 shadow-md'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center p-3">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <span className="text-blue-500">Crypto</span>Vista
          </div>

          {/* Right Section - Theme Toggle & Hamburger Menu */}
          <div className="flex items-center ml-auto space-x-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme} // Toggle theme on button click
              className="p-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg md:hidden transition hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Menu Links */}
            <div
              className={`absolute top-full right-0 backdrop-blur-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } rounded-lg shadow-lg p-4 md:flex md:space-x-8 md:bg-transparent md:shadow-none ${
                isMenuOpen ? 'block' : 'hidden'
              } md:static md:ml-4`}
            >
              <Link
                href="/about"
                onClick={closeMenu}
                className="py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                About
              </Link>
              <Link
                href="/home"
                onClick={closeMenu}
                className="py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Home
              </Link>
              <Link
                href="/exchanges"
                onClick={closeMenu}
                className="py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Exchanges
              </Link>
              <Link
                href="/favorite"
                onClick={closeMenu}
                className="py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Favs
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
