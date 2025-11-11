document.addEventListener('DOMContentLoaded', async () => {
    const productGrid = document.getElementById('product-grid');
    const searchInput = document.getElementById('search-input');
    const industryFiltersContainer = document.getElementById('industry-filters');
    const attributeFiltersContainer = document.getElementById('attribute-filters');
    const functionFiltersContainer = document.getElementById('function-filters');

    let allProducts = [];

    const fetchProducts = async () => {
        try {
            const response = await fetch('products.json');
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch products:', error);
            productGrid.innerHTML = '<p class="col-span-full text-center text-red-500">Failed to load products. Please try again later.</p>';
            return [];
        }
    };

    const renderProducts = (products) => {
        productGrid.innerHTML = '';
        if (products.length === 0) {
            productGrid.innerHTML = '<p class="col-span-full text-center text-gray-500 dark:text-gray-400">No products match your criteria.</p>';
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card flex flex-col rounded-lg overflow-hidden shadow-md reveal-on-scroll';
            
            const attributesHTML = product.attributes.map(attr => `<span class="attribute-tag text-xs font-semibold px-2.5 py-1 rounded-full">${attr}</span>`).join('');

            card.innerHTML = `
                <div class="product-card-image aspect-video w-full flex items-center justify-center">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                </div>
                <div class="p-6 flex flex-col flex-grow">
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white">${product.name}</h4>
                    <p class="mt-1 text-sm italic text-gray-500 dark:text-gray-400 flex-grow">${product.benefit}</p>
                    <div class="mt-4 flex flex-wrap gap-2">
                        ${attributesHTML}
                    </div>
                    <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-4">
                        <button class="btn-primary w-full text-sm font-bold py-2 px-4 rounded-md">View Details</button>
                        <button class="btn-secondary w-full text-sm font-bold py-2 px-4 rounded-md">Request Sample</button>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });
        
        document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
    };
    
    const setupFilters = (products) => {
        const industries = [...new Set(products.map(p => p.industry))];
        const attributes = [...new Set(products.flatMap(p => p.attributes))];
        const functions = [...new Set(products.flatMap(p => p.functions))];

        const createFilterSection = (title, items, container) => {
            if (items.length === 0) return;
            const filterHTML = items.map(item => `
                <div class="flex items-center">
                    <input id="filter-${item.replace(/\s+/g, '-')}" type="checkbox" value="${item}" class="h-4 w-4 rounded border-gray-300 text-rk-purple focus:ring-rk-purple filter-checkbox">
                    <label for="filter-${item.replace(/\s+/g, '-')}" class="ml-3 text-sm text-gray-600 dark:text-gray-300">${item}</label>
                </div>
            `).join('');

            container.innerHTML = `
                <details class="py-4 border-b border-gray-200 dark:border-gray-700" open>
                    <summary class="flex justify-between items-center cursor-pointer font-semibold">
                        ${title}
                        <i data-lucide="chevron-right" class="accordion-icon w-5 h-5"></i>
                    </summary>
                    <div class="pt-4 space-y-3">${filterHTML}</div>
                </details>
            `;
        };

        createFilterSection('By Industry', industries, industryFiltersContainer);
        createFilterSection('By Attribute', attributes, attributeFiltersContainer);
        createFilterSection('By Function', functions, functionFiltersContainer);
        lucide.createIcons();
    };

    const filterAndRender = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const checkedFilters = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(el => el.value);

        const filteredProducts = allProducts.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(searchTerm);
            const benefitMatch = product.benefit.toLowerCase().includes(searchTerm);
            
            if (checkedFilters.length > 0) {
                const filterMatch = checkedFilters.every(filter => 
                    product.industry === filter || 
                    product.attributes.includes(filter) ||
                    product.functions.includes(filter)
                );
                return (nameMatch || benefitMatch) && filterMatch;
            }
            return nameMatch || benefitMatch;
        });

        renderProducts(filteredProducts);
    };

    const init = async () => {
        allProducts = await fetchProducts();
        setupFilters(allProducts);
        renderProducts(allProducts);

        searchInput.addEventListener('input', filterAndRender);
        document.querySelector('#filters-sidebar').addEventListener('change', (e) => {
            if (e.target.classList.contains('filter-checkbox')) {
                filterAndRender();
            }
        });
    };

    init();
});
