// Utility functions and mock data management

// Mock data storage keys
const DATA_KEYS = {
    RENTERS: 'ppap_renters',
    ROOMS: 'ppap_rooms',
    BILLS: 'ppap_bills',
    WIFI: 'ppap_wifi',
    ADVERTISEMENTS: 'ppap_advertisements'
};

// Initialize mock data if not exists
function initializeMockData() {
    // Mock renters data
    if (!localStorage.getItem(DATA_KEYS.RENTERS)) {
        const mockRenters = [
            {
                id: 1,
                name: 'Jane Doe',
                room: '101',
                floor: 1,
                avatar: 'J',
                avatarColor: '#2563eb',
                email: 'jane.doe@email.com',
                phone: '+1-555-0101',
                moveInDate: '2024-01-15',
                rentAmount: 1200,
                status: 'active'
            },
            {
                id: 2,
                name: 'John Smith',
                room: '201',
                floor: 2,
                avatar: 'J',
                avatarColor: '#0891b2',
                email: 'john.smith@email.com',
                phone: '+1-555-0102',
                moveInDate: '2024-02-01',
                rentAmount: 1150,
                status: 'active'
            },
            {
                id: 3,
                name: 'Alice Johnson',
                room: '102',
                floor: 1,
                avatar: 'A',
                avatarColor: '#4caf50',
                email: 'alice.j@email.com',
                phone: '+1-555-0103',
                moveInDate: '2024-01-20',
                rentAmount: 1250,
                status: 'active'
            },
            {
                id: 4,
                name: 'Bob Wilson',
                room: '301',
                floor: 3,
                avatar: 'B',
                avatarColor: '#ff9800',
                email: 'bob.w@email.com',
                phone: '+1-555-0104',
                moveInDate: '2024-03-01',
                rentAmount: 1300,
                status: 'active'
            },
            {
                id: 5,
                name: 'Carol Brown',
                room: '202',
                floor: 2,
                avatar: 'C',
                avatarColor: '#9c27b0',
                email: 'carol.b@email.com',
                phone: '+1-555-0105',
                moveInDate: '2024-02-15',
                rentAmount: 1180,
                status: 'active'
            }
        ];
        localStorage.setItem(DATA_KEYS.RENTERS, JSON.stringify(mockRenters));
    }

    // Mock rooms data
    if (!localStorage.getItem(DATA_KEYS.ROOMS)) {
        const mockRooms = [
            { number: '101', floor: 1, status: 'occupied', renterId: 1 },
            { number: '102', floor: 1, status: 'occupied', renterId: 3 },
            { number: '103', floor: 1, status: 'vacant', renterId: null },
            { number: '201', floor: 2, status: 'occupied', renterId: 2 },
            { number: '202', floor: 2, status: 'occupied', renterId: 5 },
            { number: '203', floor: 2, status: 'vacant', renterId: null },
            { number: '301', floor: 3, status: 'occupied', renterId: 4 },
            { number: '302', floor: 3, status: 'vacant', renterId: null },
            { number: '303', floor: 3, status: 'vacant', renterId: null }
        ];
        localStorage.setItem(DATA_KEYS.ROOMS, JSON.stringify(mockRooms));
    }

    // Mock bills data
    if (!localStorage.getItem(DATA_KEYS.BILLS)) {
        const mockBills = [
            {
                id: 1,
                renterId: 1,
                amount: 1200,
                dueDate: '2024-04-01',
                status: 'paid',
                period: 'March 2024'
            },
            {
                id: 2,
                renterId: 2,
                amount: 1150,
                dueDate: '2024-04-01',
                status: 'pending',
                period: 'March 2024'
            },
            {
                id: 3,
                renterId: 3,
                amount: 1250,
                dueDate: '2024-04-01',
                status: 'paid',
                period: 'March 2024'
            },
            {
                id: 4,
                renterId: 4,
                amount: 1300,
                dueDate: '2024-04-01',
                status: 'overdue',
                period: 'March 2024'
            },
            {
                id: 5,
                renterId: 5,
                amount: 1180,
                dueDate: '2024-04-01',
                status: 'paid',
                period: 'March 2024'
            }
        ];
        localStorage.setItem(DATA_KEYS.BILLS, JSON.stringify(mockBills));
    }

    // Mock WiFi data
    if (!localStorage.getItem(DATA_KEYS.WIFI)) {
        const mockWifi = [
            {
                id: 1,
                renterId: 1,
                networkName: 'PPA_Guest_101',
                password: 'guest101!',
                status: 'active',
                dataLimit: '50GB',
                expiryDate: '2024-04-01'
            },
            {
                id: 2,
                renterId: 2,
                networkName: 'PPA_Guest_201',
                password: 'guest201!',
                status: 'active',
                dataLimit: '50GB',
                expiryDate: '2024-04-01'
            },
            {
                id: 3,
                renterId: 3,
                networkName: 'PPA_Guest_102',
                password: 'guest102!',
                status: 'suspended',
                dataLimit: '50GB',
                expiryDate: '2024-03-15'
            }
        ];
        localStorage.setItem(DATA_KEYS.WIFI, JSON.stringify(mockWifi));
    }

    // Mock advertisements data
    if (!localStorage.getItem(DATA_KEYS.ADVERTISEMENTS)) {
        const mockAdvertisements = [
            {
                id: 'AD001',
                title: 'Room for Rent',
                description: 'Spacious room available with great amenities',
                image: 'room.jpg',
                status: 'active',
                createdDate: '2024-01-15'
            },
            {
                id: 'AD002',
                title: 'Apartment Facilities',
                description: 'Check out our modern facilities and amenities',
                image: 'facilities.jpg',
                status: 'active',
                createdDate: '2024-01-20'
            },
            {
                id: 'AD003',
                title: 'Maintenance Notice',
                description: 'Scheduled maintenance this weekend - please plan accordingly',
                image: 'maintenance.jpg',
                status: 'inactive',
                createdDate: '2024-01-25'
            },
            {
                id: 'AD004',
                title: 'New Policies',
                description: 'Updated rental policies effective immediately',
                image: 'policies.jpg',
                status: 'active',
                createdDate: '2024-02-01'
            }
        ];
        localStorage.setItem(DATA_KEYS.ADVERTISEMENTS, JSON.stringify(mockAdvertisements));
    }
}

