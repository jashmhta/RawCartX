import React from 'react';
import { FileText, TrendingUp, Beaker } from 'lucide-react';

function Resources() {
  const articles = [
    {
      id: 1,
      title: "The Rise of Plant-Based Proteins in Sports Nutrition",
      excerpt: "Explore how plant-based proteins are transforming the sports nutrition industry with improved formulations and consumer acceptance.",
      category: "Trends",
      icon: <TrendingUp className="w-8 h-8 text-rk-green" />
    },
    {
      id: 2,
      title: "Clean Label: Meeting Consumer Demand for Transparency",
      excerpt: "Understanding the clean label movement and how ingredient suppliers can meet evolving consumer expectations for simple, recognizable ingredients.",
      category: "Industry Insights",
      icon: <FileText className="w-8 h-8 text-rk-green" />
    },
    {
      id: 3,
      title: "Supply Chain Resilience in Food Ingredient Sourcing",
      excerpt: "Best practices for building resilient supply chains that can withstand global disruptions while maintaining quality and consistency.",
      category: "Supply Chain",
      icon: <Beaker className="w-8 h-8 text-rk-green" />
    }
  ];

  return (
    <div data-testid="resources-page">
      {/* Page Header */}
      <section className="page-header" style={{ backgroundImage: 'url(/assets/hero_image.jpg)' }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Resources & Insights</h1>
          <p className="text-xl md:text-2xl">Industry Knowledge & Expertise</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white dark:bg-black" data-testid="resources-intro">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Empowering Innovation Through Knowledge</h2>
            <div className="w-24 h-1 bg-rk-green mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Stay informed with our comprehensive library of industry insights, technical papers, and market analysis. We believe that informed partners are successful partners, and we're committed to sharing our expertise to help you innovate and grow.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-gray-50 dark:bg-black" data-testid="featured-articles">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Articles</h2>
            <div className="w-24 h-1 bg-rk-green mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow p-8"
                data-testid={`article-${article.id}`}
              >
                <div className="mb-4">{article.icon}</div>
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-rk-purple/20 text-rk-purple text-xs font-semibold rounded-full">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {article.excerpt}
                </p>
                <button className="text-rk-purple hover:text-rk-green font-semibold transition-colors">
                  Read More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20 bg-white dark:bg-black" data-testid="resource-categories">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Resource Categories</h2>
            <div className="w-24 h-1 bg-rk-green mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
              <FileText className="w-12 h-12 text-rk-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Technical Papers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                In-depth scientific documentation on ingredient properties, applications, and formulation guidelines.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
              <TrendingUp className="w-12 h-12 text-rk-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Market Trends</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Analysis of emerging trends, consumer preferences, and market dynamics in the food ingredient industry.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
              <Beaker className="w-12 h-12 text-rk-green mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Application Guides</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Practical guides for incorporating our ingredients into various product formulations and applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-50 dark:bg-black" data-testid="newsletter-section">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Stay Updated</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Subscribe to our newsletter to receive the latest industry insights, product updates, and technical resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rk-purple dark:bg-gray-800 dark:text-white"
                data-testid="newsletter-email"
              />
              <button
                className="cta-button"
                data-testid="newsletter-subscribe-btn"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resources;