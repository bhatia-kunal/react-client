import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
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
  Home,
} from './pages';
import theme from './theme';

// if (localStorage.jwtToken) {
//   const decoded = jwt_decode(localStorage.jwtToken);
//   console.log(decoded.expiry); // undefined
//   // const currentTime = Date.now() / 1000;
//   // if (decoded.exp < currentTime) {
//   //   window.location.href = '/login';
//   // }
// }

const App = () => (
  <>
    <CssBaseline />
    <SnackBarProvider>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Switch>
            <PrivateRoute path="/" component={Home} />
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
