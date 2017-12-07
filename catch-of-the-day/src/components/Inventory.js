import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {/* Pass addFish function to AddFishForm via props -- makes function available on AddFishForm */}
        <AddFishForm addFish={this.props.addFish} />
      </div>
    )
  }
}

export default Inventory;