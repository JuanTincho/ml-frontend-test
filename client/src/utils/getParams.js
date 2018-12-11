const getParams = (query, value) => new URLSearchParams(query).get(value);

export default getParams;
