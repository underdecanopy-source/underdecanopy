import Link from 'next/link';

export const Pricing = () => {
    return (
        <section className="bg-gray-100 py-20" id="pricing" aria-labelledby="pricing-heading">
            <div className="page-container">
                <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 text-center shadow-md md:p-12">
                    <h2 id="pricing-heading" className="text-3xl font-bold text-gray-800">OLÓWÒ plans are in development</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                        OLÓWÒ is being built as a connected Business Operating System. Subscription plans and pricing will be published when the business workflows are ready; the current previews are not paid product plans.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/olowo/demo"
                            className="rounded-full bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                        >
                            Explore Receipt &amp; Tax Preview
                        </Link>
                        <Link
                            href="/olowo/businesses"
                            className="rounded-full bg-gray-100 px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Preview Business Setup
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
