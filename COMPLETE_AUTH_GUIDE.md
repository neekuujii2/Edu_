# Complete Authentication System Implementation Guide

## 🎯 Overview

This document provides a complete guide to the new email-password authentication system with OTP verification and admin password authentication.

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────┐
│            User Authentication              │
├─────────────────────────────────────────────┤
│                                             │
│  Signup Flow:                               │
│  Email + Password → Hash Password           │
│  → Generate OTP → Send via SMTP             │
│  → Store in Database → Send Email           │
│                                             │
│  OTP Verification Flow:                     │
│  User Input OTP → Verify OTP + Expiry      │
│  → Mark User Verified → Create Auth User   │
│                                             │
│  Login Flow:                                │
│  Email + Password → Verify Credentials      │
│  → Generate JWT Token → Set Session        │
│                                             │
│  Admin Auth Flow:                           │
│  Admin Email + Password → Verify from ENV   │
│  → Set Admin Session                       │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 📦 New Dependencies

Add these to `package.json` (already done):

```json
{
  "dependencies": {
    "bcryptjs": "^2.4.3",           // Password hashing
    "nodemailer": "^6.9.7",         // SMTP email
    "jsonwebtoken": "^9.1.2",       // JWT tokens
    "uuid": "^9.0.1"                // Unique IDs
  },
  "devDependencies": {
    "@types/bcryptjs": "^2.4.6",
    "@types/nodemailer": "^6.4.14",
    "@types/jsonwebtoken": "^9.0.7"
  }
}
```

---

## 🔐 Database Schema

### Users Table New Columns

```sql
-- Password Management
password_hash TEXT              -- Bcrypt hashed password

-- OTP Management  
otp_code TEXT                   -- Current 6-digit OTP
otp_expires_at TIMESTAMPTZ      -- OTP expiration time (10 min)

-- Verification
is_verified BOOLEAN             -- Email verified status
signup_method TEXT              -- 'password' or 'magic_link'
```

### Migration SQL (Already prepared in supabase/schema.sql)

```sql
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS password_hash text,
ADD COLUMN IF NOT EXISTS otp_code text,
ADD COLUMN IF NOT EXISTS otp_expires_at timestamptz,
ADD COLUMN IF NOT EXISTS is_verified boolean not null default false,
ADD COLUMN IF NOT EXISTS signup_method text default 'password';
```

---

## 🛠️ New Utility Files

### 1. lib/email.ts
Handles all email communications

```typescript
sendOtpEmail(email, otp)        // Send OTP to user email
sendWelcomeEmail(email, name)   // Send welcome after verification
```

**Email Configuration** (from .env.local):
- Host: smtp.gmail.com
- Port: 587 (TLS)
- User: consultancyaspireeducation@gmail.com
- Pass: yaunieiqdxjyxnmz

### 2. lib/crypto.ts
Handles password and OTP operations

```typescript
hashPassword(password)          // Hash with bcrypt (10 rounds)
verifyPassword(pwd, hash)       // Compare password with hash
generateOtp()                   // Generate random 6-digit OTP
isOtpValid(expiresAt)          // Check if OTP still valid
```

---

## 🌐 API Routes

### 1. POST /api/auth/signup

