import React from 'react';
import { Target, Users, Award } from 'lucide-react';

function About() {
  return (
    <div data-testid="about-page">
      {/* Page Header */}
      <section className="page-header" style={{ backgroundImage: 'url(/assets/hero_image.jpg)' }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">About RawKart</h1>
          <p className="text-xl md:text-2xl">Your Trusted Partner in Food Ingredients</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white dark:bg-black" data-testid="mission-section">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Target className="w-16 h-16 text-rk-green mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-rk-green mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              At RawKart, our mission is to be the most reliable source for pure, high-quality food ingredients. We are committed to empowering businesses across the food and nutrition industries with raw materials that are not only exceptional in purity but also backed by transparency, sustainability, and scientific rigor.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-gray-50 dark:bg-black" data-testid="vision-section">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Award className="w-16 h-16 text-rk-green mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
            <div className="w-24 h-1 bg-rk-green mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              We envision a world where every food product is crafted from ingredients that are pure, safe, and sustainably sourced. By 2030, we aim to be a global leader in B2B food ingredient supply, known for our unwavering commitment to quality and our role in fostering innovation in the food science community.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white dark:bg-black" data-testid="values-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Users className="w-16 h-16 text-rk-green mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-rk-green mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Purity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We source and supply ingredients that meet the highest standards of purity, ensuring that our partners receive only the best for their products.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Transparency</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Full supply chain visibility from sourcing to delivery, with comprehensive documentation and traceability at every step.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We continuously invest in R&D to stay ahead of market trends and offer cutting-edge solutions to our partners.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reliability</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Consistent quality and on-time delivery are at the core of our operations, building lasting partnerships based on trust.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sustainability</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Environmental stewardship guides our sourcing decisions, ensuring minimal impact on our planet for future generations.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Partnership</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We view our clients as partners, working collaboratively to achieve mutual success and drive industry innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-gray-50 dark:bg-black" data-testid="story-section">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">Our Story</h2>
            <div className="w-24 h-1 bg-rk-green mx-auto mb-12"></div>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Founded in 2005, RawKart began with a simple yet powerful vision: to revolutionize the food ingredient supply industry by prioritizing purity, transparency, and reliability. What started as a small operation has grown into a trusted name among food manufacturers, supplement companies, and nutrition brands worldwide.
              </p>
              <p>
                Over the past two decades, we've built an extensive network of suppliers, invested in state-of-the-art testing facilities, and assembled a team of food science experts dedicated to quality assurance. Today, we supply over 1,500 ingredients to clients across multiple industries, maintaining the same commitment to excellence that defined our early days.
              </p>
              <p>
                Our journey has been marked by continuous innovation and adaptation to market needs. From expanding our product line to include plant-based proteins and clean label ingredients, to implementing advanced supply chain technologies for real-time tracking, we've stayed at the forefront of industry trends while never compromising on our core values.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;