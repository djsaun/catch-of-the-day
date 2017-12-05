import React from 'react';
import { render } from 'react-dom';
// Allows webpack to compile styles
import './css/style.css';
import StorePicker from './components/StorePicker';

render(<StorePicker />, document.querySelector('#main') )