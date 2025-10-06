import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.tsx';
import { AuthProvider } from '../src/Context/AuthContext.tsx';
import { ErrorBoundary } from '../src/Context/ErrorBoundary.tsx';
import { GlobalErrorProvider } from '../src/Context/GlobalErrorContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <GlobalErrorProvider>
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </GlobalErrorProvider>
    </ErrorBoundary>
  </StrictMode>
);
