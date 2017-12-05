import React from 'react';

// If you dont need other methods aside from render, you can use a stateless functional component to render out the JSX
// Need to pass props to the function if props are available to the component
const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Catch 
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Day
        </h1>
      {/* props are passed in directly on stateless functional components. Will not use "this" */}
      <h3 className="tagline"><span>{props.tagline}</span></h3>
    </header>
  )
}

export default Header;