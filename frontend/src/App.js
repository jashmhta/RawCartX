import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Leaf, Award, Smile, Quote, MapPin, Phone, Mail, Linkedin, Twitter } from 'lucide-react';
import './App.css';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Quality from './pages/Quality';
import Resources from './pages/Resources';
import Contact from './pages/Contact';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (loading) {
    return (
      <div className="preloader">
        <div className="preloader-logo">
          <img src="/assets/logo_final.png" alt="RawKart Logo" className="h-32 brightness-125 contrast-150 drop-shadow-2xl" />
        </div>
        <div className="preloader-spinner"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function Header({ darkMode, setDarkMode, mobileMenuOpen, setMobileMenuOpen }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <Link to="/" className="flex items-center" data-testid="logo-link">
          <img src="/assets/logo_final.png" alt="RawKart Logo" className="logo" />
        </Link>
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} data-testid="nav-home">Home</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`} data-testid="nav-about">About Us</Link>
          <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`} data-testid="nav-products">Products</Link>
          <Link to="/quality" className={`nav-link ${isActive('/quality') ? 'active' : ''}`} data-testid="nav-quality">Quality</Link>
          <Link to="/resources" className={`nav-link ${isActive('/resources') ? 'active' : ''}`} data-testid="nav-resources">Resources</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`} data-testid="nav-contact">Contact</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
            aria-label="Toggle theme"
            data-testid="theme-toggle"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
            data-testid="mobile-menu-button"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="mobile-menu md:hidden" data-testid="mobile-menu">
          <nav className="flex flex-col p-4 space-y-2">
            <Link to="/" className={`nav-link-mobile ${isActive('/') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} data-testid="mobile-nav-home">Home</Link>
            <Link to="/about" className={`nav-link-mobile ${isActive('/about') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} data-testid="mobile-nav-about">About Us</Link>
            <Link to="/products" className={`nav-link-mobile ${isActive('/products') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} data-testid="mobile-nav-products">Products</Link>
            <Link to="/quality" className={`nav-link-mobile ${isActive('/quality') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} data-testid="mobile-nav-quality">Quality</Link>
            <Link to="/resources" className={`nav-link-mobile ${isActive('/resources') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} data-testid="mobile-nav-resources">Resources</Link>
            <Link to="/contact" className={`nav-link-mobile ${isActive('/contact') ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} data-testid="mobile-nav-contact">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">RawKart</h3>
            <p className="text-gray-400">
              Our mission is to be the most reliable source for pure food ingredients, enabling our partners to create exceptional products for a healthier world.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <Link to="/" className="block hover:text-rk-purple transition-colors">Home</Link>
              <Link to="/about" className="block hover:text-rk-purple transition-colors">About Us</Link>
              <Link to="/products" className="block hover:text-rk-purple transition-colors">Products</Link>
              <Link to="/quality" className="block hover:text-rk-purple transition-colors">Quality</Link>
              <Link to="/resources" className="block hover:text-rk-purple transition-colors">Resources</Link>
              <Link to="/contact" className="block hover:text-rk-purple transition-colors">Contact Us</Link>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-rk-green" />
                <span>123 Ingredient Lane, Food Science City, 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-rk-green" />
                <a href="tel:+1234567890" className="hover:text-rk-purple transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-rk-green" />
                <a href="mailto:sales@rawkart.com" className="hover:text-rk-purple transition-colors">sales@rawkart.com</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <p className="text-gray-400 mb-4">Connect with us on social media.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-rk-purple transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rk-purple transition-colors" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2025 RawKart. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default App;