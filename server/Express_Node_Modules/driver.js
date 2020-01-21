const db = require('./db')
const utils = require('./utils')
const express = require ('express')

const router = express.Router()

router.get('/',(request,response)=>
{
 const connection = db.connect()
 const statement = `select * from Driver`

 connection.query(statement,(error,data)=>
 {
   connection.end()
   response.send(utils.createResult(error,data))
 })
})

router.post('/',(request,response)=>
{
 const connection = db.connect()
 const{
    driver_id,
    driver_name,
    driver_contact_no,
    address
  } =request.body

  const statement = `insert into Driver (driver_name,driver_contact_no,address) 
  values ('${driver_name}',${driver_contact_no},'${address}')`

  connection.query(statement,(error,data)=>
{
 connection.end()
 response.send(utils.createResult(error,data))
})
})

router.delete('/:driver_id',(request,response)=>
{
    const {driver_id} = request.params
    const connection=db.connect()
    const statement = `delete from Driver where driver_id=${driver_id}`
    connection.query(statement,(data,error)=>
    {
      connection.end()
      response.send(utils.createResult(error,data))
    })
})




module.exports = router
