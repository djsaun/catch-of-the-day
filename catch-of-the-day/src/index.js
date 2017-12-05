import React from 'react';
import { render } from 'react-dom';
// Allows webpack to compile styles
import './css/style.css';
import App from './components/App';

render(<App />, document.querySelector('#main') )