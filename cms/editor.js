// ===========================
// WYSIWYG EDITOR
// Updated: 2026-03-27 (Gallery file upload feature added)
// ===========================

let editorMode = 'create'; // 'create' or 'edit'
let currentEventId = null;
let highlights = [];
let artists = [];
let galleryImages = [];

// ===========================
// TOAST NOTIFICATIONS
// ===========================
function showToast(message, type = 'error') {
  const existing = document.getElementById('pax-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'pax-toast';
  toast.className = `pax-toast pax-toast--${type}`;
  toast.innerHTML = `
    <span class="pax-toast__icon">${type === 'success' ? '&#x2713;' : '!'}</span>
    <span class="pax-toast__msg">${message}</span>
    <button class="pax-toast__close" aria-label="Kapat">&#x2715;</button>
  `;
  document.body.appendChild(toast);
  toast.querySelector('.pax-toast__close').addEventListener('click', () => toast.remove());
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, 4000);
}

// Debug helper (accessible from console)
window.debugGallery = function() {
  console.log('Gallery Images:', galleryImages);
  console.log('Gallery Images Count:', galleryImages.length);
  galleryImages.forEach((img, idx) => {
    console.log(`[${idx}] Type: ${img.startsWith('data:') ? 'FILE' : 'URL'}, Length: ${img.length}`);
  });
};

// Initialize editor
document.addEventListener('DOMContentLoaded', function() {
  // Check authentication
  const user = checkAuth();
  if (!user) return;
  
  // Load events from localStorage
  loadEventsFromStorage();
  
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  editorMode = urlParams.get('mode') || 'create';
  currentEventId = parseInt(urlParams.get('id')) || null;
  
  // Update mode indicator
  updateModeIndicator();
  
  // Load event if editing
  if (editorMode === 'edit' && currentEventId) {
    loadEventForEditing(currentEventId, user);
  } else {
    // Initialize empty editor
    initializeEmptyEditor();
  }
  
  // Setup event listeners
  setupEditorListeners();
});

function updateModeIndicator() {
  const indicator = document.getElementById('editor-mode-indicator');
  if (indicator) {
    indicator.textContent = editorMode === 'create' ? 'Create New Event' : 'Edit Event';
  }
  
  // Update save button label
  const publishBtn = document.getElementById('publish-btn');
  if (publishBtn) {
    publishBtn.innerHTML = `
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="display: inline-block; vertical-align: middle; margin-right: 4px;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 3H5a2 2 0 00-2 2v14l4-2 4 2 4-2 4 2V5a2 2 0 00-2-2z"></path>
                    </svg>
                    Kaydet`;
  }
}

function initializeEmptyEditor() {
  // Set default date to today
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  document.getElementById('event-date').value = dateStr;
  
  // Set default time
  document.getElementById('event-time').value = '20:00';
  
  // Initialize empty lists
  highlights = [];
  artists = [];
  renderHighlights();
  renderArtists();
  
  // Load organizer profile information from localStorage
  loadOrganizerProfile();
}

// Load organizer profile information
function loadOrganizerProfile() {
  const organizerName = localStorage.getItem('paxOrganizerName') || '';
  
  // Fill organizer name field
  const organizerNameInput = document.getElementById('organizer-name');
  if (organizerNameInput) {
    organizerNameInput.value = organizerName;
  }
}

// Save organizer profile to localStorage
function saveOrganizerProfile(name) {
  if (name) localStorage.setItem('paxOrganizerName', name);
  // Contact info is saved from profile modal, not from editor
}

