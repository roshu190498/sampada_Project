const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/',(request,response)=>
{
const connection = db.connect()

const statement=`select * from pickup_point`

connection.query(statement,(error,data)=>
{
 connection.end()
 const pickuppoints = []
      for (let index = 0; index < data.length; index++) {
          const pickuppoint = data[index]
          pickuppoints.push({
              pickup_pt_id: pickuppoint['pickup_pt_id'],
              pickup_pt_name: pickuppoint['pickup_pt_name'],
          })
      }
 response.send(utils.createResult(error,data))
})
})

router.post('/',(request,response)=>
{
 const connection = db.connect()
 const{
     pickup_pt_id,
     pickup_pt_name,
     source_city_id,
  } =request.body

  const statement = `insert into pickup_point 
  (pickup_pt_id,pickup_pt_name,source_city_id) 
  values (${pickup_pt_id},'${pickup_pt_name}',${source_city_id})`

  connection.query(statement,(error,data)=>
{
 connection.end()
 response.send(utils.createResult(error,data))
})
})

router.delete('/:pickup_pt_id',(request,response)=>
{
    const {pickup_pt_id} = request.params
    const connection=db.connect()
    const statement = `delete from pickup_point where 
    pickup_pt_id=${pickup_pt_id}`
    connection.query(statement,(data,error)=>
    {
      connection.end()
      response.send(utils.createResult(error,data))
    })
})

router.get('/:source_city_id', (request, response) => {
  
  const {source_city_id} = request.params
 
  const connection = db.connect()
  const statement = ` select pickup_pt_id,pickup_pt_name from pickup_point where source_city_id=${source_city_id}`
  connection.query(statement, (error, data) => {
          connection.end()
          const pickuppoints = []
          for (let index = 0; index < data.length; index++) {
          const PickupPoint = data[index]
          pickuppoints.push
          ({ 
            pickup_pt_id: PickupPoint['pickup_pt_id'],
            pickup_pt_name: PickupPoint['pickup_pt_name'],
           })
          }
          if (data.length == 0)
          {
            response.send(utils.createResult('no pickup Point available'))
          }
          else
          response.send(utils.createResult(error, data))
      })
    })
module.exports = router