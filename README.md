# NDDC Connect Hub

Official digital gateway for the Niger Delta Development Commission - A modern web portal for submitting proposals, reports, requests, and feedback.

## Features

- 📝 **Submission Portal** - Submit proposals, reports, requests, and complaints
- ✉️ **Email Verification** - Secure OTP-based email verification
- 📊 **Dashboard** - Track and manage all submissions
- 🔍 **Tracking System** - Real-time status tracking with timeline
- 📄 **Acknowledgement** - Downloadable/printable submission receipts
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Language:** TypeScript
- **Deployment:** Vercel

## Project Structure

```
nddc-connect-hub/
├── app/
│   ├── layout.tsx          # Root layout with Navigation & Footer
│   ├── page.tsx            # Landing page with submission form
│   ├── globals.css         # Global styles & Tailwind imports
│   ├── verify/
│   │   └── page.tsx        # Email OTP verification
│   ├── success/
│   │   └── page.tsx        # Submission success page
│   ├── dashboard/
│   │   └── page.tsx        # User submissions dashboard
│   ├── acknowledgement/
│   │   └── page.tsx        # PDF acknowledgement view
│   └── track/
│       └── page.tsx        # Submission tracking page
├── components/
│   ├── NDDCLogo.tsx        # NDDC logo component
│   ├── Navigation.tsx      # Header navigation
│   ├── Footer.tsx          # Footer component
│   ├── StatusBadge.tsx     # Status indicator badges
│   ├── SubmissionForm.tsx  # Main submission form
│   └── index.ts            # Component exports
├── lib/
│   └── types.ts            # TypeScript type definitions
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository or download the files

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Run deployment:
```bash
vercel
```

3. Follow the prompts to link/create your project

### Option 2: Deploy via GitHub

1. Push your code to a GitHub repository

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "New Project" and import your repository

4. Vercel will auto-detect Next.js settings

5. Click "Deploy"

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)

2. Upload your project folder

3. Vercel will handle the rest

## Environment Variables

For production, you may want to add these environment variables in Vercel:

```env
# Optional: Custom API endpoints
NEXT_PUBLIC_API_URL=https://api.nddc.gov.ng

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-ga-id
```

## Pages Overview

| Route | Description |
|-------|-------------|
| `/` | Landing page with submission form |
| `/verify` | Email OTP verification |
| `/success` | Submission confirmation with tracking ID |
| `/dashboard` | User's submission management |
| `/acknowledgement` | PDF acknowledgement view/download |
| `/track` | Public submission tracking |

## Customization

### Branding Colors

Edit `tailwind.config.js` to customize the color scheme. The default uses emerald green as the primary color.

### Logo

Replace the logo URL in `components/NDDCLogo.tsx` with your own hosted logo.

### Fonts

The project uses:
- **Fraunces** - Display/heading font
- **DM Sans** - Body text font

These are loaded via Google Fonts in `app/globals.css`.

## License

This project is proprietary software developed for the Niger Delta Development Commission.

## Support

For technical support, contact the development team at [support@nddc.gov.ng](mailto:support@nddc.gov.ng).
