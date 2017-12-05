import React from 'react';
import { render } from 'react-dom';

// React Router allows you to show and hide components anywhere within your application depending on what page you're on
import { BrowserRouter, Match, Miss } from 'react-router';

// Allows webpack to compile styles
import './css/style.css';

import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

// The router itself is a component
const Root = () => {
  // Wrap entire router statement in BrowserRouter component
  return (
    <BrowserRouter>
      {/* Match statements cannot be direct children of BrowserRouter. They need to be wrapped in a div */}
      <div>
        {/* When on homepage, show StorePicker component */}
        <Match exactly pattern="/" component={StorePicker} />
        {/* When on store page, show App component */}
        <Match exactly pattern="/store/:storeId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root />, document.querySelector('#main') )

