// ===========================
// PERFORMANCE UTILITIES
// ===========================

// Throttle function for scroll handlers
function throttle(func, delay = 16) {
  let lastCall = 0;
  let timeoutId = null;
  
  return function(...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;
    
    if (timeSinceLastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        func.apply(this, args);
      }, delay - timeSinceLastCall);
    }
  };
}

// ===========================
// AUTHENTICATION SYSTEM
// ===========================

// Demo credentials (replace with real backend API)
const DEMO_USERS = {
  'admin@pax.com': {
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    id: 'admin-001'
  },
  'organizer@pax.com': {
    password: 'org123',
    role: 'organizer',
    name: 'Event Organizer',
    id: 'org-001'
  },
  'organizer2@pax.com': {
    password: 'org456',
    role: 'organizer',
    name: 'Event Organizer 2',
    id: 'org-002'
  }
};

// Check if user is authenticated
function checkAuth() {
  const token = localStorage.getItem('paxAuthToken');
  const userEmail = localStorage.getItem('paxUserEmail');
  const userRole = localStorage.getItem('paxUserRole');
  
  if (!token || !userEmail || !userRole) {
    // Not authenticated, redirect to login
    if (window.location.pathname !== '/cms/' && !window.location.pathname.includes('index.html')) {
      window.location.href = '/cms/';
    }
    return null;
  }
  
  return {
    email: userEmail,
    role: userRole,
    name: localStorage.getItem('paxUserName') || userEmail,
    id: localStorage.getItem('paxUserId') || 'user-001'
  };
}

// Login function
function performLogin(email, password) {
  // In production, this would be an API call
  // For now, using demo credentials
  
  const user = DEMO_USERS[email];
  
  if (!user || user.password !== password) {
    return {
      success: false,
      message: 'Invalid email or password'
    };
  }
  
  // Store authentication data
  localStorage.setItem('paxAuthToken', `token-${Date.now()}`);
  localStorage.setItem('paxUserEmail', email);
  localStorage.setItem('paxUserRole', user.role);
  localStorage.setItem('paxUserName', user.name);
  localStorage.setItem('paxUserId', user.id);
  
  return {
    success: true,
    user: {
      email: email,
      role: user.role,
      name: user.name,
      id: user.id
    }
  };
}

// Logout function
function performLogout() {
  localStorage.removeItem('paxAuthToken');
  localStorage.removeItem('paxUserEmail');
  localStorage.removeItem('paxUserRole');
  localStorage.removeItem('paxUserName');
  localStorage.removeItem('paxUserId');
  window.location.href = '/cms/';
}

// Get current user
function getCurrentUser() {
  return checkAuth();
}

// Check if user has admin role
function isAdmin() {
  const user = getCurrentUser();
  return user && user.role === 'admin';
}

// Check if user can edit event (organizer can edit own, admin can edit all)
function canEditEvent(eventCreatorId) {
  const user = getCurrentUser();
  if (!user) return false;
  if (user.role === 'admin') return true;
  
  // Check both user.id and user.email against eventCreatorId
  // because events can be created with email or user ID
  return user.id === eventCreatorId || user.email === eventCreatorId;
}

// ===========================
// LOGIN PAGE
// ===========================

if (window.location.pathname.includes('index.html') || window.location.pathname === '/cms/') {
  document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    const user = checkAuth();
    if (user) {
      // Already authenticated, redirect to dashboard
      window.location.href = 'dashboard.html';
      return;
    }
    
    // Handle login form submission
    const loginForm = document.getElementById('cms-login-form');
    const loginError = document.getElementById('login-error');
    
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide previous errors
        loginError.style.display = 'none';
        
        // Get form values
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Validate
        if (!email || !password) {
          showError('Please fill in all fields');
          return;
        }
        
        // Perform login
        const result = performLogin(email, password);
        
        if (result.success) {
          // Success - redirect to dashboard
          window.location.href = 'dashboard.html';
        } else {
          // Show error
          showError(result.message);
        }
      });
    }
    
    function showError(message) {
      loginError.textContent = message;
      loginError.style.display = 'block';
    }
  });
}

// ===========================
// DASHBOARD PAGE
// ===========================

if (window.location.pathname.includes('dashboard.html')) {
  document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const user = checkAuth();
    if (!user) return; // Will redirect automatically
    
    // Load events from localStorage before initializing
    loadEventsFromStorage();
    
    // Initialize dashboard
    initializeDashboard(user);
  });
}

