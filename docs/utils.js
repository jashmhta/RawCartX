/**
 * Utilities Module
 * Provides shared functionality across the application
 */

// ==================== Validation Utilities ====================

/**
 * Validates an email address using a more comprehensive regex
 * Follows simplified RFC 5322 standards
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates input is not empty (with trim)
 * @param {string} input - Input to validate
 * @returns {boolean} - True if not empty
 */
export const validateRequired = (input) => {
    return input.trim().length > 0;
};

// ==================== Debounce Utility ====================

/**
 * Creates a debounced function that delays execution
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay = 300) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

// ==================== DOM Utilities ====================

/**
 * Safely queries DOM element
 * @param {string} selector - CSS selector
 * @param {Element} root - Root element to query from (defaults to document)
 * @returns {Element|null} - Found element or null
 */
export const querySelector = (selector, root = document) => {
    return root.querySelector(selector);
};

/**
 * Safely queries multiple DOM elements
 * @param {string} selector - CSS selector
 * @param {Element} root - Root element to query from (defaults to document)
 * @returns {NodeList} - Found elements
 */
export const querySelectorAll = (selector, root = document) => {
    return root.querySelectorAll(selector);
};

/**
 * Adds a class to an element
 * @param {Element} element - Target element
 * @param {string} className - Class name to add
 */
export const addClass = (element, className) => {
    if (element) element.classList.add(className);
};

/**
 * Removes a class from an element
 * @param {Element} element - Target element
 * @param {string} className - Class name to remove
 */
export const removeClass = (element, className) => {
    if (element) element.classList.remove(className);
};

/**
 * Toggles a class on an element
 * @param {Element} element - Target element
 * @param {string} className - Class name to toggle
 * @returns {boolean} - True if class was added, false if removed
 */
export const toggleClass = (element, className) => {
    if (!element) return false;
    return element.classList.toggle(className);
};

/**
 * Checks if element has a class
 * @param {Element} element - Target element
 * @param {string} className - Class name to check
 * @returns {boolean} - True if element has class
 */
export const hasClass = (element, className) => {
    if (!element) return false;
    return element.classList.contains(className);
};

// ==================== Storage Utilities ====================

/**
 * Safely retrieves item from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if not found
 * @returns {*} - Stored value or default
 */
export const getFromStorage = (key, defaultValue = null) => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
        console.warn(`Failed to retrieve from storage: ${key}`, error);
        return defaultValue;
    }
};

/**
 * Safely stores item in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} - True if successful
 */
export const saveToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.warn(`Failed to save to storage: ${key}`, error);
        return false;
    }
};

/**
 * Removes item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} - True if successful
 */
export const removeFromStorage = (key) => {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.warn(`Failed to remove from storage: ${key}`, error);
        return false;
    }
};

// ==================== Fetch Utilities ====================

/**
 * Fetches JSON data with error handling
 * @param {string} url - URL to fetch from
 * @returns {Promise<Object|Array|null>} - Fetched data or null on error
 */
export const fetchJSON = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch from ${url}:`, error);
        return null;
    }
};

// ==================== Array Utilities ====================

/**
 * Gets unique values from array
 * @param {Array} arr - Input array
 * @returns {Array} - Array with unique values
 */
export const getUnique = (arr) => {
    return [...new Set(arr)];
};

/**
 * Flattens nested arrays by one level
 * @param {Array} arr - Input array
 * @returns {Array} - Flattened array
 */
export const flatten = (arr) => {
    return arr.flat();
};

// ==================== String Utilities ====================

/**
 * Capitalizes first letter of string
 * @param {string} str - Input string
 * @returns {string} - Capitalized string
 */
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Converts string to kebab-case
 * @param {string} str - Input string
 * @returns {string} - Kebab-case string
 */
export const toKebabCase = (str) => {
    return str.replace(/\s+/g, '-').toLowerCase();
};

// ==================== Error Handling ====================

/**
 * Displays error message to user
 * @param {string} message - Error message
 * @param {Element} container - Container to display error in (optional)
 * @param {number} duration - Duration to show error in ms (0 = permanent)
 */
export const showError = (message, container = null, duration = 5000) => {
    const errorEl = document.createElement('div');
    errorEl.className = 'p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400';
    errorEl.textContent = message;

    if (container) {
        container.insertBefore(errorEl, container.firstChild);
    } else {
        document.body.insertBefore(errorEl, document.body.firstChild);
    }

    if (duration > 0) {
        setTimeout(() => errorEl.remove(), duration);
    }
};

/**
 * Displays success message to user
 * @param {string} message - Success message
 * @param {Element} container - Container to display message in (optional)
 * @param {number} duration - Duration to show message in ms (0 = permanent)
 */
export const showSuccess = (message, container = null, duration = 5000) => {
    const successEl = document.createElement('div');
    successEl.className = 'p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400';
    successEl.textContent = message;

    if (container) {
        container.insertBefore(successEl, container.firstChild);
    } else {
        document.body.insertBefore(successEl, document.body.firstChild);
    }

    if (duration > 0) {
        setTimeout(() => successEl.remove(), duration);
    }
};

// ==================== Initialization Check ====================

/**
 * Waits for library to be available
 * @param {string} libraryName - Name of global library
 * @param {number} timeout - Timeout in ms
 * @returns {Promise<boolean>} - True if library is available
 */
export const waitForLibrary = (libraryName, timeout = 5000) => {
    return new Promise((resolve) => {
        const startTime = Date.now();
        const check = () => {
            if (window[libraryName]) {
                resolve(true);
            } else if (Date.now() - startTime > timeout) {
                console.warn(`Library ${libraryName} did not load within timeout`);
                resolve(false);
            } else {
                requestAnimationFrame(check);
            }
        };
        check();
    });
};

// Export all as default object for non-module usage
const Utils = {
    validateEmail,
    validateRequired,
    debounce,
    querySelector,
    querySelectorAll,
    addClass,
    removeClass,
    toggleClass,
    hasClass,
    getFromStorage,
    saveToStorage,
    removeFromStorage,
    fetchJSON,
    getUnique,
    flatten,
    capitalize,
    toKebabCase,
    showError,
    showSuccess,
    waitForLibrary
};

export default Utils;
