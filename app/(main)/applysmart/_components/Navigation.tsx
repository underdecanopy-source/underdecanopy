'use client';

import Link from 'next/link';

export function Navigation() {
    return (
        <nav className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/" className="text-xl font-bold text-gray-900">
                        ApplySmart
                    </Link>
                    <div className="flex gap-6">
                        <a href="#calculator" className="text-gray-600 hover:text-gray-900">Calculator</a>
                        <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
                        <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
