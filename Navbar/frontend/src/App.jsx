import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // For hamburger icons

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  return (
    <div className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">MyApp</div>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setActiveLink(link.name)}
              className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                activeLink === link.name ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile nav */}
      <div
        className={`md:hidden bg-white px-4 pt-2 pb-4 space-y-2 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => {
              setActiveLink(link.name);
              setIsOpen(false);
            }}
            className={`block mt-10 text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
              activeLink === link.name ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
