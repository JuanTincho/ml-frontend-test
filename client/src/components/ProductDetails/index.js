import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Categories from '../Categories';
import './productDetails.scss';
// import getParams from '../../utils/getParams';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    this.fetchData(id);
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const {
      match: {
        params: { id: prevId },
      },
    } = prevProps;

    if (id !== prevId) {
      this.fetchData(id);
    }
  }

  fetchData = (itemId) => {
    axios.get(`/api/items/${itemId}`).then((response) => {
      const { item } = response.data;
      this.setState({ item });
    });
  };

  render() {
    const { item } = this.state;
    return (
      <>
        {item ? (
          <>
            <Categories categories={item.categories} />
            <div className="product-container">
              <img src={item.picture} alt={item.title} />
              <div className="details">
                <div className="details_column-1">
                  <p className="condition">
                    {`${item.condition === 'new' ? 'Nuevo' : 'Usado'} - 
                  ${item.sold_quantity} vendidos`}
                  </p>
                  <h1 className="title">{item.title}</h1>
                  <p className="price">
                    {new Intl.NumberFormat([], {
                      style: 'currency',
                      currency: item.price.currency,
                    }).format(item.price.amount)}
                  </p>
                </div>
                <div className="details_column-2">
                  <button type="button"> Comprar </button>
                </div>
              </div>
              <div className="description">
                <h1>Descripción del producto</h1>
                <p>{item.description}</p>
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  }
}

ProductDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};
export default ProductDetails;
