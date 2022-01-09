'use strict'


const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
const uuid = require('uuid')

function createOrder(payload) {
  if (!payload || !payload.pizza || !payload.address)
    throw new Error('To order pizza please provide pizza type and address where pizza should be delivered')

  return  docClient.put({
    TableName: 'pizza-orders',
    Item: {
      orderId: uuid.v4() ,
      pizza: payload.pizza,
      address: payload.address,
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