**Purpose**: Create new user account with password

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (Success)**:
```json
{
  "success": true,
  "message": "Signup successful. Check your email for OTP.",
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (Error)**:
```json
{
  "error": "User already exists" | "Password too short" | "Failed to create user"
}
```

**Process**:
1. Validate email and password
2. Check if user already exists
3. Hash password with bcrypt
4. Generate 6-digit OTP
5. Save user with password and OTP
6. Send OTP via SMTP email
7. Return success

**Error Handling**:
- 400: Invalid input or user exists
- 500: Server/email error

---

### 2. POST /api/auth/verify-otp

**Purpose**: Verify email with OTP and mark account as verified

**Request**:
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response (Success)**:
```json
{
  "success": true,
  "message": "OTP verified successfully. You can now log in.",
  "userId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (Error)**:
```json
{
  "error": "Invalid OTP" | "OTP has expired" | "User not found"
}
```

**Process**:
1. Find user by email
2. Validate OTP matches
3. Check OTP hasn't expired (10 min)
4. Mark user as verified
5. Clear OTP from database
6. Create Supabase auth user
7. Send welcome email

**Error Handling**:
- 404: User not found
- 400: Invalid or expired OTP
- 500: Verification failed

---

### 3. POST /api/auth/login

**Purpose**: Authenticate user with email and password

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (Success)**:
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "role": "student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error)**:
```json
{
  "error": "Invalid email or password" | "Please verify your email first"
}
```

**Process**:
1. Find user by email
2. Check if user is verified
3. Verify password against hash
4. Generate JWT token (7-day expiry)
5. Return user info and token
6. Token stored in localStorage

**Token Contents**:
```json
{
  "user_id": "uuid",
  "email": "email",
  "role": "role",
  "iat": 1234567890,
  "exp": 1234654290
}
```

**Error Handling**:
- 401: Invalid credentials or unverified
- 404: User not found
- 500: Server error

---

### 4. POST /api/auth/admin-login

**Purpose**: Authenticate admin with credentials from environment

**Request**:
```json
{
  "email": "consultancyaspireeducation@gmail.com",
  "password": "Aspire@123"
}
```

**Response (Success)**:
```json
{
  "success": true,
  "message": "Admin login successful",
  "user": {
    "email": "consultancyaspireeducation@gmail.com",
    "role": "admin"
  }
}
```

**Response (Error)**:
```json
{
  "error": "Invalid admin credentials"
}
```

**Credentials** (from .env.local):
- Email: ADMIN_EMAIL
- Password: ADMIN_PASSWORD

**Process**:
1. Get admin credentials from environment
2. Verify email matches ADMIN_EMAIL
3. Verify password matches ADMIN_PASSWORD
4. Return success or error

**Note**: Only one admin can login (hardcoded in .env)

---

### 5. POST /api/auth/resend-otp

**Purpose**: Send new OTP to user (for lost or expired OTP)

**Request**:
```json
{
  "email": "user@example.com"
}
```

**Response (Success)**:
```json
{
  "success": true,
  "message": "New OTP sent to your email."
}
```

**Response (Error)**:
```json
{
  "error": "User not found" | "Failed to send OTP email"
}
```

**Process**:
1. Find user by email
2. Generate new OTP
3. Update OTP in database (new 10-minute expiry)
4. Send new OTP via email
5. Return success

---

## 🎨 Frontend Components

### Updated: components/auth-card.tsx

**Multiple Steps**:
1. **Login/Signup Screen** (default)
   - Login form (email + password)
   - "Create New Account" button
   - "Admin Login" toggle

2. **Signup Screen**
   - Email input (required)
   - Password input (6+ characters)
   - Submit Signup button
   - Back to Login link

3. **OTP Verification Screen**
   - Email display
   - 6-digit OTP input
   - Submit OTP button
   - Resend OTP button
   - Back button

4. **Admin Login Screen**
   - Email input (pre-filled with ADMIN_EMAIL)
   - Password input
   - Submit button

**Features**:
- State management with useState
- Loading states on buttons
- Error message display
- Success message display
- Form validation
- LocalStorage token management
- Auto-redirect after actions

---

## 🔄 User Journey

### New User Registration

```
1. User visits /auth
   ↓
2. Clicks "Create New Account"
   ↓
3. Enters email & password (6+ chars)
   ↓
4. Submits signup
   API: POST /api/auth/signup
   ↓
5. Email sent with 6-digit OTP
   (OTP valid for 10 minutes)
   ↓
6. User enters OTP
   API: POST /api/auth/verify-otp
   ↓
7. Email verified, account activated
   ↓
8. Can now login with email & password
   API: POST /api/auth/login
   ↓
9. Token stored in localStorage
   ↓
10. Redirected to home or /admin (if admin)
```

### Returning User Login

```
1. User visits /auth
   ↓
2. Enters email & password
   ↓
3. Submits login
   API: POST /api/auth/login
   ↓
4. Credentials verified
   ↓
5. JWT token generated (7-day expiry)
   ↓
6. Token stored in localStorage
   ↓
7. Redirected to dashboard/home
```

### Admin Login

```
1. User visits /auth
   ↓
2. Clicks "Admin Login" toggle
   ↓
3. Enters admin email & ADMIN_PASSWORD
   API: POST /api/auth/admin-login
   ↓
4. Credentials verified against .env
   ↓
5. Redirected to /admin
```

---

## 🔒 Security Features

1. **Password Hashing**
   - BCryptjs with 10 salt rounds
   - Never stored as plain text
   - Verified on login

2. **OTP Security**
   - 6-digit random number (1 million combinations)
   - 10-minute expiration
   - One-time use only
   - Server-side validation

3. **Session Management**
   - JWT tokens with 7-day expiry
   - Unique per user per login
   - Stored in localStorage (accessible to JS only)

4. **Admin Security**
   - Password stored in .env (not in code)
   - Email/password combo required
   - Only one admin account

5. **Email Verification**
   - Email required to signup
   - OTP verification before account active
   - Cannot login without verification

---

## ⚙️ Environment Variables

### SMTP Configuration (Required for email)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=consultancyaspireeducation@gmail.com
EMAIL_PASS=yaunieiqdxjyxnmz
```

### Admin Configuration (Required)

```env
ADMIN_EMAIL=consultancyaspireeducation@gmail.com
ADMIN_PASSWORD=Aspire@123
```

### Supabase Configuration (Already exists)

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

---

## 🚀 Deployment Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Update Database Schema**
   - Login to Supabase Dashboard
   - Go to SQL Editor
   - Copy entire `supabase/schema.sql`
   - Execute in Supabase

3. **Verify Environment Variables**
   - Check .env.local has all variables
   - Verify SMTP credentials work
   - Test admin credentials

4. **Build Application**
   ```bash
   npm run build
   ```

5. **Start Server**
   ```bash
   npm run start
   ```

6. **Test Authentication**
   - Signup new account
   - Verify email with OTP
   - Login with email + password
   - Test admin login

---

## 🧪 Testing Scenarios

### Scenario 1: New User Signup
**Expected**: User creates account, receives OTP, verifies, can login

### Scenario 2: Duplicate Email
**Expected**: Error message "User already exists"

### Scenario 3: Weak Password
**Expected**: Error message about password length

### Scenario 4: Expired OTP
**Expected**: Error message "OTP has expired"

### Scenario 5: Invalid OTP
**Expected**: Error message "Invalid OTP"

### Scenario 6: Wrong Password
**Expected**: Error message "Invalid email or password"

### Scenario 7: Unverified Account
**Expected**: Error message "Please verify your email first"

### Scenario 8: Admin Login
**Expected**: Redirects to /admin page

---

## 📋 Checklist Before Going Live

- [ ] npm install completed
- [ ] Supabase schema updated
- [ ] SMTP credentials verified
- [ ] Admin credentials set
- [ ] Build succeeds without errors
- [ ] Signup workflow tested
- [ ] OTP email verification tested
- [ ] Login workflow tested
- [ ] Admin login tested
- [ ] Password reset considered (add if needed)
- [ ] Rate limiting considered (add if needed)
- [ ] Email templates customized
- [ ] Error messages user-friendly

---

## 🐛 Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| OTP not received | Spam filter | Check spam folder |
| Email not sending | SMTP credentials wrong | Verify in .env.local |
| Login fails | Password mismatch | Ensure password typed correctly |
| Admin login fails | Wrong credentials | Verify ADMIN_EMAIL and ADMIN_PASSWORD |
| Signup error | Duplicate email | Use different email |
| OTP expired | Waited > 10 min | Click Resend OTP |
| Module not found | Dependencies missing | Run npm install |

---

## 📞 Support

For issues:
1. Check TESTING_CHECKLIST.md
2. Check error messages in console
3. Verify .env.local configuration
4. Review database schema
5. Check email spam folder

---

## 📝 Version History

**v1.0** - Initial implementation (March 2026)
- Email-password signup
- OTP verification via SMTP
- Password-based login
- Admin password authentication
- Multi-step auth UI

---

## 🎯 Future Enhancements

- [ ] Password reset functionality
- [ ] Password strength meter
- [ ] Rate limiting on login/signup
- [ ] Email verification resend limits
- [ ] Social login (Google, GitHub)
- [ ] Two-factor authentication
- [ ] Session management UI
- [ ] Account recovery options
- [ ] Email templates customization
- [ ] Audit logging

---

**Last Updated**: March 19, 2026  
**Status**: Ready for Production