// Convert "8:00 PM" format to "20:00" format
function convertTo24HourFormat(time12h) {
  if (!time12h) return '';
  
  // If already in 24-hour format (contains :), return as is
  if (!time12h.includes('AM') && !time12h.includes('PM')) {
    return time12h;
  }
  
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (hours === '12') {
    hours = '00';
  }
  
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

// Convert "20:00" format to "8:00 PM" format
function convertTo12HourFormat(time24h) {
  if (!time24h) return '';
  
  // If already in 12-hour format (contains AM/PM), return as is
  if (time24h.includes('AM') || time24h.includes('PM')) {
    return time24h;
  }
  
  let [hours, minutes] = time24h.split(':');
  hours = parseInt(hours, 10);
  
  const modifier = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  
  return `${hours}:${minutes} ${modifier}`;
}

function loadEventForEditing(eventId, user) {
  console.log('Loading event for editing, ID:', eventId, 'Type:', typeof eventId);
  console.log('Current user:', user);
  console.log('Available events:', eventsData.map(e => ({id: e.id, title: e.title, createdBy: e.createdBy})));
  
  // Find event in eventsData - use loose equality to handle string/number mismatch
  let event = eventsData.find(e => e.id == eventId);
  
  if (!event) {
    // Event might be a draft (not in eventsData); check localStorage directly
    const allEvents = JSON.parse(localStorage.getItem('eventsData') || '[]');
    event = allEvents.find(e => e.id == eventId);
    if (event) {
      // Add to in-memory eventsData so the rest of the editor can work with it
      eventsData.push(event);
    }
  }
  
  if (!event) {
    console.error('Event not found! Looking for ID:', eventId);
    showToast('Event not found!', 'error');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
    return;
  }
  
  console.log('Event found:', event);
  console.log('Event createdBy:', event.createdBy, 'User email:', user.email, 'User ID:', user.id);
  
  // Check permissions
  const hasPermission = canEditEvent(event.createdBy);
  console.log('Has permission to edit:', hasPermission);
  
  if (!hasPermission) {
    showToast('You do not have permission to edit this event.', 'error');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
    return;
  }
  
  console.log('Loading event for editing:', event); // Debug log
  
  // Populate form fields
  const mainImage = document.getElementById('main-event-image');
  const imageUrlInput = document.getElementById('image-url');
  
  if (mainImage && event.image) {
    mainImage.src = event.image;
  }
  
  if (imageUrlInput && event.image) {
    imageUrlInput.value = event.image;
  }
  
  const categorySelect = document.getElementById('event-category');
  if (categorySelect && event.category) {
    categorySelect.value = event.category;
  }
  
  const titleInput = document.getElementById('event-title');
  if (titleInput) {
    titleInput.value = event.title || '';
  }
  
  const dateInput = document.getElementById('event-date');
  if (dateInput) {
    dateInput.value = event.date || '';
  }
  
  const timeInput = document.getElementById('event-time');
  if (timeInput && event.time) {
    // Convert "8:00 PM" format to "20:00" format for HTML5 time input
    const timeValue = convertTo24HourFormat(event.time);
    timeInput.value = timeValue;
  }
  
  const venueInput = document.getElementById('event-venue');
  if (venueInput) {
    venueInput.value = event.venue || '';
  }
  
  const cityInput = document.getElementById('event-city');
  if (cityInput) {
    cityInput.value = event.city || '';
  }
  
  // Description - IMPORTANT: Set value directly
  const descriptionInput = document.getElementById('event-description');
  if (descriptionInput) {
    descriptionInput.value = event.description || '';
    console.log('Description loaded:', event.description); // Debug log
  }
  
  // Highlights - Load into global array first
  highlights = Array.isArray(event.highlights) ? [...event.highlights] : [];
  console.log('Highlights loaded:', highlights); // Debug log
  renderHighlights();
  
  // Venue details
  const venueNameInput = document.getElementById('venue-name');
  if (venueNameInput) {
    venueNameInput.value = event.venue || '';
  }
  
  const venueAddressInput = document.getElementById('venue-address');
  if (venueAddressInput) {
    venueAddressInput.value = event.venueAddress || '';
    console.log('Venue address loaded:', event.venueAddress); // Debug log
  }
  
  const locationLinkInput = document.getElementById('location-link');
  if (locationLinkInput) {
    locationLinkInput.value = event.locationLink || '';
  }
  
  // Metadata
  const genresInput = document.getElementById('event-genres');
  if (genresInput) {
    genresInput.value = event.genres || '';
  }
  
  const ageInput = document.getElementById('event-age');
  if (ageInput) {
    ageInput.value = event.ageRequirement || '21+';
  }
  
  const dressCodeInput = document.getElementById('event-dress-code');
  if (dressCodeInput) {
    dressCodeInput.value = event.dressCode || '';
  }
  
  const priceLevelInput = document.getElementById('event-price-level');
  if (priceLevelInput) {
    priceLevelInput.value = event.priceLevel || 3;
  }
  
  // Organizer information
  const organizerNameInput = document.getElementById('organizer-name');
  if (organizerNameInput) {
    organizerNameInput.value = event.organizer?.name || user.name || '';
  }
  
  // Artists - Load into global array first
  artists = Array.isArray(event.artists) ? [...event.artists] : [];
  console.log('Artists loaded:', artists); // Debug log
  renderArtists();
  
  // Gallery - Load into global array
  galleryImages = Array.isArray(event.gallery) ? [...event.gallery] : [];
  renderGallery();
  
  // Promo Image

  
  // Ticket information (if exists)
  const ticketPriceInput = document.getElementById('ticket-price');
  if (ticketPriceInput && event.ticketPrice) {
    ticketPriceInput.value = event.ticketPrice;
  }
  
  const ticketLinkInput = document.getElementById('ticket-link');
  if (ticketLinkInput && event.ticketLink) {
    ticketLinkInput.value = event.ticketLink;
  }
  
  console.log('Event loading completed'); // Debug log
}

function setupEditorListeners() {
  // Image upload
  const imageUpload = document.getElementById('image-upload');
  const imageUrl = document.getElementById('image-url');
  const mainImage = document.getElementById('main-event-image');
  
  if (imageUpload) {
    imageUpload.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          mainImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
  
  if (imageUrl) {
    imageUrl.addEventListener('change', function(e) {
      const url = e.target.value.trim();
      if (url) {
        mainImage.src = url;
      }
    });
  }
  
  // Highlights
  const newHighlight = document.getElementById('new-highlight');
  if (newHighlight) {
    newHighlight.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        addHighlight();
      }
    });
  }
  
  // Artists
  const addArtistBtn = document.getElementById('add-artist-btn');
  if (addArtistBtn) {
    addArtistBtn.addEventListener('click', addArtist);
  }
  
  // Gallery
  const addGalleryBtn = document.getElementById('add-gallery-btn');
  if (addGalleryBtn) {
    addGalleryBtn.addEventListener('click', addGalleryImage);
  }
  
  const newGalleryUrl = document.getElementById('new-gallery-url');
  if (newGalleryUrl) {
    newGalleryUrl.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        addGalleryImage();
      }
    });
  }
  
  // Gallery file upload
  const galleryFileUpload = document.getElementById('gallery-file-upload');
  if (galleryFileUpload) {
    galleryFileUpload.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          showToast('Please select an image file', 'error');
          galleryFileUpload.value = '';
          return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          showToast('Image size must be less than 5MB', 'error');
          galleryFileUpload.value = '';
          return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
          const imageDataUrl = event.target.result;
          if (imageDataUrl && imageDataUrl.startsWith('data:image')) {
            galleryImages.push(imageDataUrl);
            renderGallery();
            console.log('Gallery image added successfully');
          } else {
            showToast('Failed to read image file', 'error');
          }
          // Reset file input
          galleryFileUpload.value = '';
        };
        reader.onerror = function() {
          showToast('Error reading file. Please try again.', 'error');
          galleryFileUpload.value = '';
        };
        reader.readAsDataURL(file);
      }
    });
  }
  
  // Preview button
  const previewBtn = document.getElementById('preview-btn');
  if (previewBtn) {
    previewBtn.addEventListener('click', previewEvent);
  }

  // Save button (draft)
  const publishBtn = document.getElementById('publish-btn');
  if (publishBtn) {
    publishBtn.addEventListener('click', () => saveEvent('draft'));
  }

  // Publish now button
  const publishNowBtn = document.getElementById('publish-now-btn');
  if (publishNowBtn) {
    publishNowBtn.addEventListener('click', () => saveEvent('publish'));
  }

  const shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', shareEvent);
  }
  
  // Accordion functionality
  initializeAccordions();
}

