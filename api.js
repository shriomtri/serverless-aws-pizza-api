
const Api = require('claudia-api-builder')
const api = new Api()
const config = require('./config/env.json')

const getPizzas = require('./handlers/get-pizzas')
const createOrder = require('./handlers/create-order')
const updateOrder = require('./handlers/update-order')
const deleteOrder = require('./handlers/delete-order')
const getOrders = require('./handlers/get-orders')

api.registerAuthorizer('userAuthentication', {
  providerARNs: [config.userPoolArn]
})

// Define routes
api.get('/', () => 'Welcome to Pizza API')

api.get('/pizzas', () => {
  return getPizzas()
})

api.get('/pizzas/{id}', (req) => {
  return getPizzas(req.pathParams.id)
}, {
  error: 404
})

api.get('/orders', (request) => {
  return getOrders()
}, {
  error: 400
})
api.get('/orders/{id}', (request) => {
  return getOrders(request.pathParams.id)
}, {
  error: 400
})
api.post('/orders', (request) => {
  return createOrder(request)
}, {
  success: 201,
  error: 400,
  cognitoAuthorizer: 'userAuthentication'
})

api.delete('/orders/{id}', (request) => {
  return deleteOrder(request.pathParams.id)
}, {
  error: 400,
  cognitoAuthorizer: 'userAuthentication'
})

api.put('/orders/{id}', (request) => {
  return updateOrder(request.pathParams.id, request.body)
}, {
  error: 400,
  cognitoAuthorizer: 'userAuthentication'
})

module.exports = api;