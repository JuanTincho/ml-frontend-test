import React from 'react';
import PropTypes from 'prop-types';
import './categories.scss';

const Categories = ({ categories }) => (
  <div className="categories">
    {categories.map((category, index) => {
      const lastCategory = index === categories.length - 1;

      return (
        <span key={category} className={lastCategory ? 'last-category' : null}>
          {!lastCategory ? `${category} > ` : category}
        </span>
      );
    })}
  </div>
);

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
};

Categories.defaultProps = {
  categories: '',
};

export default Categories;
