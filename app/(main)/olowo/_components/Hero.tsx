export const Hero = () => {
    return (
        <section className="bg-blue-900 text-white py-20">
            <div className="page-container text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Olowo</h1>
                <p className="text-2xl md:text-3xl font-semibold mb-4">The Digital Operating System for Your Business</p>
                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">Olowo is being built as a multi-tenant Business Operating System for SMEs, bringing digital receipts and tax workflows together with the rest of your business operations.</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <a href="#contact" className="bg-orange-500 text-white py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95 inline-block">
                        Get Started with Olowo
                    </a>
                    <a href="/olowo/businesses" className="bg-orange-500 text-white py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:scale-95 inline-block">
                        Preview Business Setup
                    </a>
                    <a href="#features" className="bg-white text-blue-900 py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 active:scale-95 inline-block">
                        Explore the Platform
                    </a>
                </div>
            </div>
        </section>
    );
};
