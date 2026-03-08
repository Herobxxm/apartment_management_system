// Authentication service with localStorage-based session management

const AUTH_KEY = 'ppap_user_session';

// Mock user database for demo purposes
const MOCK_USERS = {
    'admin': { password: 'admin123', role: 'admin', displayName: 'Administrator' },
    'manager': { password: 'manager123', role: 'manager', displayName: 'Property Manager' },
    'user': { password: 'user123', role: 'user', displayName: 'Staff User' },
    'demo': { password: 'demo123', role: 'demo', displayName: 'Demo User' }
};

/**
 * Get current logged-in user
 */
function getCurrentUser() {
    const session = localStorage.getItem(AUTH_KEY);
    if (!session) return null;
    try {
        return JSON.parse(session);
    } catch (e) {
        return null;
    }
}

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    return getCurrentUser() !== null;
}

/**
 * Login with username and password
 * @param {string} username
 * @param {string} password
 * @returns {object} User object or null if failed
 */
function login(username, password) {
    // Mock login - check against MOCK_USERS
    const userData = MOCK_USERS[username];
    if (userData && userData.password === password) {
        const user = {
            username: username,
            displayName: userData.displayName,
            role: userData.role,
            loginTime: new Date().toISOString(),
            permissions: getRolePermissions(userData.role)
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        return user;
    }
    return null;
}

/**
 * Get permissions for a user role
 * @param {string} role
 * @returns {object} Permissions object
 */
function getRolePermissions(role) {
    const permissions = {
        admin: {
            canViewAll: true,
            canEditRenters: true,
            canDeleteRenters: true,
            canManageRooms: true,
            canManageBills: true,
            canManageWifi: true,
            canViewReports: true
        },
        manager: {
            canViewAll: true,
            canEditRenters: true,
            canDeleteRenters: false,
            canManageRooms: true,
            canManageBills: true,
            canManageWifi: true,
            canViewReports: true
        },
        user: {
            canViewAll: false,
            canEditRenters: false,
            canDeleteRenters: false,
            canManageRooms: false,
            canManageBills: false,
            canManageWifi: false,
            canViewReports: false
        },
        demo: {
            canViewAll: true,
            canEditRenters: false,
            canDeleteRenters: false,
            canManageRooms: false,
            canManageBills: false,
            canManageWifi: false,
            canViewReports: true
        }
    };
    return permissions[role] || permissions.user;
}

/**
 * Check if current user has a specific permission
 * @param {string} permission
 * @returns {boolean}
 */
function hasPermission(permission) {
    const user = getCurrentUser();
    if (!user || !user.permissions) return false;
    return user.permissions[permission] || false;
}

/**
 * Get current user role
 * @returns {string}
 */
function getCurrentUserRole() {
    const user = getCurrentUser();
    return user ? user.role : null;
}

/**
 * Redirect to login if not authenticated
 */
function requireLogin() {
    if (!isLoggedIn()) {
        // Get current page name
        const currentPage = window.location.pathname.split('/').pop() || '';
        
        // Only redirect if not already on login page
        if (!currentPage.includes('login')) {
            const loginPath = currentPage === '' || currentPage.includes('pages') 
                ? './login.html' 
                : './pages/login.html';
            window.location.href = loginPath;
        }
        return false;
    }
    return true;
}

/**
 * Logout current user
 */
function logout() {
    localStorage.removeItem(AUTH_KEY);
    // Redirect to login page
    window.location.hash = 'login';
}

// Global exports for compatibility with module imports
window.getCurrentUser = getCurrentUser;
window.isLoggedIn = isLoggedIn;
window.login = login;
window.logout = logout;
window.requireLogin = requireLogin;
window.hasPermission = hasPermission;
window.getCurrentUserRole = getCurrentUserRole;
