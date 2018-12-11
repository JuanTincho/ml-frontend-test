import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Categories from '../Categories';
import getParams from '../../utils/getParams';
import freeShippingLogo from '../../images/ic_shipping.png';
import './productsList.scss';

class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
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
    axios.get(`/api/items?q=${searchQuery}`).then((response) => {
      const { categories, items } = response.data;
      this.setState({ categories, items });
    });
  };

  render() {
    const { categories, items } = this.state;
    const itemLink = '/items';

    return (
      <>
        <Categories categories={categories} />
        <div className="products-list">
          {items.map(item => (
            <div key={item.title} className="product">
              <div className="column-1">
                <Link to={`${itemLink}/${item.id}`}>
                  <img src={item.picture} alt={item.title} height="180" width="180" />
                </Link>
              </div>
              <div className="column-2">
                <p className="price">
                  {new Intl.NumberFormat([], {
                    style: 'currency',
                    currency: item.price.currency,
                  }).format(item.price.amount)}
                  {item.free_shipping && <img src={freeShippingLogo} alt="newProduct" />}
                </p>
                <Link to={`${itemLink}/${item.id}`}>{item.title}</Link>
              </div>
              <div className="column-3">
                <p>{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

ProductsList.propTypes = {
  // eslint-disable-next-line react/require-default-props,  react/forbid-prop-types
  location: PropTypes.object,
};

export default ProductsList;
