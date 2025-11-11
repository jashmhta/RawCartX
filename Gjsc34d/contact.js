document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const formResult = document.getElementById('form-result');
    
    const emailRegex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');

    const validateInput = (input, validation, errorId) => {
        const errorElement = document.getElementById(errorId);
        if (validation(input.value)) {
            input.classList.remove('invalid');
            errorElement.classList.add('hidden');
            return true;
        } else {
            input.classList.add('invalid');
            errorElement.classList.remove('hidden');
            return false;
        }
    };

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const isNameValid = validateInput(nameInput, value => value.trim() !== '', 'name-error');
        const isEmailValid = validateInput(emailInput, value => emailRegex.test(value), 'email-error');
        const isSubjectValid = validateInput(subjectInput, value => value.trim() !== '', 'subject-error');
        const isMessageValid = validateInput(messageInput, value => value.trim() !== '', 'message-error');

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            formResult.classList.remove('hidden');
            formResult.className = 'p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400';
            formResult.textContent = 'Thank you! Your message has been sent successfully. We will get back to you shortly.';
            form.reset();

        } else {
             formResult.classList.remove('hidden');
             formResult.className = 'p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400';
             formResult.textContent = 'Please correct the errors before submitting.';
        }
    });


    nameInput.addEventListener('input', () => validateInput(nameInput, value => value.trim() !== '', 'name-error'));
    emailInput.addEventListener('input', () => validateInput(emailInput, value => emailRegex.test(value), 'email-error'));
    subjectInput.addEventListener('input', () => validateInput(subjectInput, value => value.trim() !== '', 'subject-error'));
    messageInput.addEventListener('input', () => validateInput(messageInput, value => value.trim() !== '', 'message-error'));
});
