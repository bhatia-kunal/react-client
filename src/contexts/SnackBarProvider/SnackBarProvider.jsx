import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import styles from './style';

const SnackBarContext = React.createContext(() => console.log('SnackBar context'));

class SnackBarProvider extends Component {
  variantIcon = {
    success: CheckCircleIcon,
    error: ErrorIcon,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      status: '',
      message: '',
    };
  }

  handleOpen = (message, status) => {
    this.setState({
      open: true,
      message,
      status,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      message: '',
    });
  };

  render() {
    const {
      classes,
      children,
      ...other
    } = this.props;
    const { status, message, open } = this.state;
    const Icon = this.variantIcon[status];
    return (
      <SnackBarContext.Provider value={this.handleOpen}>
        {children}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={4000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            className={classNames(classes[status])}
            aria-describedby="client-snackbar"
            message={
              (
                <span id="client-snackbar" className={classes.message}>
                  <Icon className={classNames(classes.icon, classes.iconVariant)} />
                  {message}
                </span>
              )
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]}
            {...other}
          />
        </Snackbar>
      </SnackBarContext.Provider>
    );
  }
}

SnackBarProvider.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  children: PropTypes.node.isRequired,
};

export const SnackBarConsumer = SnackBarContext.Consumer;

export default withStyles(styles)(SnackBarProvider);
