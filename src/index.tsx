import { SnackbarProvider } from 'notistack';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { AppProvider } from '@/shared/services';

import App from './app.tsx';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <App />
      </SnackbarProvider>
    </AppProvider>
  </React.StrictMode>,
);
