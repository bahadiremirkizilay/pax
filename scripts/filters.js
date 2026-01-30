// Filters Module
let activeCategory = 'all';
let activeCity = '';
let activeDate = '';
let activePrice = '';
let activeSearch = '';

// Apply all filters
function applyFilters() {
    let filtered = [...allEvents];
    
    // Category filter
    if (activeCategory && activeCategory !== 'all') {
        filtered = filtered.filter(event => event.category === activeCategory);
    }
    
    // City filter
    if (activeCity) {
        filtered = filtered.filter(event => event.city === activeCity);
    }
    
    // Date filter
    if (activeDate) {
        filtered = filterByDate(filtered, activeDate);
    }
    
    // Price filter
    if (activePrice) {
        filtered = filterByPrice(filtered, activePrice);
    }
    
    // Search filter
    if (activeSearch) {
        filtered = searchEvents(activeSearch);
        // Apply other filters on search results
        if (activeCategory && activeCategory !== 'all') {
            filtered = filtered.filter(event => event.category === activeCategory);
        }
        if (activeCity) {
            filtered = filtered.filter(event => event.city === activeCity);
        }
        if (activeDate) {
            filtered = filterByDate(filtered, activeDate);
        }
        if (activePrice) {
            filtered = filterByPrice(filtered, activePrice);
        }
    }
    
    window.filteredEvents = filtered;
    renderEvents(filtered);
}

// Filter by date
function filterByDate(events, dateFilter) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (dateFilter) {
        case 'today':
            return events.filter(event => {
                const eventDate = new Date(event.date);
                const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
                return eventDay.getTime() === today.getTime();
            });
            
        case 'week':
            const nextWeek = new Date(today);
            nextWeek.setDate(today.getDate() + 7);
            return events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= today && eventDate <= nextWeek;
            });
            
        case 'month':
            const nextMonth = new Date(today);
            nextMonth.setMonth(today.getMonth() + 1);
            return events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate >= today && eventDate <= nextMonth;
            });
            
        default:
            return events;
    }
}

// Filter by price
function filterByPrice(events, priceFilter) {
    switch (priceFilter) {
        case 'free':
            return events.filter(event => {
                return !event.price || 
                       event.price === 'Ücretsiz' || 
                       event.price.toLowerCase() === 'ücretsiz';
            });
            
        case '0-100':
            return events.filter(event => {
                if (!event.price || event.price === 'Ücretsiz') return false;
                const price = extractMinPrice(event.price);
                return price >= 0 && price <= 100;
            });
            
        case '100-300':
            return events.filter(event => {
                if (!event.price || event.price === 'Ücretsiz') return false;
                const price = extractMinPrice(event.price);
                return price > 100 && price <= 300;
            });
            
        case '300-500':
            return events.filter(event => {
                if (!event.price || event.price === 'Ücretsiz') return false;
                const price = extractMinPrice(event.price);
                return price > 300 && price <= 500;
            });
            
        case '500+':
            return events.filter(event => {
                if (!event.price || event.price === 'Ücretsiz') return false;
                const price = extractMinPrice(event.price);
                return price > 500;
            });
            
        default:
            return events;
    }
}

// Extract minimum price from price string
function extractMinPrice(priceStr) {
    if (typeof priceStr === 'number') return priceStr;
    if (typeof priceStr !== 'string') return 0;
    
    // Handle range like "200-500"
    if (priceStr.includes('-')) {
        const parts = priceStr.split('-');
        return parseInt(parts[0]) || 0;
    }
    
    // Handle single price
    const price = parseInt(priceStr.replace(/[^\d]/g, ''));
    return isNaN(price) ? 0 : price;
}

// Set category filter
function setCategoryFilter(category) {
    activeCategory = category;
    
    // Update UI
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
        if (card.dataset.category === category) {
            card.classList.add('active');
        }
    });
    
    applyFilters();
}

// Set city filter
function setCityFilter(city) {
    activeCity = city;
    applyFilters();
}

// Set date filter
function setDateFilter(date) {
    activeDate = date;
    applyFilters();
}

// Set price filter
function setPriceFilter(price) {
    activePrice = price;
    applyFilters();
}

// Set search filter
function setSearchFilter(query) {
    activeSearch = query;
    applyFilters();
}

// Reset all filters
function resetAllFilters() {
    activeCategory = 'all';
    activeCity = '';
    activeDate = '';
    activePrice = '';
    activeSearch = '';
    
    // Reset UI
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
        if (card.dataset.category === 'all') {
            card.classList.add('active');
        }
    });
    
    const cityFilter = document.getElementById('cityFilter');
    const dateFilter = document.getElementById('dateFilter');
    const priceFilter = document.getElementById('priceFilter');
    const searchInput = document.getElementById('searchInput');
    
    if (cityFilter) cityFilter.value = '';
    if (dateFilter) dateFilter.value = '';
    if (priceFilter) priceFilter.value = '';
    if (searchInput) searchInput.value = '';
    
    applyFilters();
}

// Initialize filters
function initializeFilters() {
    // Category filter buttons
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            setCategoryFilter(category);
        });
    });
    
    // City filter
    const cityFilter = document.getElementById('cityFilter');
    if (cityFilter) {
        cityFilter.addEventListener('change', (e) => {
            setCityFilter(e.target.value);
        });
    }
    
    // Date filter
    const dateFilter = document.getElementById('dateFilter');
    if (dateFilter) {
        dateFilter.addEventListener('change', (e) => {
            setDateFilter(e.target.value);
        });
    }
    
    // Price filter
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter) {
        priceFilter.addEventListener('change', (e) => {
            setPriceFilter(e.target.value);
        });
    }
    
    // Search input with debounce
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                setSearchFilter(e.target.value);
            }, 300);
        });
        
        // Search button
        const searchButton = document.querySelector('.search-button');
        if (searchButton) {
            searchButton.addEventListener('click', () => {
                setSearchFilter(searchInput.value);
            });
        }
        
        // Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                clearTimeout(searchTimeout);
                setSearchFilter(e.target.value);
            }
        });
    }
    
    // Reset filters button
    const resetButton = document.getElementById('resetFilters');
    if (resetButton) {
        resetButton.addEventListener('click', resetAllFilters);
    }
}

// Export functions
window.initializeFilters = initializeFilters;
window.applyFilters = applyFilters;
window.resetAllFilters = resetAllFilters;
window.setCategoryFilter = setCategoryFilter;
window.setCityFilter = setCityFilter;
window.setDateFilter = setDateFilter;
window.setPriceFilter = setPriceFilter;
window.setSearchFilter = setSearchFilter;