// Highlights Management
function addHighlight() {
  const input = document.getElementById('new-highlight');
  const text = input.value.trim();
  
  if (text) {
    highlights.push(text);
    renderHighlights();
    input.value = '';
  }
}

function removeHighlight(index) {
  highlights.splice(index, 1);
  renderHighlights();
}

function renderHighlights() {
  const list = document.getElementById('highlights-list');
  if (!list) return;
  
  if (highlights.length === 0) {
    list.innerHTML = '<li style="color: var(--text-muted); border: 1px dashed rgba(255,255,255,0.1);">No highlights added yet</li>';
    return;
  }
  
  list.innerHTML = highlights.map((highlight, index) => `
    <li>
      <span class="highlight-text">${highlight}</span>
      <button class="remove-item-btn" onclick="removeHighlight(${index})">Remove</button>
    </li>
  `).join('');
}

// Artists Management
function addArtist() {
  const nameInput = document.getElementById('new-artist-name');
  const genreInput = document.getElementById('new-artist-genre');
  
  const name = nameInput.value.trim();
  const genre = genreInput.value.trim();
  
  if (name && genre) {
    artists.push({ name, genre });
    renderArtists();
    nameInput.value = '';
    genreInput.value = '';
  } else {
    showToast('Please enter both artist name and genre', 'error');
  }
}

