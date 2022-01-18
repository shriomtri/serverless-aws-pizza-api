'use strict'


const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
const uuid = require('uuid')

function createOrder(request) {
  const payload = request.body;
  console.log('Save an order', payload)
  console.log('Context ', request.context)
  const userData = request.context.authorizer.claims
  console.log('User data', userData)
  
  let userAddress = payload && payload.address
  if (!userAddress) {
    userAddress = JSON.parse(userData.address).formatted
  }

  if (!payload || !payload.pizza || !userAddress)
    throw new Error('To order pizza please provide pizza type and address where pizza should be delivered')

  return  docClient.put({
    TableName: 'pizza-orders',
    Item: {
      cognitoUsername: userAddress['cognito:username'],
      orderId: uuid.v4() ,
      pizza: payload.pizza,
      address: userAddress,
      status: 'pending'
    }
  }).promise()
    .then((res) => {
      console.log('Order is saved!', res)
      return res
    })
    .catch((saveError) => {
      console.log(`Oops, order is not saved :(`, saveError)
      throw saveError
    })
}

module.exports = createOrder