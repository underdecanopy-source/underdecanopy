export const Demo = () => {
    return (
        <section className="bg-blue-900 text-white py-20" id="demo">
            <div className="page-container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How SmartTax Works</h2>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">A simple three-step process to manage your receipts and tax obligations.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="text-center bg-white/10 rounded-lg p-8">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">1</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Record Transactions</h3>
                        <p className="text-blue-100">Enter your sales, purchases, and expenses. SmartTax generates professional digital receipts automatically for each transaction, complete with your business details.</p>
                    </div>
                    <div className="text-center bg-white/10 rounded-lg p-8">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">2</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Track & Organize</h3>
                        <p className="text-blue-100">SmartTax categorizes your transactions, calculates tax obligations including VAT and withholding tax, and maintains organized records ready for filing or audit.</p>
                    </div>
                    <div className="text-center bg-white/10 rounded-lg p-8">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">3</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">File & Submit</h3>
                        <p className="text-blue-100">When tax season comes, SmartTax prepares your returns with all the data already organized. Review your summary, generate the required forms, and file with confidence.</p>
                    </div>
                </div>
                <div className="text-center mt-12">
                    <a
                        href="/smarttax/demo"
                        className="inline-block bg-orange-500 text-white py-3 px-10 rounded-full text-lg font-semibold hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-blue-900 active:scale-95"
                    >
                        Launch the Live Demo
                    </a>
                    <p className="text-blue-200 text-sm mt-3">No sign-up required. Data stays in your browser.</p>
                </div>
            </div>
        </section>
    );
};
