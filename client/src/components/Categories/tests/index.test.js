import React from 'react';
import renderer from 'react-test-renderer';
import Categories from '../index';

describe('Categories', () => {
  const mockedCategories = ['category1', 'category2', 'category3'];

  it('renders correctly', () => {
    const tree = renderer.create(<Categories categories={mockedCategories} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
