const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/name', (request, response) => {
  const connection = db.connect()
  const statement = `select * from SourceCity`
  connection.query(statement, (error, data) => {
      connection.end()
      const sourcecities = []
      for (let index = 0; index < data.length; index++) {
          const sourcecity = data[index]
          sourcecities.push({
              source_city_id: sourcecity['source_city_id'],
              source_city_name: sourcecity['source_city_name'],
          })
      }
      response.send(utils.createResult(error, sourcecities))
  })
})

router.get('/', (request, response) => {
  const connection = db.connect()
  const statement = `select source_city_name from SourceCity`
  connection.query(statement, (error, data) => {
      connection.end()
      const sourcecities = []
      for (let index = 0; index < data.length; index++) {
          const sourcecity = data[index]
          sourcecities.push({
              source_city_name: sourcecity['source_city_name'],
          })
      }
      response.send(utils.createResult(error, sourcecities))
  })
})

router.post('/',(request,response)=>
{
 const connection = db.connect()
 const{
    source_city_id,
    source_city_name
  } =request.body

  const statement = `insert into SourceCity (source_city_name) 
  values ('${source_city_name}')`

  connection.query(statement,(error,data)=>
{
 connection.end()
 response.send(utils.createResult(error,data))
})
})

router.delete('/:source_city_id',(request,response)=>
{
    const {source_city_id} = request.params
    const connection=db.connect()
    const statement = `delete from SourceCity where source_city_id=${source_city_id}`
    connection.query(statement,(error,data)=>
    {
      const statement2=`delete from pickup_point where source_city_id=${source_city_id}`
      connection.query(statement2,(error,data)=>
      {
        connection.end()
        response.send(utils.createResult(error,data))
      })
     })
})

module.exports = router