import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes.js';

class App extends React.Component {
  // Place state on parent component so that it can be passed down to child components
  constructor() {
    super();

    // Bind addFish method to App
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);

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

  addToOrder(key) {
    // take a copy of our state
    const order = {...this.state.order};

    // update or add the new number of fish ordered
    // If fish exists in order, add 1, otherwise, set order to 1
    order[key] = order[key] + 1 || 1;
    
    // Update state
    this.setState({order});
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {/* Loop through items in fishes state */}
            {
              Object.keys(this.state.fishes)
              // Set unique key on component
              // Pass all data about the fish to the fish (name, image, desc, price, status)
              // 'key' isn't passed down to the component. Assign the key value to another props variable if you need to access the key value.
              .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        {/* Best practice is to individually pass down state components rather than the entirety of the state itself */}
        <Order fishes={this.state.fishes} order={this.state.order} />
        {/* Pass addFish method to Inventory component */}
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>  
    )
  }
}

export default App;