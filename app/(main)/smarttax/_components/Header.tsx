import Link from 'next/link';

export const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-900">SmartTax</h1>
                <nav className="hidden md:flex space-x-8">
                    <Link href="/" className="text-gray-600 hover:text-blue-900">Home</Link>
                    <Link href="#features" className="text-gray-600 hover:text-blue-900">Features</Link>
                    <Link href="#pricing" className="text-gray-600 hover:text-blue-900">Pricing</Link>
                    <Link href="#faq" className="text-gray-600 hover:text-blue-900">FAQ</Link>
                    <Link href="#get-started" className="text-gray-600 hover:text-blue-900">Get Started</Link>
                </nav>
                <a href="#get-started" className="bg-orange-500 text-white py-2 px-6 rounded-full text-lg hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95">
                    Get Started
                </a>
            </div>
        </header>
    );
};