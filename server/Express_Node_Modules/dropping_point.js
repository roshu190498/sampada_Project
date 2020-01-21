const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/',(request,response)=>
{
const connection = db.connect()

const statement=`select * from dropping_point`

connection.query(statement,(error,data)=>
{
 connection.end()
 const droppingpoints = []
      for (let index = 0; index < data.length; index++) {
          const droppingpoint = data[index]
          droppingpoints.push({
              drop_pt_id: droppingpoint['drop_pt_id'],
              drop_pt_name: droppingpoint['drop_pt_name'],
          })
      }
 response.send(utils.createResult(error,data))
})
})

router.post('/',(request,response)=>
{
 const connection = db.connect()
 const{
     drop_pt_id,
     drop_pt_name,
     destination_city_id,
  } =request.body

  const statement = `insert into dropping_point 
  (drop_pt_id,drop_pt_name,destination_city_id) 
  values (${drop_pt_id},'${drop_pt_name}',${destination_city_id})`

  connection.query(statement,(error,data)=>
{
 connection.end()
 response.send(utils.createResult(error,data))
})
})

router.delete('/:drop_pt_id',(request,response)=>
{
    const {drop_pt_id} = request.params
    const connection=db.connect()
    const statement = `delete from dropping_point where 
    drop_pt_id=${drop_pt_id}`
    connection.query(statement,(data,error)=>
    {
      connection.end()
      response.send(utils.createResult(error,data))
    })
})

    router.get('/:destination_city_id', (request, response) => {
  
      const {destination_city_id} = request.params
     
      const connection = db.connect()
      const statement = ` select drop_pt_id,drop_pt_name from dropping_point where destination_city_id='${destination_city_id}'`
      connection.query(statement, (error, data) => {
              connection.end()
              const droppingpoints = []
              for (let index = 0; index < data.length; index++) {
              const DroppingPoint = data[index]
              droppingpoints.push
              ({ 
                drop_pt_id: DroppingPoint['drop_pt_id'],
                drop_pt_name: DroppingPoint['drop_pt_name'],
               })
              }
              if (data.length == 0)
              {
                response.send(utils.createResult('no dropping Point available'))
              }
              else
              response.send(utils.createResult(error, data))
          })
        })


module.exports = router