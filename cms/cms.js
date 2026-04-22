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
      message: 'Geçersiz e-posta veya parola'
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
  if (userRoleEl) userRoleEl.textContent = user.role === 'admin' ? 'Yönetici' : 'Etkinlik Organizatörü';
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
  
  // Update stat cards (elements may not exist on all pages)
  const elTotal = document.getElementById('stat-total-events');
  const elViews = document.getElementById('stat-total-views');
  const elUpcoming = document.getElementById('stat-upcoming');
  if (elTotal) elTotal.textContent = totalEvents;
  if (elViews) elViews.textContent = totalViews.toLocaleString();
  if (elUpcoming) elUpcoming.textContent = upcomingEvents;
}

function loadDashboardEvents(user) {
  // Read ALL events from localStorage (including drafts) so organizers can see and manage their drafts
  const allEvents = JSON.parse(localStorage.getItem('eventsData') || '[]');

  let userEvents = allEvents;

  // If organizer, filter to only their events
  if (user.role !== 'admin') {
    userEvents = allEvents.filter(event => event.createdBy === user.email || event.createdBy === user.id);
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
        <h3>Etkinlik Bulunamadı</h3>
        <p>Seyircileriniz için harika gece hayatı deneyimleri oluşturmaya başlayın</p>
        <button class="create-event-btn-empty" onclick="document.getElementById('create-event-btn').click()">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          İlk Etkinliğinizi Oluşturun
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
  const isPublished = event.status === 'publish';
  
  // Use exact same card structure as homepage with action buttons
  return `
    <div class="event-card cms-event-card" data-event-id="${event.id}" onclick="handleDashboardEventClick(${event.id})" style="cursor: pointer;">
      ${canEdit ? `
        <button class="card-publish-btn ${isPublished ? 'published' : ''}" onclick="event.stopPropagation(); togglePublishEvent(${event.id});" title="${isPublished ? 'Yayından Kaldır' : 'Yayınla'}" aria-label="${isPublished ? 'Yayından Kaldır' : 'Yayınla'}">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${isPublished ? 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' : 'M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'}"></path>
          </svg>
        </button>
      ` : ''}
      <div class="event-image">
        <img src="${event.image}" alt="${event.title}" loading="lazy">
        <div class="event-category">${event.category}</div>
        ${canEdit ? `
          <div class="event-actions">
            <button class="event-action-btn edit-btn" onclick="event.stopPropagation(); editEvent(${event.id});" title="Etkinliği Düzenle">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button class="event-action-btn delete-btn" onclick="event.stopPropagation(); deleteEvent(${event.id});" title="Etkinliği Sil">
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

function togglePublishEvent(eventId) {
  const user = getCurrentUser();
  if (!user) return;

  const allEvents = JSON.parse(localStorage.getItem('eventsData') || '[]');
  const idx = allEvents.findIndex(e => e.id === eventId);
  if (idx === -1) return;

  const ev = allEvents[idx];
  if (!canEditEvent(ev.createdBy)) return;

  const willPublish = ev.status !== 'publish';
  allEvents[idx] = { ...ev, status: willPublish ? 'publish' : 'draft' };
  localStorage.setItem('eventsData', JSON.stringify(allEvents));

  // Update in-memory eventsData too
  const memIdx = eventsData.findIndex(e => e.id === eventId);
  if (memIdx !== -1) {
    eventsData[memIdx].status = willPublish ? 'publish' : 'draft';
  }

  // Re-render dashboard
  loadDashboardEvents(user);
}

function deleteEvent(eventId) {
  const user = getCurrentUser();
  if (!user) return;
  
  // Read ALL events from localStorage (including drafts)
  const allEvents = JSON.parse(localStorage.getItem('eventsData') || '[]');
  const event = allEvents.find(e => e.id === eventId);
  if (!event) return;
  
  // Check permissions
  if (!canEditEvent(event.createdBy)) {
    showToast('Bu etkinliği silme izniniz yok.', 'error');
    return;
  }
  
  // Confirm deletion
  if (!confirm(`"${event.title}" etkinliğini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`)) {
    return;
  }
  
  // Remove from full localStorage array
  const index = allEvents.findIndex(e => e.id === eventId);
  if (index !== -1) {
    allEvents.splice(index, 1);
    localStorage.setItem('eventsData', JSON.stringify(allEvents));

    // Track deleted ID so hardcoded default events are also hidden on the user page
    const deletedIds = JSON.parse(localStorage.getItem('paxDeletedEventIds') || '[]');
    if (!deletedIds.includes(eventId)) {
      deletedIds.push(eventId);
      localStorage.setItem('paxDeletedEventIds', JSON.stringify(deletedIds));
    }

    // Also remove from in-memory eventsData if present (published events)
    const memIdx = eventsData.findIndex(e => e.id === eventId);
    if (memIdx !== -1) eventsData.splice(memIdx, 1);

    // Reload dashboard events
    loadDashboardEvents(user);

    showToast('Etkinlik başarıyla silindi!', 'success');
  }
}

// ===========================
// ORGANIZER PROFILE MANAGEMENT
// ===========================

// Prevent scroll helpers for profile modal (mirror of filter drawer)
function _profilePreventScroll(e) {
  const modalBody = document.querySelector('.profile-modal-body');
  if (!modalBody || !modalBody.contains(e.target)) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}

function _profilePreventBodyScroll(e) {
  const modalContent = document.querySelector('.profile-modal-content');
  if (!modalContent || !modalContent.contains(e.target)) {
    e.preventDefault();
    return false;
  }
}

function openProfileModal() {
  const modal = document.getElementById('profile-modal');
  if (!modal) return;
  
  // Load current profile data
  const orgName = localStorage.getItem('paxOrganizerName') || '';
  const orgEmail = localStorage.getItem('paxOrganizerEmail') || '';
  const orgPhone = localStorage.getItem('paxOrganizerPhone') || '';
  const orgInstagram = localStorage.getItem('paxOrganizerInstagram') || '';

  // Calculate active (future) event count for this organizer
  const userEmail = localStorage.getItem('paxUserEmail');
  const allEvents = JSON.parse(localStorage.getItem('eventsData') || '[]');
  const now = new Date();
  const activeCount = allEvents.filter(e => e.createdBy === userEmail && new Date(e.date) > now).length;

  // Fill form
  document.getElementById('profile-org-name').value = orgName;
  document.getElementById('profile-org-events').value = activeCount;
  document.getElementById('profile-org-email').value = orgEmail;
  document.getElementById('profile-org-phone').value = orgPhone;
  document.getElementById('profile-org-instagram').value = orgInstagram;
  
  // Lock the actual scroll container (.events-section) directly
  const eventsSection = document.querySelector('.events-section');
  if (eventsSection) {
    eventsSection.style.overflow = 'hidden';
  }

  // Also lock body/html for safety
  document.body.classList.add('profile-modal-open');
  document.documentElement.classList.add('profile-modal-open');

  // Prevent all touch scroll on background (mobile Safari)
  document.addEventListener('touchmove', _profilePreventBodyScroll, { passive: false, capture: true });

  // Show modal
  modal.style.display = 'flex';

  // Reset modal body scroll to top
  const modalBody = modal.querySelector('.profile-modal-body');
  if (modalBody) modalBody.scrollTop = 0;
}

function closeProfileModal() {
  const modal = document.getElementById('profile-modal');
  if (!modal) return;
  
  modal.style.display = 'none';

  // Restore .events-section scroll
  const eventsSection = document.querySelector('.events-section');
  if (eventsSection) {
    eventsSection.style.overflow = '';
  }

  // Remove body/html lock
  document.body.classList.remove('profile-modal-open');
  document.documentElement.classList.remove('profile-modal-open');
  document.removeEventListener('touchmove', _profilePreventBodyScroll, { capture: true });
}

function saveProfileData() {
  const orgName = document.getElementById('profile-org-name').value.trim();
  const orgEmail = document.getElementById('profile-org-email').value.trim();
  const orgPhone = document.getElementById('profile-org-phone').value.trim();
  const orgInstagram = document.getElementById('profile-org-instagram').value.trim();
  
  if (!orgName) {
    showToast('Lütfen organizatör adı giriniz', 'error');
    document.getElementById('profile-org-name').focus();
    return;
  }
  
  // Validate: At least one contact method required
  const loginEmail = localStorage.getItem('paxUserEmail');
  if (!orgEmail && !orgPhone && !orgInstagram) {
    showToast('En az bir iletişim yöntemi girmelisiniz (Email, Telefon veya Instagram)', 'error');
    return;
  }
  
  // Save to localStorage
  localStorage.setItem('paxOrganizerName', orgName);
  localStorage.setItem('paxOrganizerEmail', orgEmail);
  localStorage.setItem('paxOrganizerPhone', orgPhone);
  localStorage.setItem('paxOrganizerInstagram', orgInstagram);

  // Calculate active event count to sync into events
  const userEmail = localStorage.getItem('paxUserEmail');
  const eventsData = JSON.parse(localStorage.getItem('eventsData') || '[]');
  const now = new Date();
  const activeCount = eventsData.filter(e => e.createdBy === userEmail && new Date(e.date) > now).length;
  
  let updatedCount = 0;
  eventsData.forEach(event => {
    if (event.createdBy === userEmail) {
      if (!event.organizer) event.organizer = {};
      event.organizer.name = orgName;
      event.organizer.events = activeCount;
      event.organizer.email = orgEmail || loginEmail;
      event.organizer.phone = orgPhone;
      event.organizer.instagram = orgInstagram;
      updatedCount++;
    }
  });
  
  // Save updated events back to localStorage
  localStorage.setItem('eventsData', JSON.stringify(eventsData));
  
  if (updatedCount > 0) {
    showToast(`Profil kaydedildi! ${updatedCount} etkinliğinizdeki bilgiler güncellendi.`, 'success');
  } else {
    showToast('Profil başarıyla kaydedildi!', 'success');
  }
  
  closeProfileModal();
  
  // Reload the dashboard to show updated information
  const userRole = localStorage.getItem('paxUserRole');
  const userName = localStorage.getItem('paxUserName');
  if (userEmail && userRole) {
    const user = { email: userEmail, role: userRole, name: userName || 'User' };
    // Reload events from localStorage first
    const storedEvents = localStorage.getItem('eventsData');
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