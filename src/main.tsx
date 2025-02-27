import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import * as Sentry from '@sentry/react';
import { ToastContainer } from 'react-toastify';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import { env } from './lib/env';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

// Initialize Sentry
if (env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: env.VITE_SENTRY_DSN,
    environment: env.VITE_APP_ENV,
    enabled: env.VITE_APP_ENV === 'production',
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <App />
        <ToastContainer position="bottom-right" />
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);