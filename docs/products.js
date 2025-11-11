/**
 * Product Catalog Module
 * Handles product filtering, searching, and rendering
 */

document.addEventListener('DOMContentLoaded', async () => {
    // ==================== DOM Elements ====================
    const productGrid = document.getElementById('product-grid');
    const searchInput = document.getElementById('search-input');
    const industryFiltersContainer = document.getElementById('industry-filters');
    const attributeFiltersContainer = document.getElementById('attribute-filters');
    const functionFiltersContainer = document.getElementById('function-filters');
    const filtersSidebar = document.querySelector('#filters-sidebar');

    // ==================== State ====================
    let allProducts = [];
    let isLoading = false;

    // ==================== Loading State ====================
    const setLoading = (loading) => {
        isLoading = loading;
        if (loading) {
            productGrid.innerHTML = '<div class="col-span-full text-center text-gray-500 dark:text-gray-400"><p>Loading products...</p></div>';
        }
    };

    // ==================== Fetch Products ====================
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('products.json');
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const data = await response.json();
            setLoading(false);
            return data;
        } catch (error) {
            console.error('Failed to fetch products:', error);
            setLoading(false);
            if (productGrid) {
                productGrid.innerHTML = '<p class="col-span-full text-center text-red-500 dark:text-red-400">Failed to load products. Please refresh the page.</p>';
            }
            return [];
        }
    };

    // ==================== Product Template ====================
    const createProductCard = (product) => {
        const card = document.createElement('div');
        card.className = 'product-card flex flex-col rounded-lg overflow-hidden shadow-md reveal-on-scroll';
        card.setAttribute('data-product-id', product.id);

        const attributesHTML = product.attributes
            .map(attr => `<span class="attribute-tag text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">${attr}</span>`)
            .join('');

        card.innerHTML = `
            <div class="product-card-image aspect-video w-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" loading="lazy">
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">${escapeHTML(product.name)}</h4>
                <p class="mt-1 text-sm italic text-gray-500 dark:text-gray-400 flex-grow">${escapeHTML(product.benefit)}</p>
                <div class="mt-4 flex flex-wrap gap-2">
                    ${attributesHTML}
                </div>
                <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                    <button class="btn-primary flex-1 text-sm font-bold py-2 px-4 rounded-md" aria-label="View details for ${product.name}">View Details</button>
                    <button class="btn-secondary flex-1 text-sm font-bold py-2 px-4 rounded-md" aria-label="Request sample for ${product.name}">Request Sample</button>
                </div>
            </div>
        `;
        return card;
    };

    // ==================== Security: HTML Escape ====================
    const escapeHTML = (text) => {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    };

    // ==================== Render Products ====================
    const renderProducts = (products) => {
        if (!productGrid) return;

        productGrid.innerHTML = '';

        if (products.length === 0) {
            productGrid.innerHTML = '<p class="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">No products match your criteria. Try adjusting your filters.</p>';
            return;
        }

        // Use DocumentFragment for better performance
        const fragment = document.createDocumentFragment();
        products.forEach(product => {
            fragment.appendChild(createProductCard(product));
        });
        productGrid.appendChild(fragment);

        // Ensure reveal animations are applied
        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
            if (!el.classList.contains('is-visible')) {
                el.classList.add('is-visible');
            }
        });
    };

    // ==================== Setup Filters ====================
    const setupFilters = (products) => {
        if (products.length === 0) return;

        // Extract unique values
        const industries = [...new Set(products.map(p => p.industry))].sort();
        const attributes = [...new Set(products.flatMap(p => p.attributes))].sort();
        const functions = [...new Set(products.flatMap(p => p.functions))].sort();

        const createFilterSection = (title, items, container) => {
            if (!container || items.length === 0) return;

            const filterHTML = items
                .map(item => {
                    const id = `filter-${item.replace(/\s+/g, '-').toLowerCase()}`;
                    return `
                        <div class="flex items-center">
                            <input
                                id="${id}"
                                type="checkbox"
                                value="${escapeHTML(item)}"
                                class="h-4 w-4 rounded border-gray-300 text-rk-purple focus:ring-rk-purple filter-checkbox cursor-pointer"
                                aria-label="Filter by ${item}"
                            >
                            <label for="${id}" class="ml-3 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">${item}</label>
                        </div>
                    `;
                })
                .join('');

            container.innerHTML = `
                <details class="py-4 border-b border-gray-200 dark:border-gray-700" open>
                    <summary class="flex justify-between items-center cursor-pointer font-semibold hover:text-rk-purple transition-colors" role="button" aria-expanded="true">
                        ${title}
                        <i data-lucide="chevron-right" class="accordion-icon w-5 h-5 transition-transform"></i>
                    </summary>
                    <div class="pt-4 space-y-3">${filterHTML}</div>
                </details>
            `;
        };

        // Create filter sections
        createFilterSection('By Industry', industries, industryFiltersContainer);
        createFilterSection('By Attribute', attributes, attributeFiltersContainer);
        createFilterSection('By Function', functions, functionFiltersContainer);

        // Recreate lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    };

    // ==================== Filter Logic ====================
    const filterAndRender = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const checkedFilters = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(el => el.value);

        const filteredProducts = allProducts.filter(product => {
            // Search matching
            const searchMatch = !searchTerm ||
                product.name.toLowerCase().includes(searchTerm) ||
                product.benefit.toLowerCase().includes(searchTerm);

            // Filter matching (OR logic - product must match ANY selected filter)
            if (checkedFilters.length === 0) {
                return searchMatch;
            }

            const filterMatch = checkedFilters.some(filter =>
                product.industry === filter ||
                product.attributes.includes(filter) ||
                product.functions.includes(filter)
            );

            return searchMatch && filterMatch;
        });

        renderProducts(filteredProducts);
    };

    // ==================== Debounce Search ====================
    const debouncedFilter = (() => {
        let timeoutId;
        return () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(filterAndRender, 300);
        };
    })();

    // ==================== Event Listeners ====================
    const init = async () => {
        allProducts = await fetchProducts();

        if (allProducts.length === 0) {
            console.warn('No products loaded');
            return;
        }

        setupFilters(allProducts);
        renderProducts(allProducts);

        // Search input with debouncing
        if (searchInput) {
            searchInput.addEventListener('input', debouncedFilter);
        }

        // Filter checkboxes
        if (filtersSidebar) {
            filtersSidebar.addEventListener('change', (e) => {
                if (e.target.classList.contains('filter-checkbox')) {
                    filterAndRender();
                }
            });
        }
    };

    // Initialize
    init();
});
