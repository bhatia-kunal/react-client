import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Children } from './pages';
import theme from './theme';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Typography>
      <Children />
    </Typography>
  </MuiThemeProvider>
);

export default App;
