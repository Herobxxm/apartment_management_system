// Dashboard Page Module - Generates dashboard UI dynamically
console.log('Dashboard module loading...');

function renderDashboardPage() {
    // dashboard is now the same as main; just delegate
    console.log('renderDashboardPage called - delegating to renderMainPage');
    if (typeof renderMainPage === 'function') {
        renderMainPage();
    }
}

// Global export for compatibility
window.renderDashboardPage = renderDashboardPage;
console.log('Dashboard module loaded, renderDashboardPage assigned to window:', typeof window.renderDashboardPage);
