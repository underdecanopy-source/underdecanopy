// components/Navigation.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { getNavItems } from '@/lib/data/navService';

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const navItems = getNavItems(pathname);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        if (isMenuOpen) {
            const firstLink = menuContainerRef.current?.querySelector('a');
            firstLink?.focus();
        } else {
            menuButtonRef.current?.focus();
        }
    }, [isMenuOpen]);

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
        <>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:text-indigo-900 focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold">
            Skip to content
        </a>
        <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-900 via-blue-900 to-purple-900 shadow-2xl border-b-2 border-orange-500/40">
            <div className="page-container">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 transition-all duration-300 hover:scale-105 flex-shrink-0">
                        <Image src="/logo.png" alt="Underdecanopy" width={44} height={44} className="h-11 w-auto rounded-sm" />
                        <span className="text-xl font-bold text-white hover:text-orange-400 drop-shadow-2xl">
                            Underdecanopy
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-8 md:flex ml-auto">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={pathname === item.href ? 'page' : undefined}
                                className={`relative text-sm font-semibold transition-all duration-300 py-2 whitespace-nowrap hover:drop-shadow-lg group ${
                                    pathname === item.href ? 'text-orange-400' : 'text-white hover:text-orange-400'
                                }`}
                            >
                                {item.label}
                                {pathname === item.href ? (
                                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-amber-400"></span>
                                ) : (
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 group-hover:w-full transition-all duration-300"></span>
                                )}
                            </Link>
                        ))}
                    </nav>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-white hover:text-orange-400 hover:bg-transparent flex-shrink-0 transition-all duration-300 hover:scale-110"
                        ref={menuButtonRef}
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            <div
                id="mobile-menu"
                ref={menuContainerRef}
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-gradient-to-b from-indigo-900 to-purple-950 shadow-inner ${isMenuOpen ? 'max-h-96 opacity-100 border-t border-orange-500/30' : 'max-h-0 opacity-0'}`}
            >
                <nav className="flex flex-col p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={toggleMenu}
                            className={`block py-3 text-base font-semibold transition-all duration-300 rounded-lg px-4 hover:pl-6 border-l-4 ${
                                pathname === item.href 
                                    ? 'bg-orange-500/20 text-orange-400 border-orange-500' 
                                    : 'text-white hover:bg-white/20 hover:text-orange-400 border-transparent hover:border-orange-500'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
        </>
    );
}
