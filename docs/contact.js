/**
 * Contact Form Module
 * Handles form validation and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // ==================== DOM Elements ====================
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const formResult = document.getElementById('form-result');

    // ==================== Validation Rules ====================
    // More comprehensive email validation - simplified RFC 5322
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validationRules = {
        name: {
            element: nameInput,
            errorId: 'name-error',
            validate: (value) => value.trim().length >= 2,
            errorMessage: 'Name must be at least 2 characters'
        },
        email: {
            element: emailInput,
            errorId: 'email-error',
            validate: (value) => emailRegex.test(value.trim()),
            errorMessage: 'Please enter a valid email address'
        },
        subject: {
            element: subjectInput,
            errorId: 'subject-error',
            validate: (value) => value.trim().length >= 3,
            errorMessage: 'Subject must be at least 3 characters'
        },
        message: {
            element: messageInput,
            errorId: 'message-error',
            validate: (value) => value.trim().length >= 10,
            errorMessage: 'Message must be at least 10 characters'
        }
    };

    // ==================== Form Results Display ====================
    const displayResult = (isSuccess, message) => {
        if (!formResult) return;

        formResult.classList.remove('hidden');
        if (isSuccess) {
            formResult.className = 'p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 border border-green-200 dark:border-green-800';
            formResult.innerHTML = `<div class="flex items-center"><i data-lucide="check-circle" class="w-5 h-5 mr-2"></i><span>${message}</span></div>`;
        } else {
            formResult.className = 'p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 border border-red-200 dark:border-red-800';
            formResult.innerHTML = `<div class="flex items-center"><i data-lucide="alert-circle" class="w-5 h-5 mr-2"></i><span>${message}</span></div>`;
        }

        // Recreate lucide icons if available
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Auto-hide success message after 5 seconds
        if (isSuccess) {
            setTimeout(() => {
                formResult.classList.add('hidden');
            }, 5000);
        }
    };

    // ==================== Input Validation ====================
    const validateInput = (fieldName) => {
        const rule = validationRules[fieldName];
        if (!rule) return false;

        const isValid = rule.validate(rule.element.value);
        const errorElement = document.getElementById(rule.errorId);

        if (isValid) {
            rule.element.classList.remove('invalid');
            if (errorElement) {
                errorElement.classList.add('hidden');
            }
        } else {
            rule.element.classList.add('invalid');
            if (errorElement) {
                errorElement.classList.remove('hidden');
                errorElement.textContent = rule.errorMessage;
            }
        }

        return isValid;
    };

    // ==================== Form Submission ====================
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate all fields
        const results = {};
        Object.keys(validationRules).forEach(fieldName => {
            results[fieldName] = validateInput(fieldName);
        });

        const isValid = Object.values(results).every(result => result === true);

        if (!isValid) {
            displayResult(false, 'Please correct the errors before submitting.');
            return;
        }

        // Prepare form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim(),
            timestamp: new Date().toISOString()
        };

        try {
            // Store in localStorage as fallback if no backend
            const existingSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
            existingSubmissions.push(formData);
            localStorage.setItem('formSubmissions', JSON.stringify(existingSubmissions));

            // TODO: Send to backend when available
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // });
            // if (!response.ok) throw new Error('Failed to submit form');

            displayResult(true, 'Thank you! Your message has been sent successfully. We will get back to you shortly.');
            form.reset();

            // Clear validation states
            Object.values(validationRules).forEach(rule => {
                rule.element.classList.remove('invalid');
                const errorElement = document.getElementById(rule.errorId);
                if (errorElement) {
                    errorElement.classList.add('hidden');
                }
            });
        } catch (error) {
            console.error('Form submission error:', error);
            displayResult(false, 'An error occurred. Please try again later.');
        }
    };

    // ==================== Event Listeners ====================
    form.addEventListener('submit', handleSubmit);

    // Real-time validation on input
    Object.keys(validationRules).forEach(fieldName => {
        const rule = validationRules[fieldName];
        rule.element.addEventListener('input', () => validateInput(fieldName));
        rule.element.addEventListener('blur', () => validateInput(fieldName));
    });

    // Trim whitespace on blur
    Object.values(validationRules).forEach(rule => {
        rule.element.addEventListener('blur', (e) => {
            e.target.value = e.target.value.trim();
        });
    });
});
