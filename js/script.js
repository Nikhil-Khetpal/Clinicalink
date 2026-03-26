// Clinicalink Gaming Platform - Main JavaScript

// Global Variables
let currentUser = null;
let sessionToken = null;

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    checkUserSession();
});

// Initialize Application
function initializeApp() {
    console.log('🎮 Clinicalink Gaming Platform Initialized');
    
    // Initialize tooltips
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Initialize animations
    initializeAnimations();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
}

// Setup Event Listeners
function setupEventListeners() {
    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // Navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    
    // Window scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Check User Session
function checkUserSession() {
    const token = sessionStorage.getItem('sessionToken');
    const userType = sessionStorage.getItem('userType');
    
    if (token && userType) {
        sessionToken = token;
        currentUser = {
            type: userType,
            token: token
        };
        
        // Update UI for logged in user
        updateUIForLoggedInUser();
    }
}

// Handle Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const action = form.getAttribute('action') || form.id;
    
    // Show loading state
    showLoading();
    
    // Validate form
    if (!validateForm(form)) {
        hideLoading();
        return;
    }
    
    // Process form based on action
    switch (action) {
        case 'registrationForm':
            handleRegistration(formData);
            break;
        case 'loginForm':
            handleLogin(formData);
            break;
        default:
            console.log('Form submitted:', action, formData);
            hideLoading();
            showMessage('Form submitted successfully!', 'success');
    }
}

// Validate Form
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showInputError(input, 'This field is required');
            isValid = false;
        } else {
            clearInputError(input);
        }
    });
    
    // Email validation
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        if (input.value && !validateEmail(input.value)) {
            showInputError(input, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    // Password validation
    const passwordInputs = form.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        if (input.value && input.value.length < 8) {
            showInputError(input, 'Password must be at least 8 characters');
            isValid = false;
        }
    });
    
    return isValid;
}

// Show Input Error
function showInputError(input, message) {
    clearInputError(input);
    
    input.classList.add('is-invalid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

// Clear Input Error
function clearInputError(input) {
    input.classList.remove('is-invalid');
    const errorDiv = input.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Handle Registration
function handleRegistration(formData) {
    const data = Object.fromEntries(formData);
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        
        // Mock successful registration
        showMessage('Registration successful! Please login to continue.', 'success');
        
        // Redirect to login
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }, 2000);
}

// Handle Login
function handleLogin(formData) {
    const data = Object.fromEntries(formData);
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        
        // Mock successful login
        if (data.email && data.password) {
            // Store session
            sessionStorage.setItem('sessionToken', 'mock-token-' + Date.now());
            sessionStorage.setItem('userType', data.user_type || 'patient');
            sessionStorage.setItem('userEmail', data.email);
            
            showMessage('Login successful! Redirecting...', 'success');
            
            // Redirect based on user type
            setTimeout(() => {
                if (data.user_type === 'doctor') {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            }, 1500);
        } else {
            showMessage('Invalid credentials', 'error');
        }
    }, 2000);
}

// Navigation Link Click Handler
function handleNavLinkClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle Scroll Events
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// Handle Keyboard Shortcuts
function handleKeyboardShortcuts(e) {
    // ESC - Go back
    if (e.key === 'Escape') {
        goBack();
    }
    
    // Ctrl/Cmd + K - Focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        focusSearchInput();
    }
}

// Initialize Animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .stat-card, .data-section');
    animatedElements.forEach(el => observer.observe(el));
}

// Setup Smooth Scrolling
function setupSmoothScrolling() {
    // Already handled in handleNavLinkClick
}

// Update UI for Logged In User
function updateUIForLoggedInUser() {
    const userType = sessionStorage.getItem('userType');
    const userEmail = sessionStorage.getItem('userEmail');
    
    // Update navigation
    const navLinks = document.querySelector('.navbar-nav');
    if (navLinks) {
        // Add user menu
        const userMenuItem = document.createElement('li');
        userMenuItem.className = 'nav-item dropdown';
        userMenuItem.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i class="fas fa-user me-1"></i>${userEmail}
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#"><i class="fas fa-user me-2"></i>Profile</a></li>
                <li><a class="dropdown-item" href="#"><i class="fas fa-cog me-2"></i>Settings</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
            </ul>
        `;
        navLinks.appendChild(userMenuItem);
    }
}

// Utility Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-popup ${type}`;
    messageDiv.textContent = message;
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Show message
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 100);
    
    // Hide after 3 seconds
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

function showLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('active');
    }
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('active');
    }
}

function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}

function focusSearchInput() {
    const searchInput = document.querySelector('input[type="search"], input[placeholder*="search"]');
    if (searchInput) {
        searchInput.focus();
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear session
        sessionStorage.clear();
        
        showMessage('Logged out successfully', 'success');
        
        // Redirect to home
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
}

// API Functions (for future backend integration)
async function apiCall(endpoint, method = 'GET', data = null) {
    const url = `../php-database/api/${endpoint}`;
    
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    if (sessionToken) {
        options.headers['Authorization'] = `Bearer ${sessionToken}`;
    }
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'API call failed');
        }
        
        return result;
    } catch (error) {
        console.error('API Error:', error);
        showMessage(error.message, 'error');
        throw error;
    }
}

// Specific API Functions
async function loginUser(email, password, userType) {
    return await apiCall('auth/login', 'POST', {
        email: email,
        password: password,
        user_type: userType
    });
}

async function registerUser(userData) {
    return await apiCall('auth/register', 'POST', userData);
}

async function getUserProfile() {
    return await apiCall('user/profile');
}

async function getNearbyEmergencyServices(lat, lng, radius = 10) {
    return await apiCall(`emergency/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
}

async function createAppointment(appointmentData) {
    return await apiCall('appointments/create', 'POST', appointmentData);
}

// Geolocation Functions
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                reject(new Error('Unable to retrieve location: ' + error.message));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
}

// Chart Functions (for admin dashboard)
function createChart(canvasId, type, data, options = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#ffffff'
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    color: '#ffffff'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            x: {
                ticks: {
                    color: '#ffffff'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        }
    };
    
    return new Chart(ctx, {
        type: type,
        data: data,
        options: { ...defaultOptions, ...options }
    });
}

// Export Functions
function exportToCSV(data, filename) {
    const csv = convertToCSV(data);
    downloadFile(csv, filename, 'text/csv');
}

function convertToCSV(data) {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(',');
    
    const csvRows = data.map(row => {
        return headers.map(header => {
            const value = row[header];
            return typeof value === 'string' && value.includes(',') 
                ? `"${value}"` 
                : value;
        }).join(',');
    });
    
    return [csvHeaders, ...csvRows].join('\n');
}

function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Local Storage Functions
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}

// Performance Monitoring
function trackPageLoad() {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error tracking service
});

// Initialize performance monitoring
trackPageLoad();

// Export main functions for global access
window.Clinicalink = {
    apiCall,
    showMessage,
    showLoading,
    hideLoading,
    goBack,
    logout,
    getCurrentLocation,
    createChart,
    exportToCSV,
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage
};

console.log('🎮 Clinicalink Gaming Platform - JavaScript Loaded');
