import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';

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
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Trainee Portal
          </Typography>
          <Button color="inherit" size="small">Trainee</Button>
          <Button color="inherit" size="small">TextField Demo</Button>
          <Button color="inherit" size="small">Input Demo</Button>
          <Button color="inherit" size="small">Children Demo</Button>
          <Button color="inherit" size="small">
            <Person />
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.string,
};

NavBar.defaultProps = {
  classes: '',
};

export default withStyles(styles)(NavBar);