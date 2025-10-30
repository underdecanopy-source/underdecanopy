// components/Navigation.tsx
'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { navItems } from '@/lib/data/nav';

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

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
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200">
            <div className="w-full mx-auto flex h-16 items-center justify-between px-6 md:px-8">
                <Link href="/" className="text-2xl font-bold text-gray-800 transition-colors hover:text-blue-600">
                    Underdecanopy
                </Link>

                <nav className="hidden items-center gap-6 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={pathname === item.href ? 'page' : undefined}
                            className={`relative text-sm font-medium transition-colors ${pathname === item.href ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                        >
                            {item.label}
                            {pathname === item.href && (
                                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-600"></span>
                            )}
                        </Link>
                    ))}
                </nav>

                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-gray-800"
                    ref={menuButtonRef}
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                >
                    {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>

            <div
                id="mobile-menu"
                ref={menuContainerRef}
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white ${isMenuOpen ? 'max-h-96 opacity-100 border-t' : 'max-h-0 opacity-0'}`}
            >
                <nav className="flex flex-col p-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={toggleMenu}
                            className={`block py-3 text-base font-medium transition-colors rounded-md px-4 ${pathname === item.href ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
