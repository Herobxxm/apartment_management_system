#!/bin/bash

# Script to create the directory structure for the docflow-ai project

echo "Creating directory structure for docflow-ai..."

# Create main directories
mkdir -p api
mkdir -p data
mkdir -p pages

# Create subdirectories if needed
mkdir -p api/routes
mkdir -p api/middleware
mkdir -p data/uploads
mkdir -p data/exports

echo "Directory structure created successfully!"
echo ""
echo "Project structure:"
echo "├── api/           # API routes and middleware"
echo "├── data/          # Data storage and uploads"
echo "├── pages/         # JavaScript page modules"
echo "│   ├── auth.js    # Authentication utilities"
echo "│   ├── utils.js   # Shared utilities"
echo "│   ├── login/     # Login page module"
echo "│   │   └── login.js"
echo "│   └── home/      # Main application pages"
echo "│       ├── home.js            # App shell with header/sidebar"
echo "│       ├── dashboard/         # Dashboard section"
echo "│       │   └── dashboard.js"
echo "│       ├── billing/           # Billing management"
echo "│       │   └── billing.js"
echo "│       ├── room/              # Room management"
echo "│       │   └── room.js"
echo "│       ├── register/          # Renter registration"
echo "│       │   └── register.js"
echo "│       └── wifi/              # WiFi management"
echo "│           └── wifi.js"
echo "├── index.html     # Main SPA entry point"
echo "├── style.css      # Global styles"
echo "└── Makefile       # Build and development tasks"