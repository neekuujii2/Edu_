#!/bin/bash

# Installation and Setup Guide

# 1. Install dependencies
echo "Installing dependencies..."
npm install

# 2. Update environment variables (if needed)
echo "Environment variables already configured in .env.local"
echo "Verify these are set:"
echo "  - SMTP_HOST=smtp.gmail.com"
echo "  - SMTP_PORT=587"
echo "  - EMAIL_USER=consultancyaspireeducation@gmail.com"
echo "  - EMAIL_PASS=yaunieiqdxjyxnmz"
echo "  - ADMIN_EMAIL=consultancyaspireeducation@gmail.com"
echo "  - ADMIN_PASSWORD=Aspire@123"

# 3. Update Supabase Database Schema
echo ""
echo "Next steps:"
echo "1. Go to Supabase Dashboard"
echo "2. Navigate to SQL Editor"
echo "3. Run the updated migration from: supabase/schema.sql"
echo "4. Pay special attention to the new columns in users table"

# 4. Start the development server
echo ""
echo "Starting development server..."
npm run dev

echo ""
echo "Authentication system ready!"
echo "Visit: http://localhost:3000/auth"
