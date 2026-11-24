export const Demo = () => {
    return (
        <section className="bg-blue-900 text-white py-20" id="demo">
            <div className="page-container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore the OLÓWÒ receipt &amp; tax demo</h2>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">This interactive demo is separate from signed-in business workspaces. Its transactions and records stay in this browser.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="text-center bg-white/10 rounded-lg p-8">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">1</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Enter demo transactions</h3>
                        <p className="text-blue-100">Record sample income and expenses in the demo and preview receipts generated from those browser-local records.</p>
                    </div>
                    <div className="text-center bg-white/10 rounded-lg p-8">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">2</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Review illustrative calculations</h3>
                        <p className="text-blue-100">Review calculations using the demo’s code-defined tax values. They are not connected to persisted sales and may not reflect current rules.</p>
                    </div>
                    <div className="text-center bg-white/10 rounded-lg p-8">
                        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">3</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Prepare draft documents</h3>
                        <p className="text-blue-100">Preview and download draft tax documents. The demo does not submit or file returns with a tax authority.</p>
                    </div>
                </div>
                <div className="text-center mt-12">
                    <a
                        href="/olowo/demo"
                        className="inline-block bg-orange-500 text-white py-3 px-10 rounded-full text-lg font-semibold hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-blue-900 active:scale-95"
                    >
                        Open the receipt &amp; tax demo
                    </a>
                    <p className="text-blue-200 text-sm mt-3">No sign-up required. Demo data stays in this browser and is not connected to a signed-in business workspace.</p>
                </div>
            </div>
        </section>
    );
};
