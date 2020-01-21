
const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/',(request,response)=>
{
const connection = db.connect()
const statement=`select payment_method_name from payment_method`
connection.query(statement,(error,data)=>
{
 connection.end()
 const paymentmethods = []
      for (let index = 0; index < data.length; index++) {
          const payment_method = data[index]
          paymentmethods.push({
            payment_method_name: payment_method['payment_method_name']
          })
      }
 response.send(utils.createResult(error,paymentmethods))
})
})

module.exports = router