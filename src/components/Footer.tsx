'use client';

import { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { useTheme } from 'next-themes';

function Footer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Load theme from local storage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
      localStorage.setItem('theme', systemTheme);
    }
    setMounted(true);
  }, [setTheme, theme]);

  // Save theme to local storage when it changes
  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  if (!mounted) return null;

  return (
    <footer
      className={`w-full py-6 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Logo and Name */}
        <div className="flex items-center space-x-2">
          <div className="text-xl font-bold">
            <span className="text-blue-500">Crypto</span>Vista
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 my-4 sm:my-0 font-semibold">
          <a
            href="https://www.linkedin.com/in/devkaushalprakash/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-blue-500"
          >
            <FiLinkedin size={24}/>
          </a>
          <a
            href="https://github.com/kaushal-Prakash"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-blue-900"
          >
            <FiGithub size={24} />
          </a>
          <a
            href="mailto:savagegamer1289@gmail.com"
            className="text-xl hover:text-blue-90"
          >
            <FiMail size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm">
          &copy; {new Date().getFullYear()} CryptoVista
        </div>
      </div>
    </footer>
  );
}

export default Footer;
