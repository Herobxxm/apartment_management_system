// Login Page Module - Generates login UI dynamically

function renderLoginPage() {
    // Create login page styles
    const loginStyles = `
        body {
            background: linear-gradient(135deg, #2563eb 0%, #0891b2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .login-wrapper {
            background: white;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 450px;
            padding: 40px;
        }
        .login-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .login-header h1 {
            margin: 0 0 10px 0;
            color: #333;
            font-size: 28px;
        }
        .login-header p {
            color: #666;
            font-size: 14px;
            margin: 0;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            margin-bottom: 6px;
            color: #333;
            font-weight: 600;
            font-size: 14px;
        }
        .form-group input {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            box-sizing: border-box;
            transition: border-color 0.3s;
        }
        .form-group input:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .login-button {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #2563eb 0%, #0891b2 100%);
            color: white;
            border: none;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.2s;
        }
        .login-button:hover {
            transform: translateY(-2px);
        }
        .login-button:active {
            transform: translateY(0);
        }
        .login-error {
            padding: 12px;
            background: #f5f5f5;
            border-left: 4px solid #ddd;
            border-radius: 4px;
            margin-bottom: 20px;
            font-size: 14px;
            display: none;
        }
        .demo-info {
            background: #f0f4ff;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            margin-top: 25px;
            font-size: 13px;
            color: #333;
        }
        .demo-info b {
            display: block;
            margin-bottom: 10px;
            color: #2563eb;
        }
        .demo-credential {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
            padding: 6px;
            background: white;
            border-radius: 3px;
        }
        .demo-user { font-weight: 600; }
        .demo-pass { color: #666; }
    `;

    // Add styles to document
    const styleSheet = document.createElement('style');
    styleSheet.setAttribute('data-page', 'login');
    styleSheet.textContent = loginStyles;
    document.head.appendChild(styleSheet);

    // Create login page HTML
    const loginHTML = `
        <div class="login-wrapper">
            <div class="login-header">
                <h1>🏢 PPApartment</h1>
                <p>Renter Management System</p>
            </div>

            <div class="login-error" id="login-error"></div>

            <form id="login-form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter username" required>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter password" required>
                </div>

                <button type="submit" class="login-button">Login</button>
            </form>

            <div class="demo-info">
                <b>📝 Demo Credentials:</b>
                <div class="demo-credential">
                    <span class="demo-user">admin</span>
                    <span class="demo-pass">admin123</span>
                    <span style="font-size:11px;color:#666;margin-left:8px;">(Full Access)</span>
                </div>
                <div class="demo-credential">
                    <span class="demo-user">manager</span>
                    <span class="demo-pass">manager123</span>
                    <span style="font-size:11px;color:#666;margin-left:8px;">(Manager)</span>
                </div>
                <div class="demo-credential">
                    <span class="demo-user">user</span>
                    <span class="demo-pass">user123</span>
                    <span style="font-size:11px;color:#666;margin-left:8px;">(Limited)</span>
                </div>
                <div class="demo-credential">
                    <span class="demo-user">demo</span>
                    <span class="demo-pass">demo123</span>
                    <span style="font-size:11px;color:#666;margin-left:8px;">(Read-only)</span>
                </div>
            </div>
        </div>
    `;

    // Set page content
    const appContainer = document.getElementById('app');
    if (appContainer) {
        appContainer.innerHTML = loginHTML;
    } else {
        document.body.innerHTML = loginHTML;
    }

    // Setup login functionality
    setupLoginLogic();
}

function setupLoginLogic() {
    // If already logged in, redirect to main app shell
    if (typeof isLoggedIn === 'function' && isLoggedIn()) {
        window.location.hash = 'main';
        return;
    }

    // Setup login form
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorDiv = document.getElementById('login-error');

        // Validate input
        if (!username || !password) {
            if (errorDiv) {
                errorDiv.textContent = '⚠️ Please enter both username and password';
                errorDiv.style.color = '#ff9800';
                errorDiv.style.display = 'block';
            }
            return;
        }

        // Clear previous errors
        if (errorDiv) errorDiv.style.display = 'none';

        // Mock login with localStorage
        const user = login(username, password);

        if (user) {
            // Success - show message then redirect
            if (errorDiv) {
                errorDiv.textContent = '✓ Login successful! Redirecting...';
                errorDiv.style.color = '#4caf50';
                errorDiv.style.display = 'block';
            }
            setTimeout(() => {
                // Redirect to main app shell using hash navigation
                window.location.hash = 'main';
            }, 800);
        } else {
            // Failed login
            if (errorDiv) {
                errorDiv.textContent = '❌ Invalid username or password!';
                errorDiv.style.color = '#f44336';
                errorDiv.style.display = 'block';
            }
        }
    });
}

// Global export for compatibility
window.renderLoginPage = renderLoginPage;
