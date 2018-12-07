const express = require('express');
const axios = require('axios');

const router = express.Router();

const MLapi = 'https://api.mercadolibre.com';

/* GET items listing. */
router.get('/', (req, res, next) => {
  const searchPath = `${MLapi}/sites/MLA/search?q=${req.query.q}&limit=4`;
  axios
    .get(searchPath)
    .then((response) => {
      const items = response.data.results;
      if (items.length > 0) {
        const categoriesPath = `${MLapi}/categories/${items[0].category_id}`;
        axios.get(categoriesPath).then(({ data: categories }) => {
          res.send({
            categories: categories.path_from_root.map(category => category.name),
            items: items.map(item => ({
              id: item.id,
              title: item.title,
              price: {
                currency: item.currency_id,
                amount: item.price
              },
              picture: item.thumbnail,
              condition: item.condition,
              free_shipping: item.shipping.free_shipping
            }))
          });
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.send({
        categories: [],
        items: []
      });
    });
});

/* GET item's description. */
router.get('/:id', (req, res, next) => {
  const itemPath = `${MLapi}/items/${req.params.id}`;
  const descriptionPath = `${itemPath}/description`;
  axios
    .all([axios.get(itemPath), axios.get(descriptionPath)])
    .then(
      axios.spread(({ data: item }, { data: description }) => {
        res.send({
          item: {
            id: item.id,
            title: item.title,
            price: {
              currency: item.currency_id,
              amount: item.price
            },
            picture: item.pictures[0].url,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            sold_quantity: item.sold_quantity,
            description: description.plain_text
          }
        });
      })
    )
    .catch((error) => {
      console.log(error);
      res.send({
        item: {}
      });
    });
});

module.exports = router;
