import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import { setAuthToken } from '../../../libs/utils';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


function NavBar(props) {
  const { classes } = props;

  const clearLocalStorage = () => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
  };
  console.log('Token', localStorage.jwtToken);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography style={{ textDecoration: 'none' }} component={Link} to="/" variant="h6" color="inherit" className={classes.grow}>
            Trainee Portal
          </Typography>
          <Button component={Link} to="/trainee" color="inherit" size="small">
              Trainee
          </Button>
          <Button component={Link} to="/text-field-demo" color="inherit" size="small">
            TextField Demo
          </Button>
          <Button component={Link} to="input-demo" color="inherit" size="small">
            Input Demo
          </Button>
          <Button component={Link} to="/children-demo" color="inherit" size="small">
            Children Demo
          </Button>
          <Button component={Link} to="/login" onClick={clearLocalStorage} color="inherit" size="small">
            <Person />
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(NavBar);
