// components/MainNav.tsx
'use client';

import Link from 'next/link';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
// NOTE: For the transition to work well, we need to use a Tailwind trick 
// (max-h-0 and overflow-hidden) instead of conditional rendering (&&) for the flyout.

// Define the menu links
const navItems = [
    { href: '/', label: 'Home' },
    { href: '#servicest', label: 'Our Core Services' },
    { href: '#additional', label: 'Professional Services' },
    { href: '#cafe', label: 'Cafe Experience' },
    { href: '#podcast', label: 'Podcast' },
    { href: '#contact', label: 'Contact' },
];

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="sticky top-0 z-50 w-full drop-shadow-lg drop-shadow-black/30 bg-white backdrop-blur-sm">
            <div className="container mx-auto flex h-20 items-center justify-between !px-6 !md:px-8 ">
                {/* === Logo/Branding Section - Left Side === */}
                <Link href="/" className="text-xl font-bold text-white transition-colors hover:text-blue-600">
                    <div className='flex gap-3'>
                        <GraduationCap className='text-[#0056b3]' size={40} />
                        <div>
                            <div className="text-[#0056b3] font-bold text-xl">ApplySmart</div>
                            <div className='text-sm text-gray-500 font-normal'> Admission & Scholarship Support</div>
                        </div>

                    </div>
                </Link>

                {/* === Desktop Navigation - Right Side === */}
                <nav className="hidden items-center gap-6 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            // Added vertical padding here to make links bigger on hover
                            className="px-3 !py-1 text-sm !text-slate-700 font-bold transition-all tracking-wider hover:!text-[#ff9800] border-b-2 border-b-white hover:border-b-[#ff9800]"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* === Mobile Menu Button (Visible on Mobile) === */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-slate-700" // Hide button on desktop
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <X className='!size-6' /> : <Menu className="!size-6" />}
                </Button>
            </div>

            {/* === Mobile Menu Flyout with Smooth Transition ===
        
        How the transition works:
        1. `overflow-hidden`: Hides the content initially.
        2. `transition-max-height duration-500 ease-in-out`: Tells Tailwind to transition the `max-height` property over 0.5s.
        3. `max-h-0`: When the menu is closed, its max height is 0, so it collapses.
        4. `max-h-96`: When the menu is open, we give it a large enough max height (96 = 24rem) so the content can show, giving the *drop-down* effect.
      */}
            <div
                className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${isMenuOpen ? 'max-h-96 border-t' : 'max-h-0'
                    }`}
            >
                <nav className="flex flex-col  !p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={toggleMenu} // Close menu when a link is clicked
                            // Increased padding (py-3 px-4) for a bigger, touch-friendly mobile button
                            className="block w-auto !py-3 text-sm font-medium !text-slate-700 transition-all tracking-wider hover:!text-[#ff9800]"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}