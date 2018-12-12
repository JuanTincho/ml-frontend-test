import getParams from '../getParams';

describe.each([['?search=test', 'search', 'test'], ['?testQuery=value', 'testQuery', 'value'], ['?id=testId', 'id', 'testId']])(
  'getParams(%s, %s)',
  (query, value, expected) => {
    test(`returns ${expected}`, () => {
      expect(getParams(query, value)).toBe(expected);
    });
  },
);
