// ===========================
// WYSIWYG EDITOR
// Updated: 2026-03-27 (Gallery file upload feature added)
// ===========================

let editorMode = 'create'; // 'create' or 'edit'
let currentEventId = null;
let highlights = [];
let artists = [];
let galleryImages = [];
let instagramUrl = '';

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
  
  // Update button text based on mode
  const publishBtn = document.getElementById('publish-btn');
  if (publishBtn) {
    const buttonText = editorMode === 'create' ? 'Yayınla' : 'Kaydet';
    // Update only the text node, keep the SVG
    publishBtn.innerHTML = `
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="display: inline-block; vertical-align: middle; margin-right: 4px;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    ${buttonText}`;
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
  const organizerBio = localStorage.getItem('paxOrganizerBio') || '';
  const organizerTotalEvents = localStorage.getItem('paxOrganizerTotalEvents') || '0';
  
  // Fill organizer fields with saved profile data
  const organizerNameInput = document.getElementById('organizer-name');
  if (organizerNameInput) {
    organizerNameInput.value = organizerName;
  }
  
  const organizerBioInput = document.getElementById('organizer-bio');
  if (organizerBioInput) {
    organizerBioInput.value = organizerBio;
  }
  
  const organizerEventsInput = document.getElementById('organizer-events');
  if (organizerEventsInput) {
    organizerEventsInput.value = organizerTotalEvents;
  }
}

