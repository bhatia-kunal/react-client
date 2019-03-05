import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing.unit * 3,
    marginLeft: '40%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'end',
    alignItems: 'center',
  },
  info: {
    fontSize: '1.3rem',
    color: '#666666',
  },
});

const date = ` ${new Date().getFullYear()}`;
const Footer = ({ classes }) => (
  <footer className={classes.main}>
    <p className={classes.info}>
      &copy;
      Successive Technologies
      {date}
    </p>
  </footer>
);

Footer.propTypes = {
  classes: PropTypes.string.isRequired,
};

export default withStyles(styles)(Footer);