function removeArtist(index) {
  artists.splice(index, 1);
  renderArtists();
}

function renderArtists() {
  const list = document.getElementById('artists-list');
  if (!list) return;
  
  if (artists.length === 0) {
    list.innerHTML = '<div style="color: var(--text-muted); padding: 1rem; text-align: center; border: 1px dashed rgba(255,255,255,0.1); border-radius: 8px;">No artists added yet</div>';
    return;
  }
  
  list.innerHTML = artists.map((artist, index) => `
    <div class="artist-editor-item">
      <div class="artist-editor-header">
        <div>
          <div class="artist-editor-name">${artist.name}</div>
          <div class="artist-editor-genre">${artist.genre}</div>
        </div>
        <button class="remove-item-btn" onclick="removeArtist(${index})">Remove</button>
      </div>
    </div>
  `).join('');
}

// Gallery Management
function addGalleryImage() {
  const urlInput = document.getElementById('new-gallery-url');
  const url = urlInput.value.trim();
  
  if (url) {
    // Basic URL validation
    try {
      const urlObj = new URL(url);
      // Check if it's a reasonable image URL
      const isImageUrl = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(urlObj.pathname) || 
                        url.includes('unsplash.com') || 
                        url.includes('imgur.com') ||
                        url.includes('images') ||
                        urlObj.hostname;
      
      if (!isImageUrl) {
        const confirm = window.confirm('This might not be an image URL. Add anyway?');
        if (!confirm) return;
      }
      
      galleryImages.push(url);
      renderGallery();
      urlInput.value = '';
      console.log('Gallery URL added:', url);
    } catch (e) {
      showToast('Please enter a valid URL (e.g., https://example.com/image.jpg)', 'error');
      console.error('Invalid URL:', e);
    }
  } else {
    // If no URL, check if user wants to upload a file instead
    const fileInput = document.getElementById('gallery-file-upload');
    if (fileInput) {
      fileInput.click();
    }
  }
}

function removeGalleryImage(index) {
  galleryImages.splice(index, 1);
  renderGallery();
}

function renderGallery() {
  const list = document.getElementById('gallery-list');
  if (!list) return;
  
  if (galleryImages.length === 0) {
    list.innerHTML = '<div style="color: var(--text-muted); padding: 1rem; text-align: center; border: 1px dashed rgba(255,255,255,0.1); border-radius: 8px;">No gallery images added yet</div>';
    return;
  }
  
  list.innerHTML = galleryImages.map((url, index) => {
    // Escape quotes in URL for safety
    const safeUrl = url.replace(/"/g, '&quot;');
    return `
      <div class="gallery-editor-item">
        <img src="${safeUrl}" 
             alt="Gallery ${index + 1}" 
             class="gallery-editor-thumb" 
             loading="lazy"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        <div style="display:none; padding:1rem; color:var(--text-muted); font-size:0.75rem; text-align:center;">Failed to load</div>
        <button class="remove-item-btn" onclick="removeGalleryImage(${index})">Remove</button>
      </div>
    `;
  }).join('');
}

// Accordion functionality
function initializeAccordions() {
  const triggers = document.querySelectorAll('.accordion-trigger');
  
  triggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const card = this.closest('.accordion-card');
      const content = card.querySelector('.accordion-content');
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      // Toggle
      this.setAttribute('aria-expanded', !isExpanded);
      content.style.display = isExpanded ? 'none' : 'block';
    });
  });
}

