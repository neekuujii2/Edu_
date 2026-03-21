# New Email-Password Authentication System

## Changes Made

### 1. **Database Schema Updates** (`supabase/schema.sql`)
Added new columns to the `users` table:
- `password_hash` - Stores hashed password using bcrypt
- `otp_code` - Stores the current OTP
- `otp_expires_at` - Timestamp for OTP expiration
- `is_verified` - Boolean to track if email is verified
- `signup_method` - Tracks signup method (password/magic-link)

### 2. **New Utility Files**

#### `lib/email.ts`
- `sendOtpEmail()` - Sends OTP via SMTP
- `sendWelcomeEmail()` - Sends welcome email after verification
- Uses SMTP configuration from `.env.local`:
  - `SMTP_HOST=smtp.gmail.com`
  - `SMTP_PORT=587`
  - `EMAIL_USER=consultancyaspireeducation@gmail.com`
  - `EMAIL_PASS=yaunieiqdxjyxnmz`

#### `lib/crypto.ts`
- `hashPassword()` - Hashes password with bcrypt
- `verifyPassword()` - Verifies password against hash
- `generateOtp()` - Generates random 6-digit OTP
- `isOtpValid()` - Checks if OTP is still valid

### 3. **API Routes**

#### `/api/auth/signup` (POST)
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "message": "OTP sent to your email",
  "userId": "uuid"
}
```
- Creates user record with hashed password
- Generates and sends OTP via email
- OTP valid for 10 minutes

#### `/api/auth/verify-otp` (POST)
**Request:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```
**Response:**
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "userId": "uuid"
}
```
- Verifies OTP and email
- Marks user as verified
- Creates Supabase auth user

#### `/api/auth/login` (POST)
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": { "id": "uuid", "email": "email", "role": "student" },
  "token": "jwt_token"
}
```
- Validates email and password
- Returns JWT token for session management
- User must be verified to login

#### `/api/auth/admin-login` (POST)
**Request:**
```json
{
  "email": "consultancyaspireeducation@gmail.com",
  "password": "Aspire@123"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Admin login successful",
  "user": { "email": "email", "role": "admin" }
}
```
- Checks admin credentials from `.env.local`:
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`

#### `/api/auth/resend-otp` (POST)
**Request:**
```json
{
  "email": "user@example.com"
}
```
**Response:**
```json
{
  "success": true,
  "message": "New OTP sent to your email"
}
```
- Generates and sends new OTP to user

### 4. **Updated Components**

#### `components/auth-card.tsx`
New UI flow with multiple steps:
- **Login/Signup**: Initial screen with login and sign up options
- **Signup**: Email and password input
- **OTP Verify**: 6-digit OTP input with resend option
- **Admin Login**: Separate admin login with email and password

### 5. **Updated Dependencies** (`package.json`)
Added:
- `bcryptjs` - Password hashing
- `nodemailer` - SMTP email sending
- `jsonwebtoken` - JWT token generation
- `uuid` - Generate unique IDs
- Type definitions for all above

### 6. **Updated Auth Utils** (`lib/auth.ts`)
- Modified `requireAdmin()` to check admin token instead of Supabase auth
- Added `validateAdminPassword()` for admin authentication

## User Flow

### For Regular Users:
1. **Sign Up**: User enters email and password
2. **OTP Verification**: User receives 6-digit OTP via email
   - OTP valid for 10 minutes
   - Can resend OTP anytime
3. **Login**: User logs in with email and password going forward
4. **Access**: Logout and relogin multiple times with saved password

### For Admin:
1. **Admin Login**: Use email from `ADMIN_EMAIL` and password from `ADMIN_PASSWORD` (.env.local)
2. **Access Admin Panel**: Redirects to `/admin` page

## Environment Variables Required

```
# Email/SMTP Configuration (Already in .env.local)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_USER=consultancyaspireeducation@gmail.com
EMAIL_PASS=yaunieiqdxjyxnmz

# Admin Configuration (Already in .env.local)
ADMIN_EMAIL=consultancyaspireeducation@gmail.com
ADMIN_PASSWORD=Aspire@123
```

## Important Notes

1. **Database Migration Required**: Run the updated SQL schema in Supabase
2. **Dependencies**: Run `npm install` after updating package.json
3. **Email Testing**: Check spam folder if OTP emails not received
4. **OTP Expiration**: Set to 10 minutes (configurable in code)
5. **Password Requirements**: Minimum 6 characters (configurable)
6. **Admin Login**: Only one admin user via environment variables

## Testing

### Local Testing:
1. Signup with valid email and password
2. Check email for OTP (might be in spam)
3. Enter OTP to verify
4. Login with email and password
5. Use ADMIN_EMAIL and ADMIN_PASSWORD for admin login

### Production Considerations:
1. Use environment-specific SMTP credentials
2. Increase OTP expiration for longer delays
3. Add rate limiting to prevent OTP brute force
4. Use stronger password requirements
5. Consider two-factor authentication for admin
