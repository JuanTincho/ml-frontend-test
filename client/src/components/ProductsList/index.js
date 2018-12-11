import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Categories from '../Categories';
import freeShippingLogo from '../../images/ic_shipping.png';
import './productsList.scss';

const getParams = (query, value) => new URLSearchParams(query).get(value);

class ProductsList extends Component {
  constructor(props) {
    super(props);
    // const { location } = this.props;
    // const searchQuery = getParams(location.search, 'search');

    this.state = {
      categories: [],
      // searchQuery: '',
      items: [],
    };
  }

  componentDidMount() {
    const { location } = this.props;

    const searchQuery = getParams(location.search, 'search');
    this.fetchData(searchQuery);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const searchQuery = getParams(location.search, 'search');
    const prevSearchQuery = getParams(prevProps.location.search, 'search');
    if (prevSearchQuery !== searchQuery) {
      this.fetchData(searchQuery);
    }
  }

  fetchData = (searchQuery) => {
    // const { searchQuery } = this.state;

    axios.get(`/api/items?q=${searchQuery}`).then((response) => {
      const { categories, items } = response.data;
      this.setState({ categories, items });
    });
  };

  render() {
    const { categories, items } = this.state;
    return (
      <div className="products-list-container">
        <Categories categories={categories} />
        <div className="products-list">
          {items.map(item => (
            <div key={item.title} className="product">
              <div className="column-1">
                <img src={item.picture} alt={item.title} height="180" width="180" />
              </div>
              <div className="column-2">
                <p className="price">
                  {new Intl.NumberFormat([], {
                    style: 'currency',
                    currency: item.price.currency,
                  }).format(item.price.amount)}
                  {item.free_shipping && <img src={freeShippingLogo} alt="newProduct" />}
                </p>
                <p className="title">{item.title}</p>
              </div>
              <div className="column-3">
                <p>{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ProductsList.propTypes = {
  // eslint-disable-next-line react/require-default-props
  location: PropTypes.shape(PropTypes.string),
};

export default ProductsList;
