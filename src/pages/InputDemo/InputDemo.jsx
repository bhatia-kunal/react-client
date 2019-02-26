import React, { Component } from 'react';
import * as yup from 'yup';
import style from './style';

import {
  TextField,
  SelectField,
  RadioGroup,
  Button,
} from '../../components';

import {
  cricketOptions,
  footBallOptions,
  sportsArray,
  Cricket,
  Football,
} from '../../configs/constants';

class InputDemo extends Component {
  schema = yup.object().shape({
    name: yup
      .string().min(3)
      .required()
      .label('Name'),
    sport: yup
      .string()
      .required()
      .label('Sports'),
    cricket: yup
      .string().label('What you do')
      .when('sport', {
        is: val => val === 'Cricket',
        then: yup.string().required(),
        otherwise: yup.string().min(0),
      }),
    football: yup
      .string().label('What you do')
      .when('sport', {
        is: val => val === 'Football',
        then: yup.string().required(),
        otherwise: yup.string().min(0),
      }),
  });

  fieldTouched = {};

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      errors: {},
      touched: {},
    };
  }

  handleErrors = () => {
    const parsedErrors = {};
    const {
      name,
      sport,
      cricket,
      football,
    } = this.state;
    this.schema.validate({
      name,
      sport,
      cricket,
      football,
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

  renderCricket = () => {
    const { sport } = this.state;

    if (sport !== Cricket) {
      return null;
    }

    return (
      <div>
        <h4>What you do?</h4>
        <RadioGroup value="male" options={cricketOptions} onBlur={this.handleBlur('cricket')} onchange={this.handlePositionChange} error={this.getError('cricket')} />
      </div>
    );
  }

  renderFootball = () => {
    const { sport } = this.state;

    if (sport !== Football) {
      return null;
    }

    return (
      <div>
        <h4>What you do?</h4>
        <RadioGroup value="male" options={footBallOptions} onBlur={this.handleBlur('football')} onchange={this.handlePositionChange} error={this.getError('football')} />
      </div>
    );
  }

  handlePositionChange = (event) => {
    const { sport } = this.state;
    this.setState({
      cricket: (sport === Cricket) ? event.nativeEvent.target.value : '',
      football: (sport === Football) ? event.nativeEvent.target.value : '',
    }, () => this.handleErrors());
  }

  renderCricket = () => {
    const { sport } = this.state;

    if (sport !== Cricket) {
      return null;
    }

    return (
      <div>
        <h4>What you do?</h4>
        <RadioGroup value="male" options={cricketOptions} onchange={this.handlePositionChange} />
      </div>
    );
  }

  renderFootball = () => {
    const { sport } = this.state;

    if (sport !== Football) {
      return null;
    }

    return (
      <div>
        <h4>What you do?</h4>
        <RadioGroup value="male" options={footBallOptions} onchange={this.handlePositionChange} />
      </div>
    );
  }

  render() {
    const {
      name,
      sport,
    } = this.state;
    return (
      <>
        <div style={{ margin: '20px' }}>
          <h3>Name</h3>
          <TextField
            value={name}
            onchange={this.handleOnChange('name')}
            onBlur={this.handleBlur('name')}
            error={this.getError('name')}
          />
          <h3>Select the game you play</h3>
          <SelectField
            value={sport}
            onchange={this.handleOnChange('sport')}
            options={sportsArray}
            onBlur={this.handleBlur('sport')}
            error={this.getError('sport')}
          />
          {this.renderFootball()}
          {this.renderCricket()}
          <div style={style.formButtons}>
            <Button value="Cancel" />
            <Button value="Submit" color="primary" disabled={this.hasError() || !this.isTouched()} />
          </div>
        </div>
      </>
    );
  }
}

export default InputDemo;
