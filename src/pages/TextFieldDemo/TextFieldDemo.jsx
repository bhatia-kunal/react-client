import React from 'react';
import { TextField, Slider } from '../../components';
import { PUBLIC_IMAGE__FOLDER } from '../../configs/constants';

const bannerImages = [
  `${PUBLIC_IMAGE__FOLDER}default.png`,
  `${PUBLIC_IMAGE__FOLDER}cloud.jpg`,
  `${PUBLIC_IMAGE__FOLDER}dns-server.png`,
  `${PUBLIC_IMAGE__FOLDER}full-stack-web-development.jpg`,
  `${PUBLIC_IMAGE__FOLDER}js.jpg`,
  `${PUBLIC_IMAGE__FOLDER}load-balancer.png`,
];

const TextFieldDemo = () => (
  <>
    <Slider random banners={bannerImages} />
    <h5>This is a Disabled Input</h5>
    <TextField disabled value="Disabled Input" />
    <h5>A Valid Input</h5>
    <TextField value="Accessible" />
    <h5>Input with errors</h5>
    <TextField value="101" error="Could not be greater than 100" />
  </>
);

export default TextFieldDemo;
