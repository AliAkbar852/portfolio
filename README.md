# Portfolio Website - Experimental Edition 🚀

A high-performance, motion-heavy personal portfolio website built with **Next.js 16**, **Tailwind CSS**, and **Framer Motion**.

## ✨ Features

- **Liquid Background Engine**: Animated, blurred blobs with `mix-blend-screen` that move organically.
- **Motion System**: 
  - **Quality Control**: Toggle between *Low*, *Standard*, and *Ultra* motion settings.
  - **Smart Parallax**: Mouse-driven parallax effects (Desktop only).
  - **Reduced Motion**: Respects system preferences and degrades gracefully.
- **Premium UX**:
  - **Shared Element Transitions**: Seamless image transitions from list to detail view.
  - **Micro-interactions**: 3D-style hover effects, radial glows, and magnetic buttons.
  - **Page Transitions**: Smooth exit/enter animations preventing layout shifts.
- **Theming**: Toggles between **Dark**, **Neon**, and **Aurora** themes.
- **CMS-ready Data**: All content is managed in `lib/data.ts` for easy updates.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Styling**: Tailwind CSS + CSS Variables
- **Animation**: Framer Motion 10
- **Icons**: Lucide React
- **Validation**: Zod + React Hook Form
- **Deployment**: Vercel / Netlify Ready (Standard Build)
