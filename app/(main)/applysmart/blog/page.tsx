import React from 'react';
import { Navigation } from '@/components/Navigation';
import { applySmartBlogPosts } from '@/lib/data/applysmartBlog';

export const metadata = {
  title: 'ApplySmart Blog | Admission Updates, UTME Exemptions, and Policy Guides',
  description: 'Read ApplySmart articles on UTME exemptions, Dual Mandate policy updates, admissions planning, scholarships, and screening guidance.',
};

export default function ApplySmartBlogPage() {
  return (
    <div>
      <Navigation />
      <main className="pt-24 pb-16 bg-gray-50 min-h-screen">
        <div className="page-container">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">ApplySmart Blog</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Admission planning now requires more policy awareness than before. These guides explain the latest UTME exemptions, the Dual Mandate policy, and what candidates should do next.
            </p>
          </div>

          <div className="space-y-16 max-w-4xl mx-auto">
            {applySmartBlogPosts.map((post) => (
              <article key={post.id} id={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden scroll-mt-32">
                <div className={`${post.accentClassName} h-48 flex items-center justify-center`}>
                  <span className="text-white text-6xl">{post.previewIcon}</span>
                </div>
                <div className="p-8 md:p-10">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 ${post.categoryClassName}`}>
                    {post.category}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{post.title}</h2>
                  <div className="prose prose-lg text-gray-600 max-w-none">
                    {post.sections.map((section, index) => (
                      <div key={`${post.id}-${index}`}>
                        {section.heading && <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{section.heading}</h3>}
                        {section.paragraphs?.map((paragraph) => (
                          <p key={paragraph} className="mb-4">{paragraph}</p>
                        ))}
                        {section.bullets && (
                          <ul className="list-disc pl-5 mb-4 space-y-2">
                            {section.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a href="/applysmart" className="inline-block bg-blue-900 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-800 transition-colors duration-300">
              &larr; Back to ApplySmart Home
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
