import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import mockedAxios from 'axios';
import ProductsList from '../index';
import getParams from '../../../utils/getParams';

jest.mock('../../../utils/getParams');

describe('ProductDetails', () => {
  const mockedSearchQuery = 'mockedQuery';
  const mockedLocation = { search: `search?=${mockedSearchQuery}` };
  let component;

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: {
        categories: [],
        items: [
          {
            id: '1',
            title: 'mockedTitle',
            picture: 'mockedPic',
            price: {
              currency: 'ARS',
              amount: 500,
            },
            condition: 'new',
            freeShipping: true,
            sold_quantity: 12,
            location: 'mockedLocation1',
          },
          {
            id: '2',
            title: 'mockedTitle2',
            picture: 'mockedPic2',
            price: {
              currency: 'USD',
              amount: 1000,
            },
            condition: 'used',
            freeShipping: false,
            sold_quantity: 30,
            location: 'mockedLocation2',
          },
        ],
      },
    });
    getParams.mockReturnValue(mockedSearchQuery);

    component = mount(
      <MemoryRouter>
        <ProductsList location={mockedLocation} />
      </MemoryRouter>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshotwith no products', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call to the service', () => {
    const expectedCall = `/api/items?q=${mockedSearchQuery}`;
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(expectedCall);
  });
});
