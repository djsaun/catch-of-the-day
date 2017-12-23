import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  // Place state on parent component so that it can be passed down to child components
  constructor() {
    super();

    // Bind addFish method to App
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    // Initial application state
    this.state = {
      fishes: {},
      order: {}
    };
  }

  // componentWillMount (comes from React) allows us to hook into the second right before the component is rendered and allow us to sync our component state wth our firebase state
  componentWillMount() {
    // First argument is the string that points to the piece of Firebase that you'd like to sync with -- storeId comes from the browserRouter
    // /fishes lets us sync just the fishes state in the database
    // Second argument is the context
    // Third argument is specific state we want to sync
    // This runs right before <App /> is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
    {
      context: this,
      state: 'fishes'
    })

    // Check if order state is in localstorage and set state on page refresh
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
    if (localStorageRef) {
      // update our App component's order state
      this.setState({
        // turn string back into object
        order: JSON.parse(localStorageRef)
      });
    }
  }

  // If switching from one store to another store, we need to stop syncing previous store 
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // Hook into when data actually changes using componentWillUpdate - runs whenever props or state changes
  // Pass in updated props and updated state
  componentWillUpdate(nextProps, nextState) {
    // Set localstorage
    // Had to pass params down to Order component within App
    // Cannot store an object within localStorage - must convert it to JSON
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
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

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    // Remove fish -- need to set specific fish to null due to firebase constraints. Otherwise, 'delete fishes[key];' should work.
    fishes[key] = null;
    this.setState({ fishes })
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
  
  removeFromOrder(key) {
    const order = {...this.state.order};
    // Can use 'delete' because data is stored in localStorage and not in firebase
    delete order[key];
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
        <Order fishes={this.state.fishes} order={this.state.order} params={this.props.params} removeFromOrder={this.removeFromOrder} />
        {/* Pass addFish method to Inventory component */}
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} updateFish={this.updateFish} removeFish={this.removeFish} />
      </div>  
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
