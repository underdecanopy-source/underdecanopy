export const Demo = () => {
    return (
        <section className="bg-blue-900 text-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">See SmartTax in Action</h2>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">Watch a short video that shows you how to get started with SmartTax.</p>
                <div className="bg-white rounded-lg shadow-lg p-4 max-w-4xl mx-auto">
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Product Demo"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};