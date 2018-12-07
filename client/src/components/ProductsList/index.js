import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class ProductsList extends Component {
  componentDidMount() {
    axios.get('/api/items?q=iPod').then(response => console.log(response.data));
  }

  render() {
    return <div />;
  }
}

ProductsList.propTypes = {};

export default ProductsList;
