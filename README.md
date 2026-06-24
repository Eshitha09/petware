Petware — NZ's Magical Pet Universe

NZ's leading wholesale pet supplies platform, reimagined as an immersive, scroll-driven experience built with Next.js 14, Three.js, GSAP, and Lenis.

---

Overview

Petware Ltd is New Zealand's leading full-line wholesale pet supplier — serving pet retailers, groomers, vets, and specialists nationwide across dogs, cats, birds, fish, reptiles, and small animals.

This repository is the redesigned frontend: a living, animated pet universe where real photography, Three.js atmospheric effects, and scroll-driven storytelling replace a traditional product catalog website.

---

Tech Stack

- **Framework** — Next.js 14 (App Router)
- **Language** — TypeScript
- **Animation** — GSAP 3
- **Smooth Scroll** — Lenis
- **3D / WebGL** — Three.js
- **Auth** — NextAuth.js v4
- **Styling** — CSS Modules
- **Deployment** — Vercel

---

Getting Started

Prerequisites

- Node.js 18+
- npm or yarn

Installation

```bash
git clone https://github.com/Eshitha09/petware.git
cd petware
npm install
```

Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in the required values — see `.env.local.example` for the full list.

Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for Production

```bash
npm run build
npm run start
```

---

Project Structure
petware/

├── app/                  # Next.js App Router pages and layouts

├── components/           # Reusable React components

├── lib/                  # Utility functions and helpers

├── middleware.ts         # NextAuth route protection

├── .env.local.example

├── next.config.mjs

├── vercel.json

└── tsconfig.json


---

Deployment

Configured for Vercel via `vercel.json`. Add all environment variables from `.env.local` in your Vercel project under **Settings → Environment Variables**, then deploy:

```bash
vercel --prod
```

---

Contact

**Petware Ltd**  
📞 0800 800 135  
📧 petware@petware.co.nz  

© 2026 Petware Ltd. All rights reserved.