// Form Validation
function validateForm() {
  const title = document.getElementById('event-title').value.trim();
  const date = document.getElementById('event-date').value;
  const time = document.getElementById('event-time').value;
  const venue = document.getElementById('event-venue').value.trim();
  const city = document.getElementById('event-city').value.trim();
  const description = document.getElementById('event-description').value.trim();
  const venueAddress = document.getElementById('venue-address').value.trim();
  const ageRequirement = document.getElementById('event-age').value;
  
  // In edit mode, allow empty fields if existing event has data
  if (editorMode === 'edit') {
    const existingEvent = eventsData.find(e => e.id === currentEventId);
    if (existingEvent) {
      // Check if at least some data exists (either new or existing)
      if (!title && !existingEvent.title) {
        showToast('Please enter an event title', 'error');
        document.getElementById('event-title').focus();
        return false;
      }
      
      if (!date && !existingEvent.date) {
        showToast('Please select an event date', 'error');
        document.getElementById('event-date').focus();
        return false;
      }
      
      if (!time && !existingEvent.time) {
        showToast('Please select an event time', 'error');
        document.getElementById('event-time').focus();
        return false;
      }
      
      if (!venue && !existingEvent.venue) {
        showToast('Please enter a venue name', 'error');
        document.getElementById('event-venue').focus();
        return false;
      }
      
      if (!city && !existingEvent.city) {
        showToast('Please enter a city', 'error');
        document.getElementById('event-city').focus();
        return false;
      }
      
      if (!description && !existingEvent.description) {
        showToast('Please write an event description', 'error');
        document.getElementById('event-description').focus();
        return false;
      }
      
      if (!venueAddress && !existingEvent.venueAddress) {
        showToast('Please enter the full venue address', 'error');
        document.getElementById('venue-address').focus();
        return false;
      }
      
      if (!ageRequirement && !existingEvent.ageRequirement) {
        showToast('Please select an age requirement', 'error');
        document.getElementById('event-age').focus();
        return false;
      }
      
      // Validate location link in edit mode
      const locationLink = document.getElementById('location-link').value.trim();
      if (!locationLink && !existingEvent.locationLink) {
        showToast('Please enter a Google Maps link for the venue location', 'error');
        document.getElementById('location-link').focus();
        return false;
      }
      
      // Check if it's a shortened link and warn user
      if (locationLink && (locationLink.includes('goo.gl') || locationLink.includes('maps.app.goo.gl'))) {
        const useShortLink = confirm(
          '⚠️ WARNING: You are using a shortened Google Maps link (goo.gl).\n\n' +
          'Shortened links may not display correctly in the embedded map.\n\n' +
          'For best results, please use the full Google Maps URL.\n\n' +
          'Do you want to continue with the shortened link anyway?'
        );
        
        if (!useShortLink) {
          document.getElementById('location-link').focus();
          return false;
        }
      }
      
      return true;
    }
  }
  
  // In create mode, all fields are required
  if (!title) {
    showToast('Please enter an event title', 'error');
    document.getElementById('event-title').focus();
    return false;
  }
  
  if (!date) {
    showToast('Please select an event date', 'error');
    document.getElementById('event-date').focus();
    return false;
  }
  
  if (!time) {
    showToast('Please select an event time', 'error');
    document.getElementById('event-time').focus();
    return false;
  }
  
  if (!venue) {
    showToast('Please enter a venue name', 'error');
    document.getElementById('event-venue').focus();
    return false;
  }
  
  if (!city) {
    showToast('Please enter a city', 'error');
    document.getElementById('event-city').focus();
    return false;
  }
  
  if (!description) {
    showToast('Please write an event description', 'error');
    document.getElementById('event-description').focus();
    return false;
  }
  
  if (!venueAddress) {
    showToast('Please enter the full venue address', 'error');
    document.getElementById('venue-address').focus();
    return false;
  }
  
  if (!ageRequirement) {
    showToast('Please select an age requirement', 'error');
    document.getElementById('event-age').focus();
    return false;
  }
  
  // Validate location link
  const locationLink = document.getElementById('location-link').value.trim();
  if (!locationLink) {
    showToast('Please enter a Google Maps link for the venue location', 'error');
    document.getElementById('location-link').focus();
    return false;
  }
  
  // Check if it's a shortened link and warn user
  if (locationLink.includes('goo.gl') || locationLink.includes('maps.app.goo.gl')) {
    const useShortLink = confirm(
      '⚠️ WARNING: You are using a shortened Google Maps link (goo.gl).\n\n' +
      'Shortened links may not display correctly in the embedded map.\n\n' +
      'For best results, please use the full Google Maps URL:\n' +
      '1. Open Google Maps\n' +
      '2. Search for your location\n' +
      '3. Click Share → Copy link\n' +
      '4. Use the LONG URL (starts with https://www.google.com/maps/place/...)\n\n' +
      'Do you want to continue with the shortened link anyway?'
    );
    
    if (!useShortLink) {
      document.getElementById('location-link').focus();
      return false;
    }
  }
  
  return true;
}

