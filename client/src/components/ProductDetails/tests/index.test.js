import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import mockedAxios from 'axios';
import ProductDetails from '../index';

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('ProductDetails', () => {
  const mockedId = 'mockedId';
  const mockedMatch = { params: { id: mockedId } };
  let component;

  beforeEach(() => {
    component = shallow(<ProductDetails match={mockedMatch} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should match snapshotwith no item', () => {
      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should match snapshotwith with an item ', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          item: {
            title: 'mockedTitle',
            picture: 'mockedPic',
            price: {
              currency: 'ARS',
              amount: 500,
            },
            condition: 'new',
            freeShipping: true,
            description: 'Descripcion',
            sold_quantity: 12,
          },
        },
      });

      component = shallow(<ProductDetails match={mockedMatch} />);
      await flushPromises();
      const tree = renderer.create(component).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  it('should call to the service', () => {
    const expectedCall = `/api/items/${mockedId}`;
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(expectedCall);
  });
});