function initializeDashboard(user) {
  // Update user info in nav
  updateUserInfo(user);
  
  // Load events (filtered by organizer)
  loadDashboardEvents(user);
  
  // Setup event listeners
  setupDashboardListeners();
}

function updateUserInfo(user) {
  const userNameEl = document.getElementById('user-name');
  const userRoleEl = document.getElementById('user-role');
  const userAvatarEl = document.getElementById('user-avatar');
  
  if (userNameEl) userNameEl.textContent = user.name;
  if (userRoleEl) userRoleEl.textContent = user.role === 'admin' ? 'Administrator' : 'Event Organizer';
  if (userAvatarEl) {
    const initial = user.name.charAt(0).toUpperCase();
    userAvatarEl.textContent = initial;
  }
}

function loadDashboardStats(user) {
  // Get events from main eventsData (from script.js)
  if (typeof eventsData === 'undefined') return;
  
  let userEvents = eventsData;
  
  // If organizer, filter to only their events
  if (user.role !== 'admin') {
    userEvents = eventsData.filter(event => event.createdBy === user.email);
  }
  
  // Calculate stats
  const totalEvents = userEvents.length;
  const totalViews = userEvents.reduce((sum, event) => sum + (event.views || 0), 0);
  const upcomingEvents = userEvents.filter(event => new Date(event.date) > new Date()).length;
  
  // Update stat cards
  document.getElementById('stat-total-events').textContent = totalEvents;
  document.getElementById('stat-total-views').textContent = totalViews.toLocaleString();
  document.getElementById('stat-upcoming').textContent = upcomingEvents;
}

function loadDashboardEvents(user) {
  // Get events from main eventsData (from script.js)
  if (typeof eventsData === 'undefined') return;
  
  let userEvents = eventsData;
  
  // If organizer, filter to only their events
  if (user.role !== 'admin') {
    userEvents = eventsData.filter(event => event.createdBy === user.email || event.createdBy === user.id);
  }
  
  const eventsGrid = document.getElementById('events-grid');
  
  if (!eventsGrid) return;
  
  // Render all user events
  renderDashboardEvents(userEvents, user);
}

function renderDashboardEvents(events, user) {
  const eventsGrid = document.getElementById('events-grid');
  
  if (!eventsGrid) return;
  
  if (events.length === 0) {
    eventsGrid.innerHTML = `
      <div class="empty-state-dashboard">
        <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <h3>No Events Found</h3>
        <p>Start creating amazing nightlife experiences for your audience</p>
        <button class="create-event-btn-empty" onclick="document.getElementById('create-event-btn').click()">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Create Your First Event
        </button>
      </div>
    `;
    return;
  }
  
  // Render events using homepage card style
  eventsGrid.innerHTML = events.map(event => createDashboardEventCard(event, user)).join('');
}

function createDashboardEventCard(event, user) {
  const canEdit = canEditEvent(event.createdBy);
  const viewCount = getEventViewCount ? getEventViewCount(event.id) : 0;
  const priceDisplay = formatPriceLevel ? formatPriceLevel(event.priceLevel) : event.priceLevel;
  
  // Use exact same card structure as homepage with action buttons
  return `
    <div class="event-card cms-event-card" data-event-id="${event.id}" onclick="handleDashboardEventClick(${event.id})" style="cursor: pointer;">
      <div class="event-image">
        <img src="${event.image}" alt="${event.title}" loading="lazy">
        <div class="event-category">${event.category}</div>
        ${canEdit ? `
          <div class="event-actions">
            <button class="event-action-btn edit-btn" onclick="event.stopPropagation(); editEvent(${event.id});" title="Edit Event">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button class="event-action-btn delete-btn" onclick="event.stopPropagation(); deleteEvent(${event.id});" title="Delete Event">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        ` : ''}
      </div>
      <div class="event-info">
        <h3 class="event-title">${event.title}</h3>
        <div class="event-meta">
          <div class="event-date">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            ${formatDate ? formatDate(event.date) : event.date} • ${event.time}
          </div>
          <div class="event-location">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span class="event-venue">${event.venue}</span>, ${event.city}
          </div>
          <div class="event-views">
            <span>👁</span>
            <span>${viewCount} view${viewCount !== 1 ? 's' : ''}</span>
          </div>
          ${event.organizer && event.organizer.name ? `
          <div class="event-organizer-small">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="flex-shrink: 0;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${event.organizer.name}</span>
          </div>
          ` : ''}
        </div>
        <div class="event-price">${priceDisplay}</div>
      </div>
    </div>
  `;
}

