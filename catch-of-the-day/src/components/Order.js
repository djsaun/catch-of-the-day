import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
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