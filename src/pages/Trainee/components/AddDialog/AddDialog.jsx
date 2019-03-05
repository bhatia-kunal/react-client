import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Grid,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import Person from '@material-ui/icons/Person';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import TextField from '@material-ui/core/TextField';

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  classes: PropTypes.string,
};

const defaultProps = {
  open: false,
  onSubmit: () => {},
  classes: '',
};

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
});

class AddDialog extends Component {
  schema = Yup.object().shape({
    name: Yup
      .string()
      .required()
      .label('Name'),
    email: Yup
      .string().email()
      .required()
      .label('Email'),
    password: Yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Min 8 characters and must contain at least one lowercase letter, one uppercase and a number.')
      .required().label('Password'),
    confirmPassword: Yup
      .string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  fieldTouched = {}

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      touched: {},
    };
  }

  handleErrors = () => {
    const parsedErrors = {};
    const {
      name,
      email,
      password,
      confirmPassword,
    } = this.state;
    this.schema.validate({
      name,
      email,
      password,
      confirmPassword,
    }, { abortEarly: false })
      .then(() => {
        this.setState({
          errors: {},
        });
      })
      .catch((error) => {
        error.inner.forEach((element) => {
          parsedErrors[element.path] = element.path ? element.message : '';
        });
        this.setState({
          errors: parsedErrors,
        });
      });
  }

  isTouched = () => {
    const { touched } = this.state;
    return !!Object.keys(touched).length;
  }

  getError = (Field) => {
    const { errors, touched } = this.state;
    if (touched[Field]) {
      return errors[Field];
    }
    return '';
  }

  hasError = () => {
    const { errors } = this.state;
    return !!Object.keys(errors).length;
  }

  handleOnChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    }, () => this.handleErrors());
  }

  handleBlur = Field => () => {
    this.handleErrors();
    this.fieldTouched[Field] = true;
    this.setState({
      touched: this.fieldTouched,
    });
  }

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { name, email, password } = this.state;
    onSubmit({ name, email, password });
    this.setState = ({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      touched: {},
    });
  }

  render() {
    const {
      classes,
      onClose,
      onSubmit,
      ...other
    } = this.props;
    const {
      name,
      email,
      password,
      confirmPassword,
      errors,
      touched,
    } = this.state;
    console.log(this.state);
    return (
      <>
        <Dialog
          aria-labelledby="simple-dialog-title"
          {...other}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle id="simple-dialog-title">Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter your Trainee details</DialogContentText>
            <List>
              <ListItem>
                <TextField
                  error={!!touched.name && !!errors.name}
                  required
                  id="outlined-error"
                  label="Name"
                  className={classes.textField}
                  value={name}
                  onChange={this.handleOnChange('name')}
                  onBlur={this.handleBlur('name')}
                  helperText={errors.name ? this.getError('name') : ''}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
              <ListItem>
                <TextField
                  error={!!touched.email && !!errors.email}
                  required
                  id="outlined-error"
                  label="Email"
                  className={classes.textField}
                  value={email}
                  onChange={this.handleOnChange('email')}
                  onBlur={this.handleBlur('email')}
                  helperText={errors.email ? this.getError('email') : ''}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
              <ListItem>
                <Grid
                  item
                  md={12}
                  container
                  direction="row"
                  alignItems="flex-start"
                  spacing="18"
                >
                  <Grid
                    item
                    xs={6}
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <TextField
                      error={!!touched.password && !!errors.password}
                      required
                      id="outlined-error"
                      label="Password"
                      type="password"
                      className={classes.textField}
                      value={password}
                      onChange={this.handleOnChange('password')}
                      onBlur={this.handleBlur('password')}
                      helperText={errors.password ? this.getError('password') : ''}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <RemoveRedEye />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                  >
                    <TextField
                      error={!!touched.confirmPassword && !!errors.confirmPassword}
                      required
                      id="outlined-error"
                      label="Confirm Password"
                      type="password"
                      className={classes.textField}
                      value={confirmPassword}
                      onChange={this.handleOnChange('confirmPassword')}
                      onBlur={this.handleBlur('confirmPassword')}
                      helperText={this.getError('confirmPassword') || ''}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <RemoveRedEye />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid
                  container
                  spacing={16}
                  className={classes.demo}
                  alignItems="center"
                  direction="row"
                  justify="flex-end"
                >
                  <Grid
                    item
                  >
                    <Button
                      variant="contained"
                      size="small"
                      className={classes.button}
                      onClick={onClose}
                    >
                        Cancel
                    </Button>
                  </Grid>
                  <Grid
                    item
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      size="small"
                      disabled={this.hasError() || !this.isTouched()}
                      onClick={this.handleSubmit}
                    >
                        Submit
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

AddDialog.propTypes = propTypes;
AddDialog.defaultProps = defaultProps;

export default withStyles(styles)(AddDialog);
