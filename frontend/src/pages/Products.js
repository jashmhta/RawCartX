import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedFunction, setSelectedFunction] = useState('All');

  const industries = ['All', 'Sports Nutrition', 'Health Supplements', 'Food Ingredients', 'Protein', 'Sweeteners', 'Herbal Extracts'];
  const functions = ['All', 'Muscle Support', 'Energy Production', 'Antioxidant Support', 'Brain Function', 'Recovery', 'Protein Synthesis'];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedIndustry, selectedFunction]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/products`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.benefit.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedIndustry !== 'All') {
      filtered = filtered.filter(p => p.industry === selectedIndustry);
    }

    if (selectedFunction !== 'All') {
      filtered = filtered.filter(p => p.functions.includes(selectedFunction));
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="preloader-spinner"></div>
      </div>
    );
  }

  return (
    <div data-testid="products-page">
      {/* Page Header */}
      <section className="page-header" style={{ backgroundImage: 'url(/assets/products_hero.jpg)' }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Our Products</h1>
          <p className="text-xl md:text-2xl">Premium Ingredients for Every Need</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-gray-50 dark:bg-black" data-testid="filters-section">
        <div className="container mx-auto px-6">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Search className="inline w-4 h-4 mr-2" />
                  Search Products
                </label>
                <input
                  type="text"
                  placeholder="Search by name or benefit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rk-purple dark:bg-gray-800 dark:text-white"
                  data-testid="search-input"
                />
              </div>

              {/* Industry Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Filter className="inline w-4 h-4 mr-2" />
                  Industry
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rk-purple dark:bg-gray-800 dark:text-white"
                  data-testid="industry-filter"
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              {/* Function Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Filter className="inline w-4 h-4 mr-2" />
                  Function
                </label>
                <select
                  value={selectedFunction}
                  onChange={(e) => setSelectedFunction(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rk-purple dark:bg-gray-800 dark:text-white"
                  data-testid="function-filter"
                >
                  {functions.map(func => (
                    <option key={func} value={func}>{func}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white dark:bg-black" data-testid="products-grid">
        <div className="container mx-auto px-6">
          <div className="mb-8 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 dark:text-gray-300">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                  data-testid={`product-card-${product.id}`}
                >
                  <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/product_image.jpg';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {product.benefit}
                    </p>
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-rk-green/20 text-rk-green text-xs font-semibold rounded-full">
                        {product.industry}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.attributes.slice(0, 2).map((attr, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
                        >
                          {attr}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Products;