// Collect Form Data
function collectFormData(existingEvent = null) {
  const organizerNameInput = document.getElementById('organizer-name');
  
  // Auto-calculate events count for this organizer
  const userEmail = localStorage.getItem('paxUserEmail');
  const allStoredEvents = JSON.parse(localStorage.getItem('eventsData') || '[]');
  const autoEventsCount = String(allStoredEvents.filter(e => e.createdBy === userEmail).length);
  
  // Get input values
  const imageValue = document.getElementById('main-event-image').src;
  const titleValue = document.getElementById('event-title').value.trim();
  const dateValue = document.getElementById('event-date').value;
  const timeValue = document.getElementById('event-time').value;
  const venueValue = document.getElementById('event-venue').value.trim();
  const cityValue = document.getElementById('event-city').value.trim();
  const descriptionValue = document.getElementById('event-description').value.trim();
  const venueAddressValue = document.getElementById('venue-address')?.value.trim();
  const locationLinkValue = document.getElementById('location-link')?.value.trim();
  const genresValue = document.getElementById('event-genres')?.value.trim();
  const dressCodeValue = document.getElementById('event-dress-code')?.value.trim();
  const organizerNameValue = organizerNameInput?.value.trim();
  
  return {
    // Core fields - use new value, fallback to existing, then default
    image: imageValue || existingEvent?.image || '',
    category: document.getElementById('event-category').value || existingEvent?.category || 'Music Festival',
    title: titleValue || existingEvent?.title || '',
    date: dateValue || existingEvent?.date || '',
    time: convertTo12HourFormat(timeValue) || existingEvent?.time || '',
    venue: venueValue || existingEvent?.venue || '',
    city: cityValue || existingEvent?.city || '',
    description: descriptionValue || existingEvent?.description || '',
    
    // Arrays - use current state or existing
    highlights: highlights.length > 0 ? highlights : (existingEvent?.highlights || []),
    artists: artists.length > 0 ? artists : (existingEvent?.artists || []),
    gallery: galleryImages.length > 0 ? galleryImages : (existingEvent?.gallery || []),
    
    // Optional fields - preserve existing if not filled
    venueAddress: venueAddressValue || existingEvent?.venueAddress || '',
    locationLink: locationLinkValue || existingEvent?.locationLink || '',
    genres: genresValue || existingEvent?.genres || '',
    ageRequirement: document.getElementById('event-age')?.value || existingEvent?.ageRequirement || '21+',
    dressCode: dressCodeValue || existingEvent?.dressCode || '',
    priceLevel: parseInt(document.getElementById('event-price-level')?.value) || existingEvent?.priceLevel || 3,
    ticketLink: document.getElementById('ticket-link')?.value.trim() || existingEvent?.ticketLink || '',
    
    // Organizer info - preserve existing if not filled
    organizer: {
      name: organizerNameValue || existingEvent?.organizer?.name || '',
      events: autoEventsCount,
      email: localStorage.getItem('paxOrganizerEmail') || localStorage.getItem('paxUserEmail') || existingEvent?.organizer?.email || '',
      phone: localStorage.getItem('paxOrganizerPhone') || existingEvent?.organizer?.phone || '',
      instagram: localStorage.getItem('paxOrganizerInstagram') || existingEvent?.organizer?.instagram || ''
    },
  };
}

// Preview Event — shows an in-page modal overlay with an iframe
function previewEvent() {
  const user = checkAuth();
  if (!user) return;

  // Collect current form data without saving permanently
  const existingEvent = editorMode === 'edit'
    ? eventsData.find(e => e.id === currentEventId) || null
    : null;

  const formData = collectFormData(existingEvent);

  // Build a temporary preview event object
  const previewData = {
    id: existingEvent ? existingEvent.id : '__preview__',
    ...formData,
    createdBy: user.email,
    views: existingEvent ? existingEvent.views : 0,
    status: existingEvent ? existingEvent.status : 'draft'
  };

  // Store temporarily in localStorage for the detail page to consume
  localStorage.setItem('paxPreviewEvent', JSON.stringify(previewData));

  // Show the modal overlay
  const modal = document.getElementById('preview-modal');
  const iframe = document.getElementById('preview-iframe');
  const loading = document.getElementById('preview-loading');
  const closeBtn = document.getElementById('preview-close-btn');
  const backdrop = document.getElementById('preview-modal-backdrop');

  if (!modal || !iframe) return;

  // Reset state
  loading.classList.remove('hidden');
  iframe.src = '';
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Load iframe
  iframe.onload = function() {
    loading.classList.add('hidden');
  };
  iframe.src = '../event-detail.html?preview=true';

  // Close handlers
  function closePreview() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    iframe.src = '';
  }

  closeBtn.onclick = closePreview;
  backdrop.onclick = closePreview;

  // ESC key
  function onKeyDown(e) {
    if (e.key === 'Escape') {
      closePreview();
      document.removeEventListener('keydown', onKeyDown);
    }
  }
  document.addEventListener('keydown', onKeyDown);
}

