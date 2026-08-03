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

### Method 1: The Quick Way (Using Blueprint)

Since the repository includes a `render.yaml` file, Render can automatically detect your settings and deploy it instantly as Infrastructure as Code.

1. Go to [Render.com](https://render.com/) and sign in with your GitHub account.
2. Click the **"New +"** button in the top right corner.
3. Select **"Blueprint"** from the dropdown menu.
4. Connect your GitHub account and select this repository.
5. Render will read the `render.yaml` file, detect that it's a Static Site, and automatically apply the build commands, publish directory, and routing rules.
6. Click **"Apply"** at the bottom of the screen.
7. **Important**: Once the Blueprint is created, go to the **Environment** tab in your Render dashboard and add your EmailJS and Google Analytics keys (from `.env`).

### Method 2: Manual Setup (Static Site)

1. Go to Render.com and click **"New +"** -> **"Static Site"**.
2. Select this repository.
3. Use the following settings:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Under **Advanced**, add your environment variables (`VITE_EMAILJS_SERVICE_ID`, etc.).
5. Click **Create Static Site**.

*Note: The deployment includes an `_redirects` file to handle React Router SPA routing natively on Render, preventing 404 errors on page refresh.*
