const cApiBuilder = require('claudia-api-builder');
const apiBuilder = new cApiBuilder();


apiBuilder.get('/pizzas', () => {
  return [
    'Onion Pizza',
    'Paneer Pizza',
    'Peri Peri Pizza'
  ]
})

module.exports = apiBuilder;