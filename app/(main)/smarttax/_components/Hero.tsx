export const Hero = () => {
    return (
        <section className="bg-blue-900 text-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Simplify Your Taxes with SmartTax</h1>
                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">The all-in-one solution for individuals and businesses to manage their taxes with ease and confidence.</p>
                <a href="#get-started" className="bg-orange-500 text-white py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95 inline-block">
                    Get Started Today
                </a>
            </div>
        </section>
    );
};