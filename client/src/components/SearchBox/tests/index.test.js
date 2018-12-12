import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import SearchBox from '../index';

describe('SearchBox', () => {
  let memoryRouterComponent;
  let memoryRouterInstance;
  let searchBoxInstance;
  const mockedValue = 'mockedValue';

  beforeEach(() => {
    memoryRouterComponent = mount(
      <MemoryRouter>
        <SearchBox />
      </MemoryRouter>,
    );

    memoryRouterInstance = memoryRouterComponent.instance();
    searchBoxInstance = memoryRouterComponent.find('SearchBox').instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const tree = renderer.create(memoryRouterComponent).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handleChange should change the textValue of the state', () => {
    const mockedEvent = { target: { value: mockedValue } };

    expect(searchBoxInstance.state.textValue).toEqual('');
    searchBoxInstance.handleChange(mockedEvent);
    expect(searchBoxInstance.state.textValue).toEqual(mockedValue);
  });

  describe('handleKeyPress', () => {
    beforeEach(() => {
      searchBoxInstance.searchItem = jest.fn();
    });

    it('should call to searchItem when Enter is pressed', () => {
      const mockedEvent = { which: 13 };

      searchBoxInstance.handleKeyPress(mockedEvent);
      expect(searchBoxInstance.searchItem).toHaveBeenCalledTimes(1);
    });

    it('should do nothing if Enter is not pressed', () => {
      const mockedEvent = { which: 99 };

      searchBoxInstance.handleKeyPress(mockedEvent);
      expect(searchBoxInstance.searchItem).not.toHaveBeenCalled();
    });
  });

  it('goHome should set textValue to \'\' and call history.push', () => {
    // GIVEN

    // Set history.location of MemoryRouter to /search, thus later check if it changed
    memoryRouterInstance.history.push('/search');
    // Check if it changed
    expect(memoryRouterInstance.history.location.pathname).toEqual('/search');

    searchBoxInstance.setState = jest.fn();

    // WHEN
    searchBoxInstance.goHome();

    // THEN
    expect(searchBoxInstance.setState).toHaveBeenCalledTimes(1);

    // Capture the calls of setState
    const [[firstArgument, secondArgument]] = searchBoxInstance.setState.mock.calls;

    expect(firstArgument).toEqual({ textValue: '' });

    // secondArgument is an anonymus function, call it to see what it does
    secondArgument();

    // Check if location of MemoryRouter was changed by secondArgument
    expect(memoryRouterInstance.history.location.pathname).toEqual('/');
  });

  it('searchItem should set location to \'/items?search=this.state.textValue\'', () => {
    const expectedValue = `/items?search=${mockedValue}`;
    // GIVEN
    searchBoxInstance.setState({ textValue: mockedValue });

    // WHEN
    searchBoxInstance.searchItem();

    const { pathname } = memoryRouterInstance.history.location;
    const { search } = memoryRouterInstance.history.location;

    // THEN
    expect(pathname.concat(search)).toEqual(expectedValue);
  });
});
