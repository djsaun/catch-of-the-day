import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    
    // Update state - take a copy of fish and update it with the new data
    // Overlay new, updated properties - use computed property to dynamically overwrite value
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    }

    // updateFish was made available in <App /> -- see app.js updateFish method
    this.props.updateFish(key, updatedFish);
  }
  
  renderInventory(key) {
    // Need information about fish for data binding
    const fish = this.props.fishes[key];

    // React doesn't want you to place state directly into an input unless you have a plan for updating it
    // Need to listen for change on each input, and anytime an input is changed, we need to then update the corresponding state

    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)} />
        <select name="status" value={fish.status} onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)} />
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {/* Loop over all fishes */}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        {/* Pass addFish function to AddFishForm via props -- makes function available on AddFishForm */}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired
}

export default Inventory;
