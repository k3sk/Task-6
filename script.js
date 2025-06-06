// DOM Elements
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');
const themeToggle = document.getElementById('themeToggle');
const submitBtn = form.querySelector('.submit-btn');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Regular expression for email validation
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Theme handling
const theme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', theme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Function to show error message with icon
function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    errorElement.classList.add('show');
}

// Function to hide error message
function hideError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// Function to validate name
function validateName() {
    const name = nameInput.value.trim();
    
    if (name === '') {
        showError(nameInput, nameError, 'Name is required');
        return false;
    }
    
    // Check for special characters (allow only letters, spaces, and basic punctuation)
    if (!/^[a-zA-Z\s'.-]+$/.test(name)) {
        showError(nameInput, nameError, 'Name contains invalid characters');
        return false;
    }
    
    hideError(nameInput, nameError);
    return true;
}

// Function to validate email
function validateEmail() {
    const email = emailInput.value.trim();
    
    if (email === '') {
        showError(emailInput, emailError, 'Email is required');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
    }
    
    hideError(emailInput, emailError);
    return true;
}

// Function to validate message
function validateMessage() {
    const message = messageInput.value.trim();
    
    if (message === '') {
        showError(messageInput, messageError, 'Message is required');
        return false;
    }
    
    if (message.length < 10) {
        showError(messageInput, messageError, 'Message must be at least 10 characters long');
        return false;
    }
    
    hideError(messageInput, messageError);
    return true;
}

// Function to simulate form submission
async function simulateSubmission() {
    return new Promise(resolve => setTimeout(resolve, 1500));
}

// Add input event listeners for real-time validation
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
messageInput.addEventListener('input', validateMessage);

// Form submission handler
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    // If all validations pass
    if (isNameValid && isEmailValid && isMessageValid) {
        // Show loading state
        submitBtn.classList.add('loading');
        
        try {
            // Simulate API call
            await simulateSubmission();
            
            // Hide loading state
            submitBtn.classList.remove('loading');
            
            // Show success message with animation
            successMessage.classList.remove('hidden');
            setTimeout(() => {
                successMessage.classList.add('show');
            }, 10);
            
            // Reset form after 2 seconds
            setTimeout(() => {
                form.reset();
                successMessage.classList.remove('show');
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 300);
            }, 2000);
            
        } catch (error) {
            // Handle error case
            submitBtn.classList.remove('loading');
            showError(messageInput, messageError, 'Failed to send message. Please try again.');
        }
    }
});