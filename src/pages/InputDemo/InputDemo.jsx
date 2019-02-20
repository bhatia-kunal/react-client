import React, { Component } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import {
  cricketOptions,
  footBallOptions,
  sportsArray,
  Cricket,
  Football,
} from '../../configs/constants';

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      sport: '',
      cricket: '',
      football: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  handleSportsChange = (event) => {
    this.setState({
      sport: event.nativeEvent.target.value,
    });
  }

  handlePositionChange = (event) => {
    const { sport } = this.state;
    this.setState({
      cricket: (sport === Cricket) ? event.nativeEvent.target.value : '',
      football: (sport === Football) ? event.nativeEvent.target.value : '',
    });
  }

  render() {
    const { value, sport } = this.state;
    const radio = (sport === Cricket) ? cricketOptions : footBallOptions;
    console.log(this.state);
    return (
      <>
        <h3>Name</h3>
        <TextField value={value} onchange={this.handleNameChange} />
        <h3>Select the game you play</h3>
        <SelectField value={sport} onchange={this.handleSportsChange} options={sportsArray} />
        { sport
          ? (
            <div>
              <h4>What you do?</h4>
              <RadioGroup value="male" options={radio} onchange={this.handlePositionChange} />
            </div>
          )
          : '' }
      </>
    );
  }
}

export default InputDemo;
