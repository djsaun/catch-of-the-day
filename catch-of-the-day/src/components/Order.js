import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {
  // Need constructor function in order to bind 'this' to the component
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  // Create renderOrder function instead of creating a separate component
  renderOrder(key) {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    // Can store JSX in a variable
    const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>X</button>

    if (!fish || fish.status === 'unavailable') {
      return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available! {removeButton}</li>;
    }

    return (
      <li key={key}>
        <span>
          {/* Animating numbers in; need to add a key so that React knows which span to add the leaving class to and which span to add the enter class to */}
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}</span>
          </CSSTransitionGroup>
          
          lbs {fish.name} {removeButton}
        </span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      // Individual fish
      const fish = this.props.fishes[key];
      // How many fish are in order
      const count = this.props.order[key];
      // Does fish exist and is the fish still available?
      const isAvailable = fish && fish.status === 'available';

      // If fish is available, return this amount
      if (isAvailable) {
        // Include || 0 in case fish is deleted
        return prevTotal + (count * fish.price || 0);
      }

      // If fish is unavailable, return this amount
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        {/* Replace <ul> with <CSSTransitionGroup> to make a React animation component, but assign component param of "ul" so that it maintains the unordered list HTML structure */}
        {/* transition params allows React to assign classes to children elements on enter and leave, which we can style */}
        <CSSTransitionGroup 
          className="order" 
          component="ul" 
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    )
  }
}

Order.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  removeFromOrder: React.PropTypes.func.isRequired,
};

export default Order;
