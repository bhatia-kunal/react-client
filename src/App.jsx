import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Trainee from './pages/Trainee/Trainee';
import theme from './theme';

const App = () => (
  <>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <Trainee />
    </MuiThemeProvider>
  </>
);

export default App;
