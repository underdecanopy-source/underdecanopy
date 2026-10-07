export const Demo = () => {
    return (
        <section className="bg-blue-900 text-white py-20" id="demo">
            <div className="page-container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Preview Olowo’s Receipt &amp; Tax Workflows</h2>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">This preview covers the current receipt and tax capabilities, not the complete Olowo Business OS.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="text-center bg-white/10 rounded-lg p-8">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">1</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Record Transactions</h3>
                        <p className="text-blue-100">Enter sales, purchases, and expenses. Olowo generates digital receipts with your business details.</p>
                    </div>
                    <div className="text-center bg-white/10 rounded-lg p-8">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">2</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Track & Organize</h3>
                        <p className="text-blue-100">Olowo organizes transaction records and calculates tax obligations, including VAT and withholding tax.</p>
                    </div>
                    <div className="text-center bg-white/10 rounded-lg p-8">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">3</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Prepare Tax Returns</h3>
                        <p className="text-blue-100">Review your tax summary and prepare returns. The demo does not submit them to a tax authority.</p>
                    </div>
                </div>
                <div className="text-center mt-12">
                    <a
                        href="/olowo/demo"
                        className="inline-block bg-orange-500 text-white py-3 px-10 rounded-full text-lg font-semibold hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-blue-900 active:scale-95"
                    >
                        Explore the Receipt &amp; Tax Demo
                    </a>
                    <p className="text-blue-200 text-sm mt-3">No sign-up required. Demo data stays in this browser and is not connected to a business workspace.</p>
                </div>
            </div>
        </section>
    );
};
