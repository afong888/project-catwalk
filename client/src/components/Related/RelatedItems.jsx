/* eslint-disable import/extensions */
import React from 'react';
import ProductCarousel from './ProductCarousel.jsx';

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <ProductCarousel />
        {/* <ComparisonModal /> */}
      </>
    );
  }
}

export default RelatedItems;
