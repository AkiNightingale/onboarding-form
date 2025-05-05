import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';

import { generalTheme } from '@/shared/general-theme';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={generalTheme}>
      <CssBaseline />

      {children}
    </ThemeProvider>
  );
};
