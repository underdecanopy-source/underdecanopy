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
    { href: '/', label: 'Home' },
    { href: '#services', label: 'Our Core Services' },
    { href: '#additional', label: 'Professional Services' },
    { href: '#cafe', label: 'Cafe Experience' },
    { href: '#podcast', label: 'Podcast' },
    { href: '#contact', label: 'Contact' },
];

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const menuContainerRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Effect to handle focus management for accessibility
    useEffect(() => {
        if (isMenuOpen) {
            // When menu opens, focus the first link inside it
            const firstLink = menuContainerRef.current?.querySelector('a');
            firstLink?.focus();
        } else {
            // When menu closes, return focus to the menu button
            menuButtonRef.current?.focus();
        }
    }, [isMenuOpen]);

    // Close menu if user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMenuOpen &&
                menuContainerRef.current &&
                !menuContainerRef.current.contains(event.target as Node) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <header className="sticky top-0 z-50 w-full drop-shadow-lg drop-shadow-black/30 bg-[#1a237e] backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-8 ">
                {/* === Logo/Branding Section - Left Side === */}
                <Link href="/" className="text-xl font-bold text-white transition-colors hover:text-blue-600">
                    Underdecanopy
                </Link>

                {/* === Desktop Navigation - Right Side === */}
                <nav className="hidden items-center gap-5 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            // Added vertical padding here to make links bigger on hover
                            className="px-3 py-1 text-sm font-medium text-white transition-all tracking-wider hover:text-[#ff9800] hover:border-b-2 hover:border-b-[white]"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* === Mobile Menu Button (Visible on Mobile) === */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-white" // Hide button on desktop
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
                className={`md:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${isMenuOpen ? 'max-h-96 border-t' : 'max-h-0'
                    }`}
            >
                <nav className="flex flex-col p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={toggleMenu} // Close menu when a link is clicked
                            // Increased padding (py-3 px-4) for a bigger, touch-friendly mobile button
                            className="block w-auto py-3 text-sm font-medium text-white transition-all tracking-wider hover:text-[#ff9800]"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}