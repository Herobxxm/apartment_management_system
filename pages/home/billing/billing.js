// Billing Page Module - Generates billing management UI dynamically
console.log('Billing module loading...');

function renderBillingPage() {
    console.log('renderBillingPage called');
    if (!document.getElementById('topbarTitle') && typeof renderMainPage === 'function') {
        renderMainPage();
    }
    // Set page title
    document.title = 'Billing Manager - PPApartment';

    // Get current user for permissions
    const user = getCurrentUser();

    // Get billing data
    const bills = getBills();

    // Create billing page HTML
    const billingHTML = `
        <div class="page-container">
            <div class="page-header">
                <h1 class="page-title">💳 Billing Manager</h1>
                <p class="page-subtitle">Manage rent payments and billing records</p>
            </div>

            <div class="page-content">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">💰</div>
                        <div class="stat-content">
                            <div class="stat-number">${bills.filter(b => b.status === 'paid').length}</div>
                            <div class="stat-label">Paid Bills</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">⏳</div>
                        <div class="stat-content">
                            <div class="stat-number">${bills.filter(b => b.status === 'pending').length}</div>
                            <div class="stat-label">Pending Bills</div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">📊</div>
                        <div class="stat-content">
                            <div class="stat-number">${formatCurrency(bills.filter(b => b.status === 'paid').reduce((sum, bill) => sum + bill.amount, 0))}</div>
                            <div class="stat-label">Total Collected</div>
                        </div>
                    </div>
                </div>

                <div class="content-section">
                    <div class="section-header">
                        <h2>Billing Records</h2>
                        <button class="btn btn-primary" onclick="alert('Add new bill functionality coming soon!')">+ Add New Bill</button>
                    </div>

                    <div class="data-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Bill ID</th>
                                    <th>Renter</th>
                                    <th>Room</th>
                                    <th>Amount</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${bills.map(bill => `
                                    <tr>
                                        <td>${bill.id}</td>
                                        <td>${bill.renterName}</td>
                                        <td>${bill.roomNumber}</td>
                                        <td>${formatCurrency(bill.amount)}</td>
                                        <td>${bill.dueDate}</td>
                                        <td>
                                            <span class="status-badge status-${bill.status}">
                                                ${bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                                            </span>
                                        </td>
                                        <td>
                                            <button class="btn btn-sm" onclick="alert('View bill details')">View</button>
                                            ${bill.status === 'pending' ? '<button class="btn btn-sm btn-success" onclick="alert(\'Mark as paid\')">Mark Paid</button>' : ''}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Set page content
    document.querySelector('.main-content').innerHTML = billingHTML;

    console.log('Billing page rendered');
}

// Global export for compatibility
window.renderBillingPage = renderBillingPage;
console.log('Billing module loaded, renderBillingPage assigned to window:', typeof window.renderBillingPage);