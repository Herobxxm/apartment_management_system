// Room Management Page Module - Generates room management UI dynamically
console.log('Room module loading...');

function renderRoomPage() {
    console.log('renderRoomPage called');
    if (!document.getElementById('topbarTitle') && typeof renderMainPage === 'function') {
        renderMainPage();
    }
    // Set page title
    document.title = 'Room Management - PPApartment';

    // Get current user for permissions
    const user = getCurrentUser();

    // Get room data
    const rooms = getRooms();
    const renters = getRenters();

    // Create room management page HTML
    const roomHTML = `
        <div class="page-container">
            <div class="page-header">
                <h1 class="page-title">🚪 Room Management</h1>
                <p class="page-subtitle">Manage apartment rooms and occupancy</p>
            </div>

            <div class="page-content">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">🏠</div>
                        <div class="stat-content">
                            <div class="stat-number">${rooms.length}</div>
                            <div class="stat-label">Total Rooms</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">✅</div>
                        <div class="stat-content">
                            <div class="stat-number">${rooms.filter(r => r.status === 'occupied').length}</div>
                            <div class="stat-label">Occupied</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🔓</div>
                        <div class="stat-content">
                            <div class="stat-number">${rooms.filter(r => r.status === 'available').length}</div>
                            <div class="stat-label">Available</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">🔧</div>
                        <div class="stat-content">
                            <div class="stat-number">${rooms.filter(r => r.status === 'maintenance').length}</div>
                            <div class="stat-label">Maintenance</div>
                        </div>
                    </div>
                </div>

                <div class="content-section">
                    <div class="section-header">
                        <h2>Room Status Overview</h2>
                        <button class="btn btn-primary" onclick="alert('Add new room functionality coming soon!')">+ Add New Room</button>
                    </div>

                    <div class="room-grid">
                        ${rooms.map(room => {
                            const renter = renters.find(r => r.roomId === room.id);
                            return `
                                <div class="room-card room-${room.status}">
                                    <div class="room-header">
                                        <div class="room-number">Room ${room.roomNumber}</div>
                                        <div class="room-status status-${room.status}">
                                            ${room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                                        </div>
                                    </div>
                                    <div class="room-details">
                                        <div class="room-info">
                                            <div class="info-item">
                                                <span class="label">Floor:</span>
                                                <span class="value">${room.floor}</span>
                                            </div>
                                            <div class="info-item">
                                                <span class="label">Rent:</span>
                                                <span class="value">${formatCurrency(room.rentAmount)}</span>
                                            </div>
                                            ${renter ? `
                                                <div class="info-item">
                                                    <span class="label">Renter:</span>
                                                    <span class="value">${renter.name}</span>
                                                </div>
                                            ` : ''}
                                        </div>
                                        <div class="room-actions">
                                            <button class="btn btn-sm" onclick="alert('View room details')">View</button>
                                            <button class="btn btn-sm btn-secondary" onclick="alert('Edit room')">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Set page content
    document.querySelector('.main-content').innerHTML = roomHTML;

    console.log('Room page rendered');
}

// Global export for compatibility
window.renderRoomPage = renderRoomPage;
console.log('Room module loaded, renderRoomPage assigned to window:', typeof window.renderRoomPage);