// Helper functions for formatting (if not available from script.js)
if (typeof getEventViewCount === 'undefined') {
  window.getEventViewCount = function(eventId) {
    const views = JSON.parse(localStorage.getItem('eventViews') || '{}');
    return views[eventId] || 0;
  };
}

if (typeof formatPriceLevel === 'undefined') {
  window.formatPriceLevel = function(level) {
    return '$'.repeat(level);
  };
}

if (typeof formatDate === 'undefined') {
  window.formatDate = function(dateStr) {
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };
}

// Handle event click for dashboard
function handleDashboardEventClick(eventId) {
  // Navigate to editor page to edit the event
  window.location.href = `editor.html?mode=edit&id=${eventId}`;
}

function setupDashboardListeners() {
  // Logout buttons
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', performLogout);
  }
  
  const footerLogout = document.getElementById('footer-logout');
  if (footerLogout) {
    footerLogout.addEventListener('click', (e) => {
      e.preventDefault();
      performLogout();
    });
  }
  
  // Create event button
  const createBtn = document.getElementById('create-event-btn');
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      window.location.href = 'editor.html?mode=create';
    });
  }
  
  // Profile button
  const profileBtn = document.getElementById('profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', openProfileModal);
  }
  
  // Profile modal event listeners
  const profileModalClose = document.getElementById('profile-modal-close');
  const profileModalOverlay = document.getElementById('profile-modal-overlay');
  const profileCancelBtn = document.getElementById('profile-cancel-btn');
  const profileSaveBtn = document.getElementById('profile-save-btn');
  
  if (profileModalClose) {
    profileModalClose.addEventListener('click', closeProfileModal);
  }
  
  if (profileModalOverlay) {
    profileModalOverlay.addEventListener('click', closeProfileModal);
  }
  
  if (profileCancelBtn) {
    profileCancelBtn.addEventListener('click', closeProfileModal);
  }
  
  if (profileSaveBtn) {
    profileSaveBtn.addEventListener('click', saveProfileData);
  }
  
  // Navbar scroll behavior (same as homepage)
  let lastScrollTop = 0;
  const eventsSection = document.querySelector('.events-section');
  
  if (eventsSection) {
    const handleCmsScroll = throttle(function() {
      const navbar = document.querySelector('.navbar');
      const scrollTop = eventsSection.scrollTop;
      
      if (scrollTop > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
      
      lastScrollTop = scrollTop;
    }, 50);
    
    eventsSection.addEventListener('scroll', handleCmsScroll, { passive: true });
  }
}

// ===========================
// EVENT ACTIONS
// ===========================

function editEvent(eventId) {
  window.location.href = `editor.html?mode=edit&id=${eventId}`;
}

function deleteEvent(eventId) {
  const user = getCurrentUser();
  if (!user) return;
  
  // Find event
  const event = eventsData.find(e => e.id === eventId);
  if (!event) return;
  
  // Check permissions
  if (!canEditEvent(event.createdBy)) {
    alert('You do not have permission to delete this event.');
    return;
  }
  
  // Confirm deletion
  if (!confirm(`Are you sure you want to delete "${event.title}"? This action cannot be undone.`)) {
    return;
  }
  
  // Delete event
  const index = eventsData.findIndex(e => e.id === eventId);
  if (index !== -1) {
    eventsData.splice(index, 1);
    
    // Save to localStorage
    localStorage.setItem('eventsData', JSON.stringify(eventsData));
    
    // Reload dashboard events
    loadDashboardEvents(user);
    
    alert('Event deleted successfully!');
  }
}

// ===========================
// ORGANIZER PROFILE MANAGEMENT
// ===========================

function openProfileModal() {
  const modal = document.getElementById('profile-modal');
  if (!modal) return;
  
  // Load current profile data
  const orgName = localStorage.getItem('paxOrganizerName') || '';
  const orgBio = localStorage.getItem('paxOrganizerBio') || '';
  const orgEvents = localStorage.getItem('paxOrganizerTotalEvents') || '0';
  const orgEmail = localStorage.getItem('paxOrganizerEmail') || '';
  const orgPhone = localStorage.getItem('paxOrganizerPhone') || '';
  const orgInstagram = localStorage.getItem('paxOrganizerInstagram') || '';
  
  // Fill form
  document.getElementById('profile-org-name').value = orgName;
  document.getElementById('profile-org-bio').value = orgBio;
  document.getElementById('profile-org-events').value = orgEvents;
  document.getElementById('profile-org-email').value = orgEmail;
  document.getElementById('profile-org-phone').value = orgPhone;
  document.getElementById('profile-org-instagram').value = orgInstagram;
  
  // Show modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  // Disable scroll on events-section
  const eventsSection = document.querySelector('.events-section');
  if (eventsSection) {
    eventsSection.style.overflow = 'hidden';
  }
}

