import React from 'react';
import TextField from '../../components';

const TextFieldDemo = () => (
  <>
    <h5>This is a Disabled Input</h5>
    <TextField disabled value="Disabled Input" />
    <h5>A Valid Input</h5>
    <TextField value="Accessible" />
    <h5>Input with errors</h5>
    <TextField value="101" error="Could not be greater than 100" />
  </>
);

export default TextFieldDemo;