// Data access functions
function getRenters() {
    initializeMockData();
    return JSON.parse(localStorage.getItem(DATA_KEYS.RENTERS) || '[]');
}

function getRooms() {
    initializeMockData();
    return JSON.parse(localStorage.getItem(DATA_KEYS.ROOMS) || '[]');
}

function getBills() {
    initializeMockData();
    return JSON.parse(localStorage.getItem(DATA_KEYS.BILLS) || '[]');
}

function getWifiAccounts() {
    initializeMockData();
    return JSON.parse(localStorage.getItem(DATA_KEYS.WIFI) || '[]');
}

function getAdvertisements() {
    initializeMockData();
    return JSON.parse(localStorage.getItem(DATA_KEYS.ADVERTISEMENTS) || '[]');
}

function updateRenter(id, updates) {
    const renters = getRenters();
    const index = renters.findIndex(r => r.id === id);
    if (index !== -1) {
        renters[index] = { ...renters[index], ...updates };
        localStorage.setItem(DATA_KEYS.RENTERS, JSON.stringify(renters));
        return true;
    }
    return false;
}

function addRenter(renter) {
    const renters = getRenters();
    const newId = Math.max(...renters.map(r => r.id), 0) + 1;
    const newRenter = { ...renter, id: newId };
    renters.push(newRenter);
    localStorage.setItem(DATA_KEYS.RENTERS, JSON.stringify(renters));
    return newRenter;
}

function updateRoom(roomNumber, updates) {
    const rooms = getRooms();
    const index = rooms.findIndex(r => r.number === roomNumber);
    if (index !== -1) {
        rooms[index] = { ...rooms[index], ...updates };
        localStorage.setItem(DATA_KEYS.ROOMS, JSON.stringify(rooms));
        return true;
    }
    return false;
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getStatusColor(status) {
    const colors = {
        active: '#4caf50',
        pending: '#ff9800',
        paid: '#4caf50',
        overdue: '#f44336',
        suspended: '#9e9e9e',
        vacant: '#9e9e9e',
        occupied: '#4caf50'
    };
    return colors[status] || '#666';
}

function navigateTo(url) {
    window.location.href = url;
}

// Global exports for compatibility with module imports
window.getRenters = getRenters;
window.getRooms = getRooms;
window.getBills = getBills;
window.getWifiAccounts = getWifiAccounts;
window.getAdvertisements = getAdvertisements;
window.updateRenter = updateRenter;
window.updateRoom = updateRoom;
window.addRenter = addRenter;
window.formatCurrency = formatCurrency;
window.formatDate = formatDate;
window.getStatusColor = getStatusColor;
