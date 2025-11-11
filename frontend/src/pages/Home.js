import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Award, Smile, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({ ingredients: 0, experience: 0, satisfaction: 0 });

  const testimonials = [
    {
      text: "RawKart's commitment to quality is unmatched. Their ingredients have elevated our products and our customers have noticed the difference.",
      author: "Sarah L.",
      position: "Head of R&D, Clean Eats Co."
    },
    {
      text: "The reliability and transparency of RawKart's supply chain are game-changers. We can trust every batch we receive.",
      author: "Mike T.",
      position: "Operations Director, NutriPure"
    },
    {
      text: "Their customer service and technical support are phenomenal. RawKart is more than a supplier; they're a true partner.",
      author: "Jessica Chen",
      position: "Founder, Artisan Beverages"
    }
  ];

  useEffect(() => {
    const animateValue = (start, end, duration, setter, key) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        setter(prev => ({ ...prev, [key]: value }));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    animateValue(0, 1500, 2000, setStats, 'ingredients');
    animateValue(0, 20, 2000, setStats, 'experience');
    animateValue(0, 99, 2000, setStats, 'satisfaction');
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section 
        className="hero-section" 
        data-testid="hero-section"
        style={{ backgroundImage: 'url(/assets/hero_image.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 p-6 max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight mb-4">
            The Source of Pure Ingredients.
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-gray-200 mb-8">
            Raw. Real. Reliable.
          </p>
          <Link to="/products" className="cta-button" data-testid="discover-products-btn">
            Discover Our Products
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-black" data-testid="stats-section">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="stat-card p-6">
              <Leaf className="w-12 h-12 text-rk-green mx-auto mb-4" />
              <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                {stats.ingredients}+
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">Ingredients</p>
            </div>
            <div className="stat-card p-6">
              <Award className="w-12 h-12 text-rk-green mx-auto mb-4" />
              <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                {stats.experience}+
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">Years of Experience</p>
            </div>
            <div className="stat-card p-6">
              <Smile className="w-12 h-12 text-rk-green mx-auto mb-4" />
              <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                {stats.satisfaction}%
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-32 bg-white dark:bg-black" data-testid="featured-products">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Products
          </h2>
          <div className="w-24 h-1 bg-rk-green mx-auto mb-12"></div>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg mb-8">
            Explore a selection of our premium, high-demand ingredients, trusted by industry leaders for their purity and performance. Our catalog is constantly expanding to meet the evolving needs of the market.
          </p>
          <Link to="/products" className="cta-button" data-testid="view-all-products-btn">
            View All Products
          </Link>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="py-20 md:py-32 bg-gray-50 dark:bg-black" data-testid="video-showcase">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              See Our Quality in Action
            </h2>
            <div className="w-24 h-1 bg-rk-green mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="/assets/video2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="/assets/video3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-white dark:bg-black" data-testid="testimonials-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Partners Say
            </h2>
            <div className="w-24 h-1 bg-rk-green mx-auto"></div>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="text-center p-8">
              <Quote className="w-10 h-10 text-rk-green mx-auto mb-4" />
              <p className="text-xl italic text-gray-700 dark:text-gray-200 mb-6">
                {testimonials[currentTestimonial].text}
              </p>
              <div className="font-bold text-lg text-gray-900 dark:text-white">
                {testimonials[currentTestimonial].author}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {testimonials[currentTestimonial].position}
              </div>
            </div>
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Previous testimonial"
              data-testid="prev-testimonial-btn"
            >
              <ChevronLeft className="w-6 h-6 text-rk-purple" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Next testimonial"
              data-testid="next-testimonial-btn"
            >
              <ChevronRight className="w-6 h-6 text-rk-purple" />
            </button>
          </div>
        </div>
      </section>

      {/* Commitment to Quality */}
      <section className="py-20 md:py-32 bg-gray-50 dark:bg-black" data-testid="commitment-section">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Commitment to Quality
          </h2>
          <div className="w-24 h-1 bg-rk-green mx-auto mb-12"></div>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            Quality is not just a standard; it's our promise. From transparent global sourcing to rigorous testing in our state-of-the-art labs, we ensure every ingredient meets the highest levels of safety, consistency, and efficacy.
          </p>
        </div>
      </section>

      {/* Latest Resources */}
      <section className="py-20 md:py-32 bg-white dark:bg-black" data-testid="latest-resources">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest from Resources
          </h2>
          <div className="w-24 h-1 bg-rk-green mx-auto mb-12"></div>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg mb-8">
            Stay ahead of industry trends with our expert insights, technical papers, and market analysis. We believe in empowering our partners with knowledge to innovate and succeed.
          </p>
          <Link to="/resources" className="cta-button" data-testid="explore-resources-btn">
            Explore Resources
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;