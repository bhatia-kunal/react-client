import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Trainee, NavBar, Login } from './pages';
import theme from './theme';

const App = () => (
  <>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <NavBar />
      <Trainee />
      <Login />
    </MuiThemeProvider>
  </>
);

export default App;
