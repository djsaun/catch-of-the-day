import React from 'react';
import { formatPrice } from '../helpers';

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

    if (!fish || fish.status === 'unavailable') {
      return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available!</li>;
    }

    return (
      <li key={key}>
        <span>{count}lbs {fish.name}</span>
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
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    )
  }
}

export default Order;