 # Authentication System Testing Checklist

## Pre-Testing Setup

- [ ] `npm install` completed successfully
- [ ] All dependencies installed (bcryptjs, nodemailer, uuid, jsonwebtoken)
- [ ] .env.local file has all required SMTP and admin credentials
- [ ] Supabase database schema updated with new columns
- [ ] Development server running (`npm run dev`)

## 1. User Signup Flow

### Basic Signup
- [ ] Navigate to `/auth`
- [ ] Click "Create New Account"
- [ ] Enter email and password (6+ characters)
- [ ] Submit signup form
- [ ] Should see message "OTP sent to your email"
- [ ] Check email inbox for OTP (may be in spam folder)

### Duplicate Signup
- [ ] Try signing up with same email
- [ ] Should see error "User already exists"

### Password Validation
- [ ] Try signup with password < 6 characters
- [ ] Should see error about password length

## 2. OTP Verification Flow

### Valid OTP
- [ ] After signup, receive 6-digit OTP in email
- [ ] Enter OTP in verification form
- [ ] Should see "✓ Email verified! You can now log in."
- [ ] Should be redirected back to login

### Invalid OTP
- [ ] Enter wrong OTP
- [ ] Should see error "Invalid OTP"

### Expired OTP
- [ ] Wait more than 10 minutes
- [ ] Try to verify with old OTP
- [ ] Should see error "OTP has expired"

### Resend OTP
- [ ] In OTP verification step, click "Resend OTP"
- [ ] Should receive new OTP in email
- [ ] Old OTP should not work anymore
- [ ] New OTP should be valid

## 3. User Login Flow

### Valid Credentials
- [ ] Go to login screen
- [ ] Enter verified user email and password
- [ ] Should see "Login successful"
- [ ] Should be redirected to home page (/ or specified redirect)
- [ ] Local storage should have auth token

### Invalid Email
- [ ] Enter non-existent email
- [ ] Should see "Invalid email or password"

### Invalid Password
- [ ] Enter correct email with wrong password
- [ ] Should see "Invalid email or password"

### Unverified User
- [ ] Create user but don't verify OTP
- [ ] Try to login
- [ ] Should see "Please verify your email first"

## 4. Admin Login Flow

### Valid Admin Credentials
- [ ] Click "Admin Login" toggle on login page
- [ ] Enter ADMIN_EMAIL: `consultancyaspireeducation@gmail.com`
- [ ] Enter ADMIN_PASSWORD: `Aspire@123`
- [ ] Should redirect to `/admin` page
- [ ] Should have admin access

### Invalid Admin Email
- [ ] Enter different email with correct password
- [ ] Should see "Invalid admin credentials"

### Invalid Admin Password
- [ ] Enter correct admin email with wrong password
- [ ] Should see "Invalid admin credentials"

## 5. Session Management

### Token Storage
- [ ] After successful login, check localStorage for `auth_token`
- [ ] Token should be valid JWT

### Multiple Logins
- [ ] User logs in
- [ ] User logs out
- [ ] User logs in again with same credentials
- [ ] Should work without issues

### Token Expiration
- [ ] Token expires after 7 days (configurable)
- [ ] User should be able to login again

## 6. Email Testing

### OTP Email Format
- [ ] Check email contains:
  - [ ] 6-digit OTP clearly visible
  - [ ] Email verification message
  - [ ] Expiration time (10 minutes)
  - [ ] Professional formatting

### Welcome Email
- [ ] After OTP verification, check for welcome email
- [ ] Should contain welcome message with user name

### Spam Folder
- [ ] If emails not in inbox, check spam/promotions
- [ ] Configure email filters if needed

## 7. Error Handling

### Network Errors
- [ ] Disconnect internet during signup
- [ ] Should show appropriate error message
- [ ] Reconnect and retry should work

### Server Errors
- [ ] Check console for any error messages
- [ ] Server should handle errors gracefully

## 8. UI/UX Testing

### Form Validation
- [ ] Empty fields show required message
- [ ] Invalid email format shows error
- [ ] OTP field only accepts 6 digits

### Button States
- [ ] Buttons disabled during API calls
- [ ] Shows loading text ("Creating account...", etc.)
- [ ] Re-enables after completion

### Navigation
- [ ] "Back to Login" button works
- [ ] "Back" button in OTP step works
- [ ] "Sign Up" link appears on login page
- [ ] "Admin Login" toggle works

## 9. Database Checks

### User Record
In Supabase, verify user table has:
- [ ] `id` - UUID
- [ ] `email` - User email
- [ ] `password_hash` - Hashed password
- [ ] `otp_code` - Current OTP or null
- [ ] `otp_expires_at` - OTP expiration time or null
- [ ] `is_verified` - Boolean (true after verification)
- [ ] `signup_method` - "password"
- [ ] `role` - "student" (default)

## 10. Integration Tests

### Inquiry Form
- [ ] User can submit inquiry after login
- [ ] Inquiry is recorded with user info

### Testimonial Form
- [ ] User can submit testimonial after login
- [ ] Testimonial is recorded with user info

### Admin Dashboard
- [ ] Admin can view leads
- [ ] Admin can view testimonials
- [ ] Admin can manage users

## Known Issues & Fixes

### OTP Not Received
- **Cause**: Email blocked by spam filter
- **Fix**: Check spam/promotions folder
- **Alternative**: Use resend OTP or test email

### Password Not Hashing Properly
- **Cause**: bcryptjs not installed
- **Fix**: Run `npm install bcryptjs`

### Email Not Sending
- **Cause**: SMTP credentials wrong or Gmail 2FA enabled
- **Fix**: Use app-specific password for Gmail

### Admin Login Not Working
- **Cause**: Environment variables not set
- **Fix**: Verify .env.local has ADMIN_EMAIL and ADMIN_PASSWORD

## Performance Testing

- [ ] Signup completes in < 2 seconds
- [ ] OTP verification completes in < 1 second
- [ ] Login completes in < 1 second
- [ ] Email sent within 5 seconds

## Security Testing

- [ ] Passwords are hashed (not stored as plain text)
- [ ] OTP is 6 digits (6+ bits of entropy per digit)
- [ ] OTP expires after 10 minutes
- [ ] Admin password not exposed in logs
- [ ] Tokens validated on sensitive operations

## Documentation

- [ ] README updated with new auth flow
- [ ] API documentation complete
- [ ] User guide available
- [ ] Admin guide available
