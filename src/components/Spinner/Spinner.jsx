import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit,
  },
});

function Spinner(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress size={24} className={classes.progress} />
    </div>
  );
}

Spinner.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};

export default withStyles(styles)(Spinner);
