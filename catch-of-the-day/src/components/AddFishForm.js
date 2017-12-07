import React from 'react';

// State is representation of all data within our application
// Each component can have its own state, however it's best to think of state as a single object

class AddFishForm extends React.Component {
  render() {
    return (
      <form className="fish-edit">
        <input type="text" placeholder="Fish Name"/>
        <input type="text" placeholder="Fish Price"/>
        <select>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" placeholder="Fish Desc"></textarea>
        <input type="text" placeholder="Fish Image"/>
        <button type="submit">+ Add Item</button>
      </form>
    )
  }
}

export default AddFishForm;