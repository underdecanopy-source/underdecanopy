'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/techlift" className="text-2xl font-bold text-purple-600">TechLift</Link>
                    </div>
                    <nav className="hidden md:flex md:space-x-8">
                        <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
                        <a href="#about" className="text-gray-500 hover:text-gray-700">About</a>
                        <a href="#courses" className="text-gray-500 hover:text-gray-700">Courses</a>
                        <a href="#testimonials" className="text-gray-500 hover:text-gray-700">Testimonials</a>
                        <a href="#contact" className="text-gray-500 hover:text-gray-700">Contact</a>
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-700">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden">
                    <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About</a>
                        <a href="#courses" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Courses</a>
                        <a href="#testimonials" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Testimonials</a>
                        <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Contact</a>
                    </nav>
                </div>
            )}
        </header>
    );
}
