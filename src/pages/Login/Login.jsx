import React, { Component } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Email from '@material-ui/icons/Email';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Spinner } from '../../components';
import { SnackBarConsumer } from '../../contexts';
import { callApi, setAuthToken } from '../../libs/utils';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {
  schema = Yup.object().shape({
    email: Yup
      .string().email()
      .required()
      .label('Email'),
    password: Yup
      .string()
      .required().label('Password'),
  });

  fieldTouched = {}

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: '',
      errors: {},
      touched: {},
      passwordType: 'password',
    };
  }

  handleErrors = () => {
    const parsedErrors = {};
    const {
      email,
      password,
    } = this.state;
    this.schema.validate({
      email,
      password,
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

  handleSubmit = async (handleOpen) => {
    this.setState({
      loading: true,
    })
    const { history } = this.props;
    const { email, password } = this.state;
    const result = await callApi('post', '/user/login', { email, password });
    if (result.data) {
      const { data } = result.data;
      localStorage.setItem('jwtToken', data);
      setAuthToken(data);
      history.push('/trainee');
    } else {
      this.setState({
        loading: false,
      }, () => handleOpen(result, 'error'));
    }
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

  togglePassword = () => {
    const { passwordType } = this.state;
    if (passwordType === 'password') {
      this.setState({
        passwordType: 'text',
      });
    } else {
      this.setState({
        passwordType: 'password',
      });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      loading,
      email,
      password,
      errors,
      touched,
      passwordType,
    } = this.state;

    return (
      <SnackBarConsumer>
        {handleOpen => (
          <main className={classes.main}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
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
              <TextField
                error={!!touched.password && !!errors.password}
                required
                id="outlined-error"
                label="Password"
                type={passwordType}
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
                    <InputAdornment position="start" style={{cursor: 'pointer'}} onClick={this.togglePassword}>
                      <RemoveRedEye />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={this.hasError() || !this.isTouched() || loading}
                onClick={() => this.handleSubmit(handleOpen)}
                className={classes.submit}
              >
                {loading ? (<Spinner />) : 'Sign in'}
              </Button>
            </Paper>
          </main>
        )}
      </SnackBarConsumer>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.string.isRequired,
};

export default withStyles(styles)(Login);
