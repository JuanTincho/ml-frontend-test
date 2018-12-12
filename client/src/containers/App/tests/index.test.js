import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import App from '../index';

describe('SearchBox', () => {
  let memoryRouterComponent;

  beforeEach(() => {
    memoryRouterComponent = shallow(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });

  it('renders correctly', () => {
    const tree = renderer.create(memoryRouterComponent).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
