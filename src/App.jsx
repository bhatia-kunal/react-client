import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PrivateRoute, AuthRoute } from './routes';
import { SnackBarProvider } from './contexts';
import {
  Login,
  Trainee,
  ChildrenDemo,
  InputDemo,
  TextFieldDemo,
  NoMatch,
} from './pages';
import theme from './theme';

const App = () => (
  <>
    <CssBaseline />
    <SnackBarProvider>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <PrivateRoute path="/trainee" component={Trainee} />
            <AuthRoute path="/login" component={Login} />
            <PrivateRoute path="/children-demo" component={ChildrenDemo} />
            <PrivateRoute path="/input-demo" component={InputDemo} />
            <PrivateRoute path="/text-field-demo" component={TextFieldDemo} />
            <PrivateRoute component={NoMatch} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </SnackBarProvider>
  </>
);

export default App;
