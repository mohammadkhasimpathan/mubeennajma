# Shaik Mubeen Najma - Portfolio

A premium, production-ready personal portfolio website built with React 19, Vite, TypeScript, and Tailwind CSS. The portfolio features a futuristic dark-mode aesthetic with custom glassmorphism, Framer Motion animations, Three.js 3D elements, and a CMS-like data architecture using JSON.

## Features

- **Performance First**: Optimized with Vite code splitting, lazy loading, and asset caching.
- **CMS-like Architecture**: All content is driven by JSON files in `src/data/`, making it easy to update without touching code.
- **Dynamic Markdown Blog**: Write blog posts in Markdown (`public/content/blog/`) with built-in syntax highlighting.
- **Command Palette**: Press `Ctrl + K` or `Cmd + K` for instant site navigation.
- **PWA Support**: Installable as a Progressive Web App with offline caching via Workbox.
- **SEO Optimized**: Includes `sitemap.xml`, `robots.txt`, OpenGraph meta tags, and structured JSON-LD data.
- **EmailJS Integration**: Fully functional contact form without a backend.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion, GSAP
- **3D Graphics**: Three.js (@react-three/fiber, @react-three/drei)
- **Icons**: React Icons, Lucide React
- **Markdown**: React Markdown, Remark GFM, React Syntax Highlighter
- **Forms**: React Hook Form, EmailJS
- **Routing**: React Router DOM

## Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env` and fill in your EmailJS and Google Analytics credentials:
   ```bash
   cp .env.example .env
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Customization (CMS)

All content is managed via JSON files in the `src/data/` directory:

- `profile.json`: Personal details, social links, stats.
- `projects.json`: Portfolio projects and case studies.
- `skills.json`: Technical skills and proficiency levels.
- `experience.json`: Career timeline and internships.
- `education.json`: Academic background.
- `blogs.json`: Blog post metadata (actual content goes in `public/content/blog/`).
- `certificates.json`: Certifications.
- `hackathons.json`: Hackathon participation.

## Deployment on Render (Free Tier)

This repository is pre-configured for seamless deployment as a **Static Site** on [Render](https://render.com).

### Instructions:

1. Push your repository to GitHub.
2. Log into Render and create a new **Static Site**.
3. Connect your GitHub repository.
4. Render will automatically detect the `render.yaml` configuration.
5. If setting up manually, use the following settings:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
6. Add your environment variables (from `.env`) in the Render dashboard.

The deployment includes an `_redirects` file to handle React Router SPA routing natively on Render.
