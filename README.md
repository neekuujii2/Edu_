# Aspire Education Consultancy

Production-ready Next.js 14 full-stack website for Aspire Education Consultancy with:

- Responsive SaaS marketing site
- Supabase Auth with email OTP
- Supabase PostgreSQL data storage
- Google Sheets sync for leads and testimonials
- Admin dashboard with analytics and approvals
- Vercel-ready App Router architecture

## Setup

1. Copy `.env.example` to `.env.local`.
2. Fill Supabase, SMTP, and Google Sheets credentials.
3. Run the SQL in `supabase/schema.sql`.
4. Install dependencies with `npm install`.
5. Start locally with `npm run dev`.

## Notes

- Set your Supabase project's email auth to use SMTP with your Gmail app password.
- Configure the site URL and auth redirect URL in Supabase to match your Vercel domain.
- Create `Leads` and `Testimonials` tabs in your Google Sheet before using sync.
