import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing.unit * 3,
    position: 'relative',
    top: 0,
    alignItems: 'center',
  },
  heading: {
    margin: 0,
    fontSize: '4rem',
    fontWeight: 'normal',
    alignItems: 'center',
  },
  info: {
    fontSize: '1.3rem',
    color: '#666666',
  },
});

const NoMatch = ({ classes }) => (
  <main className={classes.main}>
    <p className={classes.heading}>Not Found</p>
    <p className={classes.info}>Seems like the page you are looking after does not exist.</p>
  </main>
);

NoMatch.propTypes = {
  classes: PropTypes.string.isRequired,
};

export default withStyles(styles)(NoMatch);