function shareEvent() {
  const user = checkAuth();
  if (!user) return;

  // First check memory eventsData (published events)
  let existingEvent = editorMode === 'edit'
    ? eventsData.find(e => e.id === currentEventId) || null
    : null;

  // For drafts: they're only in localStorage eventsData, not memory eventsData
  if (!existingEvent && editorMode === 'edit' && currentEventId) {
    const allStored = JSON.parse(localStorage.getItem('eventsData') || '[]');
    existingEvent = allStored.find(e => e.id === currentEventId) || null;
  }

  const formData = collectFormData(existingEvent);

  let shareId = existingEvent ? existingEvent.id : ('draft_' + (currentEventId || Date.now()));

  const shareData = {
    id: shareId,
    ...formData,
    createdBy: user.email,
    views: existingEvent ? existingEvent.views : 0,
    status: existingEvent ? existingEvent.status : 'draft'
  };

  // Persist share data in localStorage so the detail page can load it
  const sharedEvents = JSON.parse(localStorage.getItem('paxSharedEvents') || '{}');
  sharedEvents[shareId] = shareData;
  localStorage.setItem('paxSharedEvents', JSON.stringify(sharedEvents));

  // Build the shareable URL (points to user portal event-detail page)
  const base = window.location.href.replace(/cms\/.*$/, '');
  const shareUrl = base + 'event-detail.html?share=' + encodeURIComponent(shareId);
  const eventTitle = formData.title || 'PAX Etkinlik';
  const eventText = `${eventTitle} etkinliği - ${formData.date ? formData.date : ''} tarihinde ${formData.venue || ''}, ${formData.city || ''} adresinde!`;

  showEditorShareMenu(shareUrl, eventTitle, eventText);
}

