// components/MainNav.tsx
'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
// NOTE: For the transition to work well, we need to use a Tailwind trick 
// (max-h-0 and overflow-hidden) instead of conditional rendering (&&) for the flyout.

// Define the menu links
const navItems = [
    { href: '/coophub/#home', label: 'Home' },
    { href: '/coophub/#products', label: 'Products' },
    { href: '/coophub/#features', label: 'Features' },
    { href: '/coophub/#how-it-works', label: 'How It Works' },
    { href: '/coophub/#faq', label: 'FAQ' },
    { href: '/coophub/#contact', label: 'Contact' },
];

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const menuContainerRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Effect to handle focus management for accessibility
    useEffect(() => {
        if (isMenuOpen) {
            const firstLink = menuContainerRef.current?.querySelector('a');
            firstLink?.focus();
        }
    }, [isMenuOpen]);

    // Effect to close menu on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isMenuOpen && menuContainerRef.current && !menuContainerRef.current.contains(event.target as Node) && menuButtonRef.current && !menuButtonRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <header className="sticky top-0 z-50 w-full drop-shadow-lg drop-shadow-black/30 bg-white backdrop-blur-sm">
            <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-8">
                {/* === Logo/Branding Section - Left Side === */}
                <Link href="/coophub" className="text-2xl font-bold text-[#1a237e]">
                    CoopHub
                </Link>

                {/* === Desktop Navigation - Right Side === */}
                <nav className="hidden items-center gap-6 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="px-3 py-1 text-slate-700 font-bold transition-all tracking-wider hover:text-[#ff9800] border-b-2 border-b-transparent hover:border-b-[#ff9800]"
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
                    ref={menuButtonRef}
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className="h-6 w-6" />}
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
                ref={menuContainerRef}
                className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-96 border-t' : 'max-h-0'
                    }`}
            >
                <nav className="flex flex-col p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={toggleMenu} // Close menu when a link is clicked
                            // Increased padding (py-3 px-4) for a bigger, touch-friendly mobile button
                            className="block w-auto py-3 text-sm font-medium text-slate-700 transition-all tracking-wider hover:text-[#ff9800]"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}