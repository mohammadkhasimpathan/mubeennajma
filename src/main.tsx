import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// Initialize Google Analytics if configured
const gaId = import.meta.env.VITE_GA_ID;
if (gaId && typeof window !== 'undefined') {
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  script.async = true;
  document.head.appendChild(script);

  (window as unknown as { dataLayer: unknown[] }).dataLayer =
    (window as unknown as { dataLayer: unknown[] }).dataLayer || [];
  function gtag(..._args: unknown[]) {
    (window as unknown as { dataLayer: unknown[] }).dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', gaId);
}

const root = document.getElementById('root')!;
createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
