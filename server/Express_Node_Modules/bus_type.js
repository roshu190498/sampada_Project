const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/type', (request, response) => {
  const connection = db.connect()
  const statement = `select * from bus_type`
  connection.query(statement, (error, data) => {
      connection.end()
      const bustypes = []
      for (let index = 0; index < data.length; index++) {
          const bustype = data[index]
          bustypes.push({
              type_id: bustype['type_id'],
              type_name: bustype['type_name'],
          })
      }
      response.send(utils.createResult(error, bustypes))
  })
})

router.delete('/:type_id',(request,response)=>
{
    const {type_id} = request.params
    const connection=db.connect()
    const statement = `delete from bus_type where type_id=${type_id}`
    connection.query(statement,(data,error)=>
    {
      connection.end()
      response.send(utils.createResult(error,data))
    })
})

router.post('/',(request,response)=>
{
 const connection = db.connect()
 const{
    type_id,
    type_name
  } =request.body

  const statement = `insert into bus_type (type_name) 
  values ('${type_name}')`

  connection.query(statement,(error,data)=>
{
 connection.end()
 response.send(utils.createResult(error,data))
})
})

module.exports = router