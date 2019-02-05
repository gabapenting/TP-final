var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/api/items', function (req, res) {
  let products = { categories: [], items: [] }
  const searchedproduct = req.query.search
  axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + searchedproduct + '&limit=4')
    .then(result => {
      const productList = result.data.results.map(function (product) {
        return ({
          id: product.id,
          title: product.title,
          price: {
            currency: product.currency_id,
            amount: String(product.price).split('.')[0],
            decimals: String(product.price).split('.')[1] || '',
          },
          picture: product.thumbnail,
          free_shipping: product.free_shipping,
          condition: product.condition,
          location: product.location    
      })
      })
      products.items.push(productList)

      const categoryArray = result.data.filters
      for (var i = 0; i < categoryArray.length; i++) {
        if (categoryArray[i].id == 'category') {
          const category = categoryArray[i].values[0].path_from_root
          for (var x = 0; x < category.length; x++) {
            products.categories.push(category[x].name)
          }
        }
      }
      res.json(products);
    })
    .catch(err => {
      console.log("error")
    })
  
})


router.get('/api/items/:id', function (req, res, next) {
  const id = req.params.id;
  let product = {};
  let productDescription = {};
  axios
    .get('https://api.mercadolibre.com/items/' + id)
    .then(result => {
      product = result.data;
      return axios.get('https://api.mercadolibre.com/items/' + id + '/description')
    })
    .then(result => {
      productDescription = result.data;
      const category = product.category_id;
      return axios.get('https://api.mercadolibre.com/categories/' + category)
    })
    .then(result => {
      let resultProduct = {
        categories: [result.data.name],
        item: {
          id: product.id,
          title: product.title,
          price: {
            currency: product.currency_id,
            amount: String(product.price).split('.')[0],
            decimals: String(product.price).split('.')[1] || '0',
          },
          picture: product.thumbnail,
          condition: product.condition,
          free_shipping: product.shipping.free_shipping,
          sold_quantity: product.sold_quantity,
          description: productDescription.plain_text
        }
      }

      res.json(resultProduct);

    })
    .catch(err => {
      console.log("error")
    })
});

module.exports = router;