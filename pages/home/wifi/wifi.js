// WiFi Management Page Module - Generates wifi management UI dynamically
console.log('WiFi module loading...');

function renderWifiPage() {
    console.log('renderWifiPage called');
    if (!document.getElementById('topbarTitle') && typeof renderMainPage === 'function') {
        renderMainPage();
    }
    // Set page title
    document.title = 'WiFi Management - PPApartment';

    // Get current user for permissions
    const user = getCurrentUser();

    // Get wifi data (assuming it exists in utils.js)
    const wifiAccounts = getWifiAccounts ? getWifiAccounts() : [
        { id: 'WF001', ssid: 'PPA_Guest', password: 'guest123', renterName: 'John Doe', roomNumber: '101', status: 'active' },
        { id: 'WF002', ssid: 'PPA_Room102', password: 'room102wifi', renterName: 'Jane Smith', roomNumber: '102', status: 'active' },
        { id: 'WF003', ssid: 'PPA_Room103', password: 'room103wifi', renterName: 'Bob Johnson', roomNumber: '103', status: 'inactive' },
        { id: 'WF004', ssid: 'PPA_Room104', password: 'room104wifi', renterName: 'Alice Brown', roomNumber: '104', status: 'active' }
    ];

    // Create wifi management page HTML
    const wifiHTML = `
        <div class="page-container">
            <div class="page-header">
                <h1 class="page-title">📶 WiFi Management</h1>
                <p class="page-subtitle">Manage WiFi accounts and network access</p>
            </div>

            <div class="page-content">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">📡</div>
                        <div class="stat-content">
                            <div class="stat-number">${wifiAccounts.length}</div>
                            <div class="stat-label">Total Accounts</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">✅</div>
                        <div class="stat-content">
                            <div class="stat-number">${wifiAccounts.filter(w => w.status === 'active').length}</div>
                            <div class="stat-label">Active Accounts</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🚫</div>
                        <div class="stat-content">
                            <div class="stat-number">${wifiAccounts.filter(w => w.status === 'inactive').length}</div>
                            <div class="stat-label">Inactive Accounts</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🔄</div>
                        <div class="stat-content">
                            <div class="stat-number">${wifiAccounts.filter(w => {
                                // Mock data for recently changed passwords
                                return Math.random() > 0.7;
                            }).length}</div>
                            <div class="stat-label">Recent Changes</div>
                        </div>
                    </div>
                </div>

                <div class="content-section">
                    <div class="section-header">
                        <h2>WiFi Accounts</h2>
                        <button class="btn btn-primary" onclick="showAddWifiModal()">+ Add WiFi Account</button>
                    </div>

                    <div class="wifi-grid">
                        ${wifiAccounts.map(account => `
                            <div class="wifi-card wifi-${account.status}">
                                <div class="wifi-header">
                                    <div class="wifi-ssid">${account.ssid}</div>
                                    <div class="wifi-status status-${account.status}">
                                        ${account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                                    </div>
                                </div>
                                <div class="wifi-details">
                                    <div class="wifi-info">
                                        <div class="info-item">
                                            <span class="label">Renter:</span>
                                            <span class="value">${account.renterName}</span>
                                        </div>
                                        <div class="info-item">
                                            <span class="label">Room:</span>
                                            <span class="value">${account.roomNumber}</span>
                                        </div>
                                        <div class="info-item">
                                            <span class="label">Password:</span>
                                            <span class="value password-field" data-password="${account.password}">••••••••</span>
                                            <button class="show-password-btn" onclick="togglePassword(this)">👁️</button>
                                        </div>
                                    </div>
                                    <div class="wifi-actions">
                                        <button class="btn btn-sm" onclick="alert('Reset password')">Reset Password</button>
                                        <button class="btn btn-sm btn-secondary" onclick="alert('Edit account')">Edit</button>
                                        <button class="btn btn-sm ${account.status === 'active' ? 'btn-warning' : 'btn-success'}"
                                                onclick="alert('Toggle status')">
                                            ${account.status === 'active' ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>

        <!-- Add WiFi Modal (hidden by default) -->
        <div id="addWifiModal" class="modal" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Add New WiFi Account</h3>
                    <button class="modal-close" onclick="hideAddWifiModal()">×</button>
                </div>
                <div class="modal-body">
                    <form id="addWifiForm">
                        <div class="form-group">
                            <label for="wifiRenter">Renter</label>
                            <select id="wifiRenter" required>
                                <option value="">Select Renter</option>
                                ${getRenters().filter(r => r.status === 'active').map(renter =>
                                    `<option value="${renter.id}">${renter.name} - Room ${getRooms().find(room => room.id === renter.roomId)?.roomNumber || 'N/A'}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="wifiSsid">Network Name (SSID)</label>
                            <input type="text" id="wifiSsid" placeholder="e.g., PPA_Room101" required>
                        </div>
                        <div class="form-group">
                            <label for="wifiPassword">Password</label>
                            <input type="password" id="wifiPassword" placeholder="Enter secure password" required>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="hideAddWifiModal()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Set page content
    document.querySelector('.main-content').innerHTML = wifiHTML;

    // Add form submission handler
    document.getElementById('addWifiForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Add WiFi account functionality coming soon!');
        hideAddWifiModal();
    });

    console.log('WiFi page rendered');
}

function showAddWifiModal() {
    document.getElementById('addWifiModal').style.display = 'flex';
}

function hideAddWifiModal() {
    document.getElementById('addWifiModal').style.display = 'none';
}

function togglePassword(btn) {
    const passwordField = btn.previousElementSibling;
    if (passwordField.textContent === '••••••••') {
        passwordField.textContent = passwordField.dataset.password;
        btn.textContent = '🙈';
    } else {
        passwordField.textContent = '••••••••';
        btn.textContent = '👁️';
    }
}

// Global export for compatibility
window.renderWifiPage = renderWifiPage;
console.log('WiFi module loaded, renderWifiPage assigned to window:', typeof window.renderWifiPage);