// Save organizer profile to localStorage
function saveOrganizerProfile(name, bio, totalEvents) {
  if (name) localStorage.setItem('paxOrganizerName', name);
  if (bio) localStorage.setItem('paxOrganizerBio', bio);
  if (totalEvents) localStorage.setItem('paxOrganizerTotalEvents', totalEvents);
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
  const event = eventsData.find(e => e.id == eventId);
  
  if (!event) {
    console.error('Event not found! Looking for ID:', eventId);
    alert('Event not found!');
    window.location.href = 'dashboard.html';
    return;
  }
  
  console.log('Event found:', event);
  console.log('Event createdBy:', event.createdBy, 'User email:', user.email, 'User ID:', user.id);
  
  // Check permissions
  const hasPermission = canEditEvent(event.createdBy);
  console.log('Has permission to edit:', hasPermission);
  
  if (!hasPermission) {
    alert('You do not have permission to edit this event.');
    window.location.href = 'dashboard.html';
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
  
  const organizerBioInput = document.getElementById('organizer-bio');
  if (organizerBioInput) {
    organizerBioInput.value = event.organizer?.bio || '';
  }
  
  const organizerEventsInput = document.getElementById('organizer-events');
  if (organizerEventsInput) {
    organizerEventsInput.value = event.organizer?.events || '0';
  }
  
  // Artists - Load into global array first
  artists = Array.isArray(event.artists) ? [...event.artists] : [];
  console.log('Artists loaded:', artists); // Debug log
  renderArtists();
  
  // Gallery - Load into global array
  galleryImages = Array.isArray(event.gallery) ? [...event.gallery] : [];
  renderGallery();
  
  // Promo Image
  const instagramUrlInput = document.getElementById('instagram-url');
  if (instagramUrlInput && event.instagramUrl) {
    instagramUrlInput.value = event.instagramUrl;
  }
  
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
          alert('Please select an image file');
          galleryFileUpload.value = '';
          return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Image size must be less than 5MB');
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
            alert('Failed to read image file');
          }
          // Reset file input
          galleryFileUpload.value = '';
        };
        reader.onerror = function() {
          alert('Error reading file. Please try again.');
          galleryFileUpload.value = '';
        };
        reader.readAsDataURL(file);
      }
    });
  }
  
  // Promo image upload
  const promoImageUpload = document.getElementById('promo-image-upload');
  if (promoImageUpload) {
    promoImageUpload.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('Please select an image file');
          promoImageUpload.value = '';
          return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Image size must be less than 5MB');
          promoImageUpload.value = '';
          return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
          const imageDataUrl = event.target.result;
          if (imageDataUrl && imageDataUrl.startsWith('data:image')) {
            instagramUrl = imageDataUrl;
            document.getElementById('instagram-url').value = ''; // Clear URL input
            console.log('Promo image loaded successfully');
            alert('Promo image uploaded successfully!');
          } else {
            alert('Failed to read image file');
          }
          promoImageUpload.value = '';
        };
        reader.onerror = function() {
          alert('Error reading image file. Please try again.');
          promoImageUpload.value = '';
        };
        reader.readAsDataURL(file);
      }
    });
  }
  
  // Save button
  const publishBtn = document.getElementById('publish-btn');
  
  if (publishBtn) {
    publishBtn.addEventListener('click', () => saveEvent('publish'));
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
    alert('Please enter both artist name and genre');
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
      alert('Please enter a valid URL (e.g., https://example.com/image.jpg)');
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
        alert('Please enter an event title');
        document.getElementById('event-title').focus();
        return false;
      }
      
      if (!date && !existingEvent.date) {
        alert('Please select an event date');
        document.getElementById('event-date').focus();
        return false;
      }
      
      if (!time && !existingEvent.time) {
        alert('Please select an event time');
        document.getElementById('event-time').focus();
        return false;
      }
      
      if (!venue && !existingEvent.venue) {
        alert('Please enter a venue name');
        document.getElementById('event-venue').focus();
        return false;
      }
      
      if (!city && !existingEvent.city) {
        alert('Please enter a city');
        document.getElementById('event-city').focus();
        return false;
      }
      
      if (!description && !existingEvent.description) {
        alert('Please write an event description');
        document.getElementById('event-description').focus();
        return false;
      }
      
      if (!venueAddress && !existingEvent.venueAddress) {
        alert('Please enter the full venue address');
        document.getElementById('venue-address').focus();
        return false;
      }
      
      if (!ageRequirement && !existingEvent.ageRequirement) {
        alert('Please select an age requirement');
        document.getElementById('event-age').focus();
        return false;
      }
      
      // Validate location link in edit mode
      const locationLink = document.getElementById('location-link').value.trim();
      if (!locationLink && !existingEvent.locationLink) {
        alert('Please enter a Google Maps link for the venue location');
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
    alert('Please enter an event title');
    document.getElementById('event-title').focus();
    return false;
  }
  
  if (!date) {
    alert('Please select an event date');
    document.getElementById('event-date').focus();
    return false;
  }
  
  if (!time) {
    alert('Please select an event time');
    document.getElementById('event-time').focus();
    return false;
  }
  
  if (!venue) {
    alert('Please enter a venue name');
    document.getElementById('event-venue').focus();
    return false;
  }
  
  if (!city) {
    alert('Please enter a city');
    document.getElementById('event-city').focus();
    return false;
  }
  
  if (!description) {
    alert('Please write an event description');
    document.getElementById('event-description').focus();
    return false;
  }
  
  if (!venueAddress) {
    alert('Please enter the full venue address');
    document.getElementById('venue-address').focus();
    return false;
  }
  
  if (!ageRequirement) {
    alert('Please select an age requirement');
    document.getElementById('event-age').focus();
    return false;
  }
  
  // Validate location link
  const locationLink = document.getElementById('location-link').value.trim();
  if (!locationLink) {
    alert('Please enter a Google Maps link for the venue location');
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
  const organizerBioInput = document.getElementById('organizer-bio');
  const organizerEventsInput = document.getElementById('organizer-events');
  
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
  const organizerBioValue = organizerBioInput?.value.trim();
  const organizerEventsValue = organizerEventsInput?.value;
  
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
    
    // Promo Image - support both file uploads and URLs
    instagramUrl: instagramUrl || document.getElementById('instagram-url')?.value.trim() || existingEvent?.instagramUrl || '',
    
    // Organizer info - preserve existing if not filled
    organizer: {
      name: organizerNameValue || existingEvent?.organizer?.name || '',
      bio: organizerBioValue || existingEvent?.organizer?.bio || '',
      events: organizerEventsValue || existingEvent?.organizer?.events || '0',
      email: localStorage.getItem('paxUserEmail') || existingEvent?.organizer?.email || ''
    },
  };
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
    alert(action === 'publish' ? 'Event published successfully!' : 'Event saved as draft!');
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
    
  } else if (editorMode === 'edit') {
    // Find existing event
    const eventIndex = eventsData.findIndex(e => e.id === currentEventId);
    
    if (eventIndex === -1) {
      alert('Event not found!');
      return;
    }
    
    const existingEvent = eventsData[eventIndex];
    
    // Check permissions
    if (!canEditEvent(existingEvent.createdBy)) {
      alert('You do not have permission to edit this event.');
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
      status: action,    // Update status
      createdBy: existingEvent.createdBy, // Never change creator
      views: existingEvent.views,         // Never reset views
      id: existingEvent.id                // Never change ID
    };
    
    console.log('Updated event object:', eventsData[eventIndex]);
    
    // Save to localStorage
    localStorage.setItem('eventsData', JSON.stringify(eventsData));
    
    console.log('Updated event saved to localStorage');
    
    // Show success message
    alert('Event updated successfully!');
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
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