function showEditorShareMenu(shareUrl, eventTitle, eventText) {
  // Remove existing menu if any
  const existing = document.querySelector('.editor-quick-share-menu');
  if (existing) { existing.remove(); return; }

  const menu = document.createElement('div');
  menu.className = 'editor-quick-share-menu quick-share-menu';
  menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-modal', 'true');
  menu.innerHTML = `
    <div class="quick-menu-overlay" onclick="this.parentElement.remove()"></div>
    <div class="quick-menu-content">
      <div class="quick-menu-header">
        <h3>Etkinliği Paylaş</h3>
        <button class="quick-menu-close" onclick="this.closest('.editor-quick-share-menu').remove()" aria-label="Kapat">×</button>
      </div>
      <div class="quick-menu-buttons">
        <button class="quick-menu-btn" id="editor-copy-link-btn" aria-label="Bağlantıyı kopyala">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
          Bağlantıyı Kopyala
        </button>
        <button class="quick-menu-btn" id="editor-whatsapp-btn" aria-label="WhatsApp'ta paylaş">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </button>
        <button class="quick-menu-btn" id="editor-twitter-btn" aria-label="Twitter'da paylaş">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Twitter / X
        </button>
        <button class="quick-menu-btn" id="editor-telegram-btn" aria-label="Telegram'da paylaş">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          Telegram
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(menu);

  // Wire up buttons
  menu.querySelector('#editor-copy-link-btn').addEventListener('click', function() {
    editorCopyToClipboard(shareUrl, function() { showShareToast('Bağlantı kopyalandı!'); });
    menu.remove();
  });
  menu.querySelector('#editor-whatsapp-btn').addEventListener('click', function() {
    window.open('https://wa.me/?text=' + encodeURIComponent(eventText + ' ' + shareUrl), '_blank');
    menu.remove();
  });
  menu.querySelector('#editor-twitter-btn').addEventListener('click', function() {
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(eventText) + '&url=' + encodeURIComponent(shareUrl), '_blank');
    menu.remove();
  });
  menu.querySelector('#editor-telegram-btn').addEventListener('click', function() {
    window.open('https://t.me/share/url?url=' + encodeURIComponent(shareUrl) + '&text=' + encodeURIComponent(eventText), '_blank');
    menu.remove();
  });

  // ESC to close
  function onKeyDown(e) {
    if (e.key === 'Escape') { menu.remove(); document.removeEventListener('keydown', onKeyDown); }
  }
  document.addEventListener('keydown', onKeyDown);
}

function editorCopyToClipboard(text, onSuccess) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(onSuccess).catch(function() {
      window.prompt('Paylaşım bağlantısı:', text);
    });
  } else {
    window.prompt('Paylaşım bağlantısı:', text);
    onSuccess && onSuccess();
  }
}

function showShareToast(message) {
  const existing = document.getElementById('editor-share-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'editor-share-toast';
  toast.className = 'editor-share-toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(function() {
    toast.classList.add('visible');
  });

  setTimeout(function() {
    toast.classList.remove('visible');
    setTimeout(function() { toast.remove(); }, 300);
  }, 2500);
}

// Save Event
function saveEvent(action) {
  // Validate form
  if (!validateForm()) {
    return;
  }
  
  // Get current user
  const user = checkAuth();
  if (!user) return;
  
  if (editorMode === 'create') {
    // Collect form data for new event
    const formData = collectFormData();
    
    // Save organizer profile to localStorage for future use
    saveOrganizerProfile(
      formData.organizer.name,
      formData.organizer.bio,
      formData.organizer.events
    );
    
    console.log('Creating new event with locationLink:', formData.locationLink);
    
    // Create new event
    const newEvent = {
      id: Date.now(), // Generate simple ID
      ...formData,
      createdBy: user.email,
      views: 0,
      status: action // 'draft' or 'publish'
    };
    
    console.log('New event object:', newEvent);
    
    // Add to eventsData
    eventsData.push(newEvent);
    
    // Save to localStorage
    localStorage.setItem('eventsData', JSON.stringify(eventsData));
    
    console.log('Event saved to localStorage');
    
    // Show success message
    showToast(action === 'publish' ? 'Etkinlik yayınlandı!' : 'Etkinlik kaydedildi! Yayınlamak için panelden "Yayınla" butonuna basın.', 'success');
    
    // Redirect to dashboard
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
    
  } else if (editorMode === 'edit') {
    // Find existing event
    const eventIndex = eventsData.findIndex(e => e.id === currentEventId);
    
    if (eventIndex === -1) {
      showToast('Event not found!', 'error');
      return;
    }
    
    const existingEvent = eventsData[eventIndex];
    
    // Check permissions
    if (!canEditEvent(existingEvent.createdBy)) {
      showToast('You do not have permission to edit this event.', 'error');
      return;
    }
    
    // Collect form data with existing event as fallback
    const formData = collectFormData(existingEvent);
    
    // Save organizer profile to localStorage for future use
    saveOrganizerProfile(
      formData.organizer.name,
      formData.organizer.bio,
      formData.organizer.events
    );
    
    console.log('Editing event with locationLink:', formData.locationLink);
    
    // Update event - preserve all existing fields
    eventsData[eventIndex] = {
      ...existingEvent,  // Keep all existing data
      ...formData,       // Override with form data
      // 'publish' action always publishes; 'draft' action preserves existing status
      // (so Kaydet does NOT demote an already-published event)
      status: action === 'publish' ? 'publish' : (existingEvent.status || 'draft'),
      createdBy: existingEvent.createdBy, // Never change creator
      views: existingEvent.views,         // Never reset views
      id: existingEvent.id                // Never change ID
    };
    
    console.log('Updated event object:', eventsData[eventIndex]);
    
    // Save to localStorage
    localStorage.setItem('eventsData', JSON.stringify(eventsData));
    
    console.log('Updated event saved to localStorage');
    
    // Show success message
    showToast(action === 'publish' ? 'Etkinlik yayınlandı!' : 'Etkinlik güncellendi!', 'success');
    
    // Redirect to dashboard
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
  }
}

// Make functions globally accessible
window.removeHighlight = removeHighlight;
window.removeArtist = removeArtist;
window.removeGalleryImage = removeGalleryImage;
// ===========================
// LOCALSTORAGE SYNC
// ===========================

// Load events from localStorage and merge with default events
function loadEventsFromStorage() {
  const storedEvents = localStorage.getItem('eventsData');
  if (storedEvents) {
    try {
      const parsedEvents = JSON.parse(storedEvents);
      // Merge: Keep new events from localStorage, update existing ones
      parsedEvents.forEach(storedEvent => {
        const existingIndex = eventsData.findIndex(e => e.id === storedEvent.id);
        if (existingIndex !== -1) {
          // Update existing event
          eventsData[existingIndex] = storedEvent;
        } else {
          // Add new event
          eventsData.push(storedEvent);
        }
      });
    } catch (e) {
      console.error('Error loading events from localStorage:', e);
    }
  }
}