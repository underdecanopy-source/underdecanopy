export const Hero = () => {
    return (
        <section className="bg-blue-900 text-white py-20">
            <div className="page-container text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Digital Receipts & Tax Filing Made Simple</h1>
                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">SmartTax is the all-in-one solution for generating professional digital receipts and managing tax filings for individuals, small businesses, and enterprises.</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <a href="#contact" className="bg-orange-500 text-white py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95 inline-block">
                        Get Started Today
                    </a>
                    <a href="#features" className="bg-white text-blue-900 py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 active:scale-95 inline-block">
                        Learn More
                    </a>
                </div>
            </div>
        </section>
    );
};
