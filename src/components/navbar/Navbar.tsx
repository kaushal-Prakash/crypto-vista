'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiMoon, FiSun, FiSearch } from 'react-icons/fi';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // To control search bar visibility
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

  // Toggle search bar visibility (for small screens)
  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);

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

          {/* Right Section - Theme Toggle, Search & Hamburger Menu */}
          <div className="flex items-center ml-auto space-x-4">
            {/* Search Button (Visible on small screens only) */}
            <button
              onClick={toggleSearch}
              className="p-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-700 sm:hidden"
            >
              <FiSearch size={20} />
            </button>

            {/* Search Bar (Visible on md and above, beside theme toggle) */}
            <div
              className={`hidden md:flex items-center transition-all ${
                isSearchVisible ? 'block' : 'hidden'
              }`}
            >
              <input
                type="text"
                placeholder="Search..."
                className={`w-[200px] md:w-64 p-2 rounded-md text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-900 border ${
                  theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
                }`}
              />
              <button type="submit" className="p-2 ml-2 rounded-md bg-blue-500 text-white">
              <FiSearch />
            </button>
            </div>

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
              className={`absolute top-full right-0 bg-opacity-80 backdrop-blur-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } rounded-lg shadow-lg p-4 md:flex md:space-x-8 md:bg-transparent md:shadow-none ${
                isMenuOpen ? 'block' : 'hidden'
              } md:static md:ml-4`}
            >
              <Link
                href="/home"
                className="py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                About
              </Link>
              <Link
                href="/faqs"
                className="py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              > 
                FAQs
              </Link>
              <Link
                href="/favorite"
                className="py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Favs
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Bar Below Navbar for Small Screens (visible on search button click) */}
      <div
        className={`fixed w-full top-16 left-0 z-20 transition-all ${
          isSearchVisible ? 'block' : 'hidden'
        } sm:hidden`} // Visible on small screens only
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              className={`w-full sm:w-96 p-2 rounded-md text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-900 border ${
                theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
              }`}
            />
            <button type="submit" className="p-2 ml-2 rounded-md bg-blue-500 text-white">
              <FiSearch />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
