import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.tsx';
import { AuthProvider } from '../src/Context/AuthContext.tsx';
import { ErrorBoundary } from '../src/Context/ErrorBoundary.tsx';
import { GlobalErrorProvider } from '../src/Context/GlobalErrorContext.tsx';
import { store } from './stores/store'
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <GlobalErrorProvider>
          <BrowserRouter>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </BrowserRouter>
        </GlobalErrorProvider>
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
