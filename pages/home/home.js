// Main Page Module - Generates main page UI dynamically

function renderMainPage() {
    // Set page title
    document.title = 'PPAP Apartment - Management System';

    // Get user info
    const user = JSON.parse(localStorage.getItem('user')) || {username: 'Guest', role: 'user'};
    const avatarLetter = user.username.charAt(0).toUpperCase();

    // ensure shell layout (sidebar + topbar) is inserted
    const shellHTML = `
    <div class="app-layout">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-section-label">Main</div>
            <div class="nav-item active" data-page="dashboard">📊 Dashboard</div>

            <div class="sidebar-section-label">Management</div>
            <div class="nav-item" data-page="billing">💳 Billing Manager</div>
            <div class="nav-item" data-page="room">🚪 Renter Room Management</div>
            <div class="nav-item" data-page="register">📝 Renter Register</div>
            <div class="nav-item" data-page="wifi">📶 Wifi Management</div>
            <div class="nav-item" data-page="advertisement">📢 Advertisement Management</div>

            <div class="sidebar-bottom">
                <div style="padding:12px 10px 0;font-size:0.72rem;color:var(--text-muted);text-align:center">
                    PPApartment · 2026
                </div>
            </div>
        </aside>

        <!-- Topbar -->
        <header class="topbar">
            <div class="topbar-left">
                <div class="topbar-logo">🏢 PPApartment</div>
            </div>
            <div id="userPanel" style="position:relative;display:flex;align-items:center;gap:12px">
                <span id="username-display">${user.username}</span>
                <div class="topbar-avatar" id="avatar-display">${avatarLetter}</div>
                <div class="user-dropdown" id="userDropdown">
                    <div class="dropdown-header">
                        <div class="dropdown-avatar">${avatarLetter}</div>
                        <div class="dropdown-info">
                            <div class="dropdown-name">${user.username}</div>
                            <div class="dropdown-role">${user.role}</div>
                        </div>
                    </div>
                    <div class="dropdown-menu">
                        <button class="dropdown-item" id="settings-btn">⚙️ Settings</button>
                        <button class="dropdown-item" id="logout-btn">🚪 Logout</button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="main-content" id="mainContent">
            <!-- content populated below -->
        </main>
    </div>
    `;

    const app = document.getElementById('app');
    if (app) {
        app.innerHTML = shellHTML;
    } else {
        document.body.innerHTML = shellHTML;
    }

    // populate main content area
    const content = document.getElementById('mainContent');
    if (content) {
        content.innerHTML = `
            <div class="content-header">
                <h1>Dashboard Overview</h1>
                <p>Welcome back! Here's what's happening with your property.</p>
            </div>

            <!-- Statistics Cards -->
            <div class="stats-grid">
                ${getStatsCardsHTML()}
            </div>

            <!-- Quick Actions -->
            <div class="quick-actions">
                <h2>Quick Actions</h2>
                <div class="action-buttons">
                    <button class="action-btn primary" onclick="window.location.hash='register'">
                        <span class="btn-icon">➕</span>
                        Add New Renter
                    </button>
                    <button class="action-btn secondary" onclick="window.location.hash='billing'">
                        <span class="btn-icon">💰</span>
                        Send Bills
                    </button>
                    <button class="action-btn secondary" onclick="window.location.hash='room'">
                        <span class="btn-icon">🔄</span>
                        Manage Rooms
                    </button>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="recent-activity">
                <h2>Recent Activity</h2>
                <div class="activity-list">
                    <div class="activity-item">
                        <div class="activity-icon">👤</div>
                        <div class="activity-content">
                            <p>New renter <strong>Jane Doe</strong> registered</p>
                            <span class="activity-time">2 hours ago</span>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon">💳</div>
                        <div class="activity-content">
                            <p>Bill sent to <strong>John Smith</strong></p>
                            <span class="activity-time">4 hours ago</span>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon">🚪</div>
                        <div class="activity-content">
                            <p>Room 201 maintenance completed</p>
                            <span class="activity-time">1 day ago</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Add CSS styles and events
    addMainPageStyles();
    setupMainPageEvents();

    // authentication guard
    if (typeof isLoggedIn === 'function' && !isLoggedIn()) {
        window.location.hash = 'login';
        return;
    }
}

function getDashboardStats() {
    const renters = getRenters();
    const rooms = getRooms();
    const bills = getBills();

    return {
        totalRenters: renters.length,
        occupiedRooms: rooms.filter(r => r.status === 'occupied').length,
        pendingBills: bills.filter(b => b.status === 'pending').length,
        monthlyRevenue: renters.reduce((sum, renter) => sum + renter.rentAmount, 0)
    };
}

function getStatsCardsHTML() {
    const stats = getDashboardStats();
    return `
        <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-content">
                <div class="stat-number">${stats.totalRenters}</div>
                <div class="stat-label">Total Renters</div>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">🚪</div>
            <div class="stat-content">
                <div class="stat-number">${stats.occupiedRooms}</div>
                <div class="stat-label">Occupied Rooms</div>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">💳</div>
            <div class="stat-content">
                <div class="stat-number">${stats.pendingBills}</div>
                <div class="stat-label">Pending Bills</div>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">💰</div>
            <div class="stat-content">
                <div class="stat-number">${formatCurrency(stats.monthlyRevenue)}</div>
                <div class="stat-label">Monthly Revenue</div>
            </div>
        </div>
    `;
}

function addMainPageStyles() {
    const styles = `
        <style data-page="main">
            /* Reset body background */
            body {
                background: var(--bg-base);
            }

            /* Main Page Layout */
            .main-header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 70px;
                background: white;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 2rem;
                z-index: 1000;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }

            .header-left .logo {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }

            .logo-icon {
                font-size: 2rem;
            }

            .logo-text {
                font-size: 1.5rem;
                font-weight: bold;
                color: #2563eb;
            }

            .header-right {
                display: flex;
                align-items: center;
                gap: 1.5rem;
            }

            .notifications {
                position: relative;
            }

            .notification-btn {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                position: relative;
                padding: 0.5rem;
                border-radius: 50%;
                transition: background-color 0.2s;
            }

            .notification-btn:hover {
                background-color: #f3f4f6;
            }

            .notification-badge {
                position: absolute;
                top: 0;
                right: 0;
                background: #ef4444;
                color: white;
                border-radius: 50%;
                width: 18px;
                height: 18px;
                font-size: 0.75rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
            }

            .user-profile {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }

            .user-info {
                text-align: right;
            }

            .user-name {
                display: block;
                font-weight: 600;
                color: #111827;
            }

            .user-role {
                display: block;
                font-size: 0.875rem;
                color: #6b7280;
            }

            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: linear-gradient(135deg, #2563eb 0%, #0891b2 100%);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 1.1rem;
            }

            .main-layout {
                display: flex;
                margin-top: 70px;
                min-height: calc(100vh - 70px);
            }

            .main-sidebar {
                width: 280px;
                background: white;
                border-right: 1px solid #e5e7eb;
                display: flex;
                flex-direction: column;
                padding: 1.5rem 0;
            }

            .sidebar-nav ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .nav-item {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.75rem 1.5rem;
                cursor: pointer;
                transition: all 0.2s;
                border-left: 3px solid transparent;
            }

            .nav-item:hover {
                background-color: #f9fafb;
            }

            .nav-item.active {
                background-color: #eff6ff;
                border-left-color: #2563eb;
                color: #2563eb;
            }

            .nav-icon {
                font-size: 1.25rem;
                width: 24px;
                text-align: center;
            }

            .sidebar-footer {
                margin-top: auto;
                padding: 1.5rem;
            }

            .logout-btn {
                width: 100%;
                padding: 0.75rem;
                background: #fee2e2;
                color: #dc2626;
                border: none;
                border-radius: 6px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
            }

            .logout-btn:hover {
                background: #fecaca;
            }

            .main-content {
                flex: 1;
                padding: 2rem;
                background: #f9fafb;
                overflow-y: auto;
            }

            .content-header {
                margin-bottom: 2rem;
            }

            .content-header h1 {
                font-size: 2rem;
                font-weight: bold;
                color: #111827;
                margin: 0 0 0.5rem 0;
            }

            .content-header p {
                color: #6b7280;
                font-size: 1.1rem;
                margin: 0;
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
                margin-bottom: 3rem;
            }

            .stat-card {
                background: white;
                padding: 1.5rem;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .stat-icon {
                font-size: 2rem;
                width: 60px;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #2563eb 0%, #0891b2 100%);
                border-radius: 8px;
                color: white;
            }

            .stat-content {
                flex: 1;
            }

            .stat-number {
                font-size: 2rem;
                font-weight: bold;
                color: #111827;
                margin-bottom: 0.25rem;
            }

            .stat-label {
                color: #6b7280;
                font-size: 0.875rem;
            }

            .quick-actions {
                background: white;
                padding: 2rem;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                margin-bottom: 2rem;
            }

            .quick-actions h2 {
                margin: 0 0 1.5rem 0;
                color: #111827;
                font-size: 1.5rem;
            }

            .action-buttons {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }

            .action-btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 6px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
            }

            .action-btn.primary {
                background: linear-gradient(135deg, #2563eb 0%, #0891b2 100%);
                color: white;
            }

            .action-btn.primary:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            }

            .action-btn.secondary {
                background: white;
                color: #374151;
                border: 1px solid #d1d5db;
            }

            .action-btn.secondary:hover {
                background: #f9fafb;
                border-color: #9ca3af;
            }

            .recent-activity {
                background: white;
                padding: 2rem;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }

            .recent-activity h2 {
                margin: 0 0 1.5rem 0;
                color: #111827;
                font-size: 1.5rem;
            }

            .activity-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .activity-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: #f9fafb;
                border-radius: 6px;
            }

            .activity-icon {
                font-size: 1.5rem;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: white;
                border-radius: 6px;
                box-shadow: 0 1px 2px rgba(0,0,0,0.1);
            }

            .activity-content p {
                margin: 0 0 0.25rem 0;
                color: #111827;
                font-size: 0.9rem;
            }

            .activity-time {
                color: #6b7280;
                font-size: 0.8rem;
            }

            .notification-dropdown {
                position: fixed;
                top: 70px;
                right: 2rem;
                width: 380px;
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                z-index: 1001;
            }

            .notification-header {
                padding: 1rem 1.5rem;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .notification-header h3 {
                margin: 0;
                font-size: 1.1rem;
                color: #111827;
            }

            .mark-read-btn {
                background: none;
                border: none;
                color: #2563eb;
                font-size: 0.875rem;
                cursor: pointer;
            }

            .notification-list {
                max-height: 400px;
                overflow-y: auto;
            }

            .notification-item {
                padding: 1rem 1.5rem;
                border-bottom: 1px solid #f3f4f6;
                display: flex;
                align-items: flex-start;
                gap: 0.75rem;
                cursor: pointer;
                transition: background-color 0.2s;
            }

            .notification-item:hover {
                background-color: #f9fafb;
            }

            .notification-item.unread {
                background-color: #eff6ff;
                border-left: 3px solid #2563eb;
            }

            .notification-item:last-child {
                border-bottom: none;
            }

            .notification-icon {
                font-size: 1.25rem;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f3f4f6;
                border-radius: 4px;
                flex-shrink: 0;
            }

            .notification-content p {
                margin: 0 0 0.25rem 0;
                color: #111827;
                font-size: 0.875rem;
                line-height: 1.4;
            }

            .notification-time {
                color: #6b7280;
                font-size: 0.75rem;
            }

            @media (max-width: 768px) {
                .main-layout {
                    flex-direction: column;
                }
                .main-sidebar {
                    width: 100%;
                    order: 2;
                }
                .main-content {
                    order: 1;
                }
                .stats-grid {
                    grid-template-columns: 1fr;
                }
                .action-buttons {
                    flex-direction: column;
                }
                .notification-dropdown {
                    width: calc(100vw - 2rem);
                    right: 1rem;
                    left: 1rem;
                }
            }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', styles);
}

