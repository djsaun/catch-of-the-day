import React from 'react';

class StorePicker extends React.Component {
  // Constructor of a component runs when the component is created
  // constructor() {
  //   // Super first creates a React component and then extends the component by adding on our own methods
  //   super();

  //   // Looks for goToStore method and sets itself to itself and binds it to "this". This is equal to the StorePicker component
  //   this.goToStore = this.goToStore.bind(this);
  // }

  goToStore(event) {
    event.preventDefault();
    console.log('You changed the url');
    // First, grab the text from the box - use a reference rather than touching the DOM itself
    // Do this by adding a "ref" to the input and putting a reference of the input on the class
    // Reference a component inside of another method   
    console.log(this.storeInput.value)

    // Second, transition from / to /store/:storeId
  }

  // render is bound to the component, so using "this" inside of a render statement makes "this" refer to the component
  render() {
    // onSubmit binds goToStore method to "this"
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Please Enter A Store</h2>
        {/* when input is rendered on the page, it's going to put a reference of the input on the class itself  */}
        <input type="text" required placeholder="Store Name" ref={(input) => { this.storeInput = input } } />
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

export default StorePicker;