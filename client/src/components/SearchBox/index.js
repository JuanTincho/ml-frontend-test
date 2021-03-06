import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import logo from '../../images/LOGO_ML.png';
import './search.scss';

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textValue: '',
    };
  }

  handleChange = (event) => {
    this.setState({ textValue: event.target.value });
  };

  handleKeyPress = (e) => {
    if (e.which === 13) {
      this.searchItem();
    }
  };

  goHome = () => {
    const { history } = this.props;
    this.setState({ textValue: '' }, () => history.push('/'));
  };

  searchItem = () => {
    const { textValue } = this.state;
    const { history } = this.props;
    history.push(`/items?search=${textValue}`);
  };

  render() {
    const { textValue } = this.state;
    return (
      <div className="search">
        <div className="column1">
          <img src={logo} alt="ML-logo" onClick={this.goHome} />
        </div>
        <div className="column2">
          <input
            value={textValue}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            placeholder="Nunca dejes de buscar"
          />
          <button type="submit" onClick={this.searchItem} />
        </div>
      </div>
    );
  }
}

SearchBox.propTypes = {
  // eslint-disable-next-line react/require-default-props, react/forbid-prop-types
  history: PropTypes.object,
};

export default withRouter(SearchBox);
