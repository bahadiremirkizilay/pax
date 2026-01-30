// Event Management Module
let allEvents = [];
let filteredEvents = [];

// Load events from JSON
async function loadEvents() {
    try {
        const response = await fetch('assets/data/events.json');
        allEvents = await response.json();
        filteredEvents = [...allEvents];
        renderEvents(filteredEvents);
        return allEvents;
    } catch (error) {
        console.error('Error loading events:', error);
        showError('Etkinlikler yüklenirken bir hata oluştu.');
        return [];
    }
}

// Render events to the grid
function renderEvents(events) {
    const eventsGrid = document.getElementById('eventsGrid');
    const noResults = document.getElementById('noResults');
    
    if (!eventsGrid) return;
    
    // Clear existing content
    eventsGrid.innerHTML = '';
    
    if (events.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    events.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });
}

// Create an event card element
function createEventCard(event) {
    const card = document.createElement('article');
    card.className = 'event-card';
    card.onclick = () => openEventModal(event);
    
    // Format date
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('tr-TR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    
    // Get category icon
    const categoryIcon = getCategoryIcon(event.category);
    
    // Format price
    const priceText = formatPrice(event.price, event.currency);
    
    card.innerHTML = `
        <div class="event-card-image">
            ${categoryIcon}
        </div>
        <div class="event-card-content">
            <span class="event-card-category">${event.category}</span>
            <h3 class="event-card-title">${event.title}</h3>
            <p class="event-card-description">${event.shortDescription}</p>
            <div class="event-card-meta">
                <div class="event-meta-item">
                    <span class="event-meta-icon">📅</span>
                    <span>${formattedDate} • ${event.time}</span>
                </div>
                <div class="event-meta-item">
                    <span class="event-meta-icon">📍</span>
                    <span>${event.city}</span>
                </div>
            </div>
            <div class="event-card-footer">
                <span class="event-card-price">${priceText}</span>
                <button class="event-card-button" onclick="event.stopPropagation(); openEventModal(${JSON.stringify(event).replace(/"/g, '&quot;')})">
                    Detaylar
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        'Müzik': '🎵',
        'Sanat & Kültür': '🎭',
        'Spor': '🏃',
        'Teknoloji': '💻',
        'Gastronomi': '🍕',
        'Aile': '👨‍👩‍👧‍👦',
        'Eğitim': '🎓'
    };
    return icons[category] || '🎯';
}

// Format price
function formatPrice(price, currency = 'TRY') {
    if (!price || price === 'Ücretsiz' || price.toLowerCase() === 'ücretsiz') {
        return 'Ücretsiz';
    }
    
    if (typeof price === 'string' && price.includes('-')) {
        return `${price} ${currency}`;
    }
    
    return `${price} ${currency}`;
}

// Open event modal
function openEventModal(event) {
    const modal = document.getElementById('eventModal');
    const modalBody = modal.querySelector('.modal-body');
    
    // Format date
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('tr-TR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        weekday: 'long'
    });
    
    // Get category icon
    const categoryIcon = getCategoryIcon(event.category);
    
    // Format price
    const priceText = formatPrice(event.price, event.currency);
    
    modalBody.innerHTML = `
        <div class="modal-hero">${categoryIcon}</div>
        <div class="modal-content-wrapper">
            <div class="modal-header">
                <span class="modal-category">${event.category}</span>
                <h2 class="modal-title">${event.title}</h2>
            </div>
            
            <div class="modal-meta">
                <div class="modal-meta-item">
                    <div class="modal-meta-icon">📅</div>
                    <div class="modal-meta-content">
                        <div class="modal-meta-label">Tarih & Saat</div>
                        <div class="modal-meta-value">${formattedDate}<br>${event.time}</div>
                    </div>
                </div>
                <div class="modal-meta-item">
                    <div class="modal-meta-icon">📍</div>
                    <div class="modal-meta-content">
                        <div class="modal-meta-label">Konum</div>
                        <div class="modal-meta-value">${event.location}</div>
                    </div>
                </div>
                <div class="modal-meta-item">
                    <div class="modal-meta-icon">💰</div>
                    <div class="modal-meta-content">
                        <div class="modal-meta-label">Fiyat</div>
                        <div class="modal-meta-value">${priceText}</div>
                    </div>
                </div>
                <div class="modal-meta-item">
                    <div class="modal-meta-icon">👥</div>
                    <div class="modal-meta-content">
                        <div class="modal-meta-label">Organizatör</div>
                        <div class="modal-meta-value">${event.organizer}</div>
                    </div>
                </div>
            </div>
            
            <div class="modal-section">
                <h3 class="modal-section-title">Etkinlik Hakkında</h3>
                <p class="modal-description">${event.fullDescription}</p>
            </div>
            
            ${event.tags && event.tags.length > 0 ? `
            <div class="modal-section">
                <h3 class="modal-section-title">Etiketler</h3>
                <div class="modal-tags">
                    ${event.tags.map(tag => `<span class="modal-tag">#${tag}</span>`).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="modal-section">
                <h3 class="modal-section-title">Konum</h3>
                <div class="modal-map-placeholder">
                    🗺️ Harita Entegrasyonu (Yakında)
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="modal-button modal-button-primary" onclick="alert('Bilet satın alma özelliği yakında eklenecek!')">
                    🎫 Bilet Al
                </button>
                <button class="modal-button modal-button-secondary" onclick="shareEvent(${JSON.stringify(event).replace(/"/g, '&quot;')})">
                    📤 Paylaş
                </button>
                <button class="modal-button modal-button-secondary" onclick="alert('Favorilere ekleme özelliği yakında eklenecek!')">
                    ❤️ Favorilere Ekle
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close event modal
function closeEventModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Share event
function shareEvent(event) {
    const shareText = `${event.title} - ${event.date} • ${event.location}`;
    
    if (navigator.share) {
        navigator.share({
            title: event.title,
            text: shareText,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Etkinlik bilgisi panoya kopyalandı!');
        }).catch(err => {
            console.error('Copy failed:', err);
        });
    }
}

// Show error message
function showError(message) {
    const eventsGrid = document.getElementById('eventsGrid');
    if (eventsGrid) {
        eventsGrid.innerHTML = `
            <div class="error-message" style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--error);">
                <p style="font-size: 1.25rem; margin-bottom: 1rem;">⚠️ ${message}</p>
                <button class="reset-button" onclick="location.reload()">Yeniden Dene</button>
            </div>
        `;
    }
}

// Search events
function searchEvents(query) {
    if (!query || query.trim() === '') {
        return allEvents;
    }
    
    const searchTerm = query.toLowerCase().trim();
    
    return allEvents.filter(event => {
        return (
            event.title.toLowerCase().includes(searchTerm) ||
            event.shortDescription.toLowerCase().includes(searchTerm) ||
            event.fullDescription.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm) ||
            event.city.toLowerCase().includes(searchTerm) ||
            event.organizer.toLowerCase().includes(searchTerm) ||
            (event.tags && event.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
    });
}

// Export functions for use in other modules
window.loadEvents = loadEvents;
window.renderEvents = renderEvents;
window.openEventModal = openEventModal;
window.closeEventModal = closeEventModal;
window.shareEvent = shareEvent;
window.searchEvents = searchEvents;
window.allEvents = allEvents;
window.filteredEvents = filteredEvents;