function setupMainPageEvents() {
    // User dropdown toggle
    const avatarDisplay = document.getElementById('avatar-display');
    const userDropdown = document.getElementById('userDropdown');
    if (avatarDisplay && userDropdown) {
        avatarDisplay.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = userDropdown.style.display !== 'none';
            userDropdown.style.display = isVisible ? 'none' : 'block';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!avatarDisplay.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.style.display = 'none';
            }
        });
    }

    // Settings button (placeholder)
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            alert('Settings not implemented yet');
            userDropdown.style.display = 'none';
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logout();
            window.location.hash = 'login';
        });
    }

    // Sidebar navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            if (page) {
                // Update active state
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                window.location.hash = page;
            }
        });
    });

    // Notification dropdown toggle
    const notificationBtn = document.getElementById('notification-btn');
    const notificationDropdown = document.getElementById('notification-dropdown');

    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = notificationDropdown.style.display !== 'none';
            notificationDropdown.style.display = isVisible ? 'none' : 'block';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
                notificationDropdown.style.display = 'none';
            }
        });
    }

    // Update sidebar active state based on current hash
    updateSidebarActiveState();
}

function updateSidebarActiveState() {
    const currentHash = window.location.hash.substring(1) || 'main';
    document.querySelectorAll('.nav-item').forEach(item => {
        const page = item.getAttribute('data-page');
        if (page === currentHash) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Listen for hash changes to update sidebar
window.addEventListener('hashchange', updateSidebarActiveState);

// Global export for compatibility
window.renderMainPage = renderMainPage;