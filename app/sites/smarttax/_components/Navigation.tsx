'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/sites/smarttax', label: 'SmartTax' },
        { href: '#features', label: 'Features' },
        { href: '#about', label: 'About' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 shadow-xl border-b-2 border-emerald-400/30">
            <div className="page-container">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/sites/smarttax" className="text-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:text-lime-300 flex-shrink-0 drop-shadow-lg">
                        Smart<span className="text-lime-400">Tax</span>
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex ml-auto">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative text-sm font-semibold text-white hover:text-lime-300 transition-all duration-300 py-2 whitespace-nowrap hover:drop-shadow-md group"
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-lime-400 to-green-300 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </nav>

                    <button
                        className="md:hidden text-white hover:text-lime-300 flex-shrink-0 transition-all duration-300 hover:scale-110"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-gradient-to-b from-green-600 to-teal-800 border-t border-lime-400/30 shadow-inner">
                    <nav className="flex flex-col p-4 space-y-1">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block py-3 px-4 text-base font-semibold text-white hover:bg-white/20 hover:text-lime-300 rounded-lg transition-all duration-300 hover:pl-6 border-l-4 border-transparent hover:border-lime-400"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};
