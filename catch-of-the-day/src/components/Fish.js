import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render() {
    // Store `this.props.details` in variable since it'll be used multiple times
    const { details } = this.props; 

    return (
      <li className="menu-fish">
        {/* props are stored in details (see App.js) so access individual properities from this.props.details */}
        {/* If setting an attr of a tag do a variable, you do not need to include quotes (e.g. for image src) */}
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button>Add To Order</button>
      </li>
    )
  }
}

export default Fish;