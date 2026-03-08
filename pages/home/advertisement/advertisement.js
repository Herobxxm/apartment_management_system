// Advertisement Management Page Module - Generates advertisement management UI dynamically
console.log('Advertisement module loading...');

function renderAdvertisementPage() {
    console.log('renderAdvertisementPage called');
    if (!document.getElementById('topbarTitle') && typeof renderMainPage === 'function') {
        renderMainPage();
    }
    // Set page title
    document.title = 'Advertisement Management - PPApartment';

    // Get current user for permissions
    const user = getCurrentUser();

    // Get advertisement data (mock data)
    const advertisements = getAdvertisements ? getAdvertisements() : [
        { id: 'AD001', title: 'Room for Rent', description: 'Spacious room available', image: 'room.jpg', status: 'active', createdDate: '2024-01-15' },
        { id: 'AD002', title: 'Apartment Facilities', description: 'Check out our amenities', image: 'facilities.jpg', status: 'active', createdDate: '2024-01-20' },
        { id: 'AD003', title: 'Maintenance Notice', description: 'Scheduled maintenance this weekend', image: 'maintenance.jpg', status: 'inactive', createdDate: '2024-01-25' },
        { id: 'AD004', title: 'New Policies', description: 'Updated rental policies', image: 'policies.jpg', status: 'active', createdDate: '2024-02-01' }
    ];

    // Create advertisement management page HTML
    const advertisementHTML = `
        <div class="page-container">
            <div class="page-header">
                <h1 class="page-title">📢 Advertisement Management</h1>
                <p class="page-subtitle">Manage property advertisements and notices</p>
            </div>

            <div class="page-content">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">📢</div>
                        <div class="stat-content">
                            <div class="stat-number">${advertisements.length}</div>
                            <div class="stat-label">Total Ads</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">✅</div>
                        <div class="stat-content">
                            <div class="stat-number">${advertisements.filter(a => a.status === 'active').length}</div>
                            <div class="stat-label">Active Ads</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🚫</div>
                        <div class="stat-content">
                            <div class="stat-number">${advertisements.filter(a => a.status === 'inactive').length}</div>
                            <div class="stat-label">Inactive Ads</div>
                        </div>
                    </div>
                </div>

                <div class="action-bar">
                    <button class="btn btn-primary" onclick="showAddAdvertisementModal()">
                        <span class="btn-icon">➕</span>
                        Add New Advertisement
                    </button>
                </div>

                <div class="data-table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Created Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${advertisements.map(ad => `
                                <tr>
                                    <td>${ad.id}</td>
                                    <td>${ad.title}</td>
                                    <td>${ad.description.substring(0, 50)}${ad.description.length > 50 ? '...' : ''}</td>
                                    <td>
                                        <span class="status-badge ${ad.status}">
                                            ${ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>${ad.createdDate}</td>
                                    <td>
                                        <button class="btn btn-sm btn-secondary" onclick="editAdvertisement('${ad.id}')">Edit</button>
                                        <button class="btn btn-sm btn-danger" onclick="deleteAdvertisement('${ad.id}')">Delete</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Add Advertisement Modal -->
            <div id="addAdvertisementModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Add New Advertisement</h3>
                        <span class="modal-close" onclick="hideAddAdvertisementModal()">&times;</span>
                    </div>
                    <div class="modal-body">
                        <form id="addAdvertisementForm">
                            <div class="form-group">
                                <label for="adTitle">Title</label>
                                <input type="text" id="adTitle" name="title" required>
                            </div>
                            <div class="form-group">
                                <label for="adDescription">Description</label>
                                <textarea id="adDescription" name="description" rows="4" required></textarea>
                            </div>
                            <div class="form-group">
                                <label for="adImage">Image URL</label>
                                <input type="url" id="adImage" name="image">
                            </div>
                            <div class="form-group">
                                <label for="adStatus">Status</label>
                                <select id="adStatus" name="status">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="hideAddAdvertisementModal()">Cancel</button>
                        <button type="submit" form="addAdvertisementForm" class="btn btn-primary">Add Advertisement</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Set page content
    document.querySelector('.main-content').innerHTML = advertisementHTML;

    console.log('Advertisement page rendered');
}

function showAddAdvertisementModal() {
    document.getElementById('addAdvertisementModal').style.display = 'block';
}

function hideAddAdvertisementModal() {
    document.getElementById('addAdvertisementModal').style.display = 'none';
}

function editAdvertisement(id) {
    alert('Edit advertisement functionality coming soon! ID: ' + id);
}

function deleteAdvertisement(id) {
    if (confirm('Are you sure you want to delete this advertisement?')) {
        alert('Delete advertisement functionality coming soon! ID: ' + id);
    }
}

// Global export for compatibility
window.renderAdvertisementPage = renderAdvertisementPage;
console.log('Advertisement module loaded, renderAdvertisementPage assigned to window:', typeof window.renderAdvertisementPage);