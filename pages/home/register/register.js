// Register Page Module - Generates renter registration UI dynamically
console.log('Register module loading...');

function renderRegisterPage() {
    console.log('renderRegisterPage called');
    // ensure app shell exists (if user navigated here directly)
    if (!document.getElementById('topbarTitle') && typeof renderMainPage === 'function') {
        renderMainPage();
    }

    // Set page title
    document.title = 'Renter Register - PPApartment';

    // Get current user for permissions
    const user = getCurrentUser();

    // Get data
    const renters = getRenters();
    const rooms = getRooms();

    // Create register page HTML
    const registerHTML = `
        <div class="page-container">
            <div class="page-header">
                <h1 class="page-title">📝 Renter Register</h1>
                <p class="page-subtitle">Manage renter information and registrations</p>
            </div>

            <div class="page-content">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">👥</div>
                        <div class="stat-content">
                            <div class="stat-number">${renters.length}</div>
                            <div class="stat-label">Total Renters</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🏠</div>
                        <div class="stat-content">
                            <div class="stat-number">${renters.filter(r => r.status === 'active').length}</div>
                            <div class="stat-label">Active Renters</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📅</div>
                        <div class="stat-content">
                            <div class="stat-number">${renters.filter(r => {
                                const moveInDate = new Date(r.moveInDate);
                                const oneMonthAgo = new Date();
                                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                                return moveInDate >= oneMonthAgo;
                            }).length}</div>
                            <div class="stat-label">New This Month</div>
                        </div>
                    </div>
                </div>

                <div class="content-section">
                    <div class="section-header">
                        <h2>Renter Management</h2>
                        <button class="btn btn-primary" onclick="showAddRenterModal()">+ Add New Renter</button>
                    </div>

                    <div class="data-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Room</th>
                                    <th>Contact</th>
                                    <th>Move-in Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${renters.map(renter => {
                                    const room = rooms.find(r => r.id === renter.roomId);
                                    return `
                                        <tr>
                                            <td>${renter.id}</td>
                                            <td>${renter.name}</td>
                                            <td>${room ? `Room ${room.roomNumber}` : 'No Room'}</td>
                                            <td>${renter.phone}</td>
                                            <td>${renter.moveInDate}</td>
                                            <td>
                                                <span class="status-badge status-${renter.status}">
                                                    ${renter.status.charAt(0).toUpperCase() + renter.status.slice(1)}
                                                </span>
                                            </td>
                                            <td>
                                                <button class="btn btn-sm" onclick="alert('View renter details')">View</button>
                                                <button class="btn btn-sm btn-secondary" onclick="alert('Edit renter')">Edit</button>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Renter Modal (hidden by default) -->
        <div id="addRenterModal" class="modal" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Add New Renter</h3>
                    <button class="modal-close" onclick="hideAddRenterModal()">×</button>
                </div>
                <div class="modal-body">
                    <form id="addRenterForm">
                        <div class="form-group">
                            <label for="renterName">Full Name</label>
                            <input type="text" id="renterName" required>
                        </div>
                        <div class="form-group">
                            <label for="renterPhone">Phone Number</label>
                            <input type="tel" id="renterPhone" required>
                        </div>
                        <div class="form-group">
                            <label for="renterEmail">Email</label>
                            <input type="email" id="renterEmail">
                        </div>
                        <div class="form-group">
                            <label for="renterRoom">Room</label>
                            <select id="renterRoom" required>
                                <option value="">Select Room</option>
                                ${rooms.filter(r => r.status === 'available').map(room =>
                                    `<option value="${room.id}">Room ${room.roomNumber} - ${formatCurrency(room.rentAmount)}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="moveInDate">Move-in Date</label>
                            <input type="date" id="moveInDate" required>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="hideAddRenterModal()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Add Renter</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Set page content
    document.querySelector('.main-content').innerHTML = registerHTML;

    // Add form submission handler
    document.getElementById('addRenterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Add renter functionality coming soon!');
        hideAddRenterModal();
    });

    console.log('Register page rendered');
}

function showAddRenterModal() {
    document.getElementById('addRenterModal').style.display = 'flex';
}

function hideAddRenterModal() {
    document.getElementById('addRenterModal').style.display = 'none';
}

// Global export for compatibility
window.renderRegisterPage = renderRegisterPage;
console.log('Register module loaded, renderRegisterPage assigned to window:', typeof window.renderRegisterPage);