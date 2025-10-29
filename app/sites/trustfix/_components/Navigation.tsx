'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-md">
            <div className="w-full mx-auto flex h-16 items-center justify-between px-6 md:px-8 max-w-full">
                {/* Logo/Branding */}
                <Link href="/trustfix" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                    TrustFix
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    <a href="/" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                        Home
                    </a>
                    <a href="#how-it-works" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                        How It Works
                    </a>
                    <a href="#admission-calculator" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                        Admission Calculator
                    </a>
                    <a href="#scholarships" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                        Scholarships
                    </a>
                    <a href="#blog" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                        Blog
                    </a>
                    <a href="#contact" className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                        Contact
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${
                    isMenuOpen ? 'max-h-96 border-t' : 'max-h-0'
                }`}
            >
                <nav className="flex flex-col p-4 bg-gray-50">
                    <a
                        href="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 px-4 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                        Home
                    </a>
                    <a
                        href="#how-it-works"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 px-4 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                        How It Works
                    </a>
                    <a
                        href="#admission-calculator"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 px-4 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                        Admission Calculator
                    </a>
                    <a
                        href="#scholarships"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 px-4 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                        Scholarships
                    </a>
                    <a
                        href="#blog"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 px-4 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                        Blog
                    </a>
                    <a
                        href="#contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 px-4 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                        Contact
                    </a>
                </nav>
            </div>
        </header>
    );
}
