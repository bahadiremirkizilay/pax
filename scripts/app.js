// Main Application Module
document.addEventListener('DOMContentLoaded', async () => {
    console.log('PAX Event Discovery Platform - Initializing...');
    
    // Initialize the application
    await initialize();
});

// Initialize application
async function initialize() {
    try {
        // Show loading state
        showLoadingState();
        
        // Load events data
        await loadEvents();
        
        // Initialize filters
        initializeFilters();
        
        // Initialize navigation
        initializeNavigation();
        
        // Initialize modal
        initializeModal();
        
        // Initialize smooth scrolling
        initializeSmoothScroll();
        
        console.log('PAX Event Discovery Platform - Ready!');
    } catch (error) {
        console.error('Initialization error:', error);
        showError('Uygulama başlatılırken bir hata oluştu.');
    }
}

// Show loading state
function showLoadingState() {
    const eventsGrid = document.getElementById('eventsGrid');
    if (eventsGrid) {
        eventsGrid.innerHTML = `
            <div class="loading" style="grid-column: 1/-1;">
                Etkinlikler yükleniyor...
            </div>
        `;
    }
}

// Initialize navigation
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Initialize modal
function initializeModal() {
    const modal = document.getElementById('eventModal');
    const modalClose = document.querySelector('.modal-close');
    
    if (modal && modalClose) {
        // Close button
        modalClose.addEventListener('click', closeEventModal);
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeEventModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeEventModal();
            }
        });
    }
}

// Initialize smooth scrolling
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add scroll effects
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow to header on scroll
    if (currentScroll > 10) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe event cards for animation
function observeEventCards() {
    document.querySelectorAll('.event-card').forEach(card => {
        observer.observe(card);
    });
}

// Call after events are rendered
const originalRenderEvents = window.renderEvents;
window.renderEvents = function(events) {
    originalRenderEvents(events);
    // Add slight delay for observer to work properly
    setTimeout(observeEventCards, 100);
};

// Add CSS for animation
const style = document.createElement('style');
style.textContent = `
    .event-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .event-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .header.scrolled {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    /* Hamburger animation */
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Analytics and tracking (placeholder)
function trackEvent(eventName, eventData) {
    console.log('Track Event:', eventName, eventData);
    // Implement analytics tracking here (e.g., Google Analytics, Mixpanel, etc.)
}

// Track page view
trackEvent('page_view', {
    page: 'home',
    timestamp: new Date().toISOString()
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
    trackEvent('page_load', {
        loadTime: loadTime
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    trackEvent('error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno
    });
});

// Service Worker registration (for future PWA implementation)
if ('serviceWorker' in navigator) {
    // Uncomment when service worker is implemented
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered', reg))
    //     .catch(err => console.log('Service Worker registration failed', err));
}

// Export for debugging
window.PAX = {
    version: '1.0.0',
    initialize,
    trackEvent,
    observeEventCards
};

console.log('PAX Event Discovery Platform v1.0.0');
