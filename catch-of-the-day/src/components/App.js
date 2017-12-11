import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes.js';

class App extends React.Component {
  // Place state on parent component so that it can be passed down to child components
  constructor() {
    super();

    // Bind addFish method to App
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);

    // Initial application state
    this.state = {
      fishes: {},
      order: {}
    };
  }

  addFish(fish) {
    // Update our state
    // Take copy of current state and then update state
    const fishes = {...this.state.fishes};

    // Add in new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
 
    // Set state
    this.setState({ fishes });
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        {/* Pass addFish method to Inventory component */}
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>  
    )
  }
}

export default App;