function closeProfileModal() {
  const modal = document.getElementById('profile-modal');
  if (!modal) return;
  
  modal.style.display = 'none';
  document.body.style.overflow = '';
  
  // Re-enable scroll on events-section
  const eventsSection = document.querySelector('.events-section');
  if (eventsSection) {
    eventsSection.style.overflow = '';
  }
}

function saveProfileData() {
  const orgName = document.getElementById('profile-org-name').value.trim();
  const orgBio = document.getElementById('profile-org-bio').value.trim();
  const orgEvents = document.getElementById('profile-org-events').value;
  const orgEmail = document.getElementById('profile-org-email').value.trim();
  const orgPhone = document.getElementById('profile-org-phone').value.trim();
  const orgInstagram = document.getElementById('profile-org-instagram').value.trim();
  
  if (!orgName) {
    alert('Please enter an organizer name');
    document.getElementById('profile-org-name').focus();
    return;
  }
  
  // Validate: At least one contact method required
  const loginEmail = localStorage.getItem('paxUserEmail');
  if (!orgEmail && !orgPhone && !orgInstagram) {
    alert('En az bir iletişim yöntemi girmelisiniz (Email, Telefon veya Instagram)');
    return;
  }
  
  // Save to localStorage
  localStorage.setItem('paxOrganizerName', orgName);
  localStorage.setItem('paxOrganizerBio', orgBio);
  localStorage.setItem('paxOrganizerTotalEvents', orgEvents);
  localStorage.setItem('paxOrganizerEmail', orgEmail);
  localStorage.setItem('paxOrganizerPhone', orgPhone);
  localStorage.setItem('paxOrganizerInstagram', orgInstagram);
  
  // Ask if user wants to update past events
  const userEmail = localStorage.getItem('paxUserEmail');
  const eventsData = JSON.parse(localStorage.getItem('paxEventsData') || '[]');
  
  // Count how many past events belong to this user
  const userEvents = eventsData.filter(event => event.createdBy === userEmail);
  
  if (userEvents.length > 0) {
    const updatePast = confirm(`Profile saved! You have ${userEvents.length} existing event(s). Do you want to update the organizer information in all your past events with this new profile?`);
    
    if (updatePast) {
      // Update all user's events with new profile data
      let updatedCount = 0;
      eventsData.forEach(event => {
        if (event.createdBy === userEmail && event.organizer) {
          event.organizer.name = orgName;
          event.organizer.bio = orgBio;
          event.organizer.events = parseInt(orgEvents) || 0;
          event.organizer.email = orgEmail || loginEmail;
          event.organizer.phone = orgPhone;
          event.organizer.instagram = orgInstagram;
          updatedCount++;
        }
      });
      
      // Save updated events back to localStorage
      localStorage.setItem('paxEventsData', JSON.stringify(eventsData));
      
      alert(`Success! Profile updated and applied to ${updatedCount} existing event(s).`);
    } else {
      alert('Profile saved! This information will be used for all your new events.');
    }
  } else {
    alert('Profile saved successfully! This information will be used for all your new events.');
  }
  
  closeProfileModal();
  
  // Reload the dashboard to show updated information
  const userRole = localStorage.getItem('paxUserRole');
  const userName = localStorage.getItem('paxUserName');
  if (userEmail && userRole) {
    const user = { email: userEmail, role: userRole, name: userName || 'User' };
    // Reload events from localStorage first
    const storedEvents = localStorage.getItem('paxEventsData');
    if (storedEvents && typeof eventsData !== 'undefined') {
      window.eventsData = JSON.parse(storedEvents);
    }
    loadDashboardEvents(user);
    loadDashboardStats(user);
  }
}

// Make functions global for onclick handlers
window.editEvent = editEvent;
window.deleteEvent = deleteEvent;
window.handleDashboardEventClick = handleDashboardEventClick;
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