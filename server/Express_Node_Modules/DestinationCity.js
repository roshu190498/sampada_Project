const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
  const connection = db.connect()
  const statement = `select * from DestinationCity`
  connection.query(statement, (error, data) => {
      connection.end()
      const destcities = []
      for (let index = 0; index < data.length; index++) {
          const destcity = data[index]
          destcities.push({
              destination_city_id: destcity['destination_city_id'],
              destination_city_name: destcity['destination_city_name'],
          })
      }
      response.send(utils.createResult(error, destcities))
  })
})

router.get('/name', (request, response) => {
  const connection = db.connect()
  const statement = `select destination_city_name from DestinationCity`
  connection.query(statement, (error, data) => {
      connection.end()
      const destinationcities = []
      for (let index = 0; index < data.length; index++) {
          const destinationcity = data[index]
          destinationcities.push({
              destination_city_name: destinationcity['destination_city_name'],
          })
      }
      response.send(utils.createResult(error, destinationcities))
  })
})

router.post('/',(request,response)=>
{
 const connection = db.connect()
 const{
    destination_city_id,
    destination_city_name
  } =request.body

  const statement = `insert into DestinationCity (destination_city_name) 
  values ('${destination_city_name}')`

  connection.query(statement,(error,data)=>
{
 connection.end()
 response.send(utils.createResult(error,data))
})
})

router.delete('/:destination_city_id',(request,response)=>
{
    const {destination_city_id} = request.params
    const connection=db.connect()
    const statement = `delete from DestinationCity where destination_city_id=${destination_city_id}`
    connection.query(statement,(data,error)=>
    {
      connection.end()
      response.send(utils.createResult(error,data))
    })
})

module.exports = router