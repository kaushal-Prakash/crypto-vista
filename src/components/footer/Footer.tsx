'use client';

import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { useTheme } from 'next-themes';

function Footer() {
  const { theme } = useTheme();

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
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-blue-500"
          >
            <FiLinkedin size={24}/>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-blue-900"
          >
            <FiGithub size={24} />
          </a>
          <a
            href="mailto:youremail@example.com"
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
