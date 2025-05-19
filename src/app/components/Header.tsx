"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Todo', href: '/todo' },
  { name: 'Sign In', href: '/signin' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 shadow-lg">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative">
          
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="i bg-indigo-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-lg shadow-md">N</span>
              <span className="text-xl font-bold text-white tracking-wide">NextApp</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200 ${
                  pathname === link.href
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Profile area */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="relative rounded-full bg-gray-700 p-2 text-gray-300 hover:text-white hover:bg-gray-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              aria-label="View notifications"
            >
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
              </svg>
            </button>
            <div className="relative">
              <button
                type="button"
                className="flex rounded-full bg-gray-700 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                id="user-menu-button"
                aria-haspopup="true"
              >
                <img
                  className="size-8 rounded-full border-2 border-indigo-500"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileOpen ? (
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        } bg-gray-800`}
        id="mobile-menu"
      >
        <div className="flex flex-col space-y-1 px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              aria-current={pathname === link.href ? 'page' : undefined}
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;