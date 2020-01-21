const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/',(request,response)=>
{
 const connection = db.connect()

 const statement = `select * from Ticket`

 connection.query(statement,(error,data)=>
 {
  connection.end()
  const tickets = []
      for (let index = 0; index < data.length; index++) {
          const ticket = data[index]
          tickets.push({
              ticket_no: ticket['ticket_no'],
              seat_no: ticket['seat_no'],
              no_of_seats :ticket['no_of_seats'],
              source_city_name:ticket['source_city_name'],
              destination_city_name:ticket['destination_city_name'],
              pickup_pt_name:ticket['pickup_pt_name'],
              drop_pt_name:ticket['drop_pt_name'],
              ticket_date:ticket['ticket_date'],
              status:ticket['status'],
              bus_no :ticket['bus_no']
          })
      }
  response.send(utils.createResult(error,tickets))
 })
})

router.post('/add',(request,response)=>
{
    const connection = db.connect()

    const{
       bus_name,
       bus_type,
       seat_no,
       source_city_name,
       destination_city_name,
       pickup_pt_name,
       drop_pt_name,
       price,
       ticket_date,
       bus_no,
       payment_method_name,
       user_id
    }=request.body

    const statement = `insert into Ticket (bus_name,bus_type,seat_no,source_city_name,destination_city_name,pickup_pt_name,drop_pt_name,price,ticket_date,bus_no,payment_method_name,user_id) 
    values ('${bus_name}','${bus_type}','${seat_no}','${source_city_name}','${destination_city_name}','${pickup_pt_name}','${drop_pt_name}','${price}','${ticket_date}','${bus_no}','${payment_method_name}','${user_id}')`

     connection.query(statement,(error,data)=>
     {
      connection.end()
      response.send(utils.createResult(error,data))
     })
   })

   router.get('/:user_id', (request, response) => {
  
    const {user_id} = request.params
   
    const connection = db.connect()
    const statement = `select * from Ticket where user_id=${user_id}`
    connection.query(statement, (error, data) => {
            connection.end()
            response.send(utils.createResult(error, data))
        })
      })

// router.delete('/:ticket_no',(request,response)=>
// {
//     const {ticket_no} = request.params
//     const connection=db.connect()
//     const statement = `delete from Ticket where ticket_no='${ticket_no}'`
//     connection.query(statement,(error,data)=>
//     {
//       connection.end()
//       response.send(utils.createResult(error,data))
//     })
// })

// router.put('/:ticket_no',(request,response)=>
// {
//     const {ticket_no} = request.params
//     const {no_of_seats} = request.body
//     const {seat_no} = request.body
//     const {source_city_id} = request.body
//     const {destination_city_id} = request.body
//     const {bus_no} = request.body
   
//     const connection = db.connect()

//     const statement = `update Ticket set no_of_seats=${no_of_seats},seat_no=${seat_no},
//     source_city_id=${source_city_id},destination_city_id=${destination_city_id},
//     bus_no='${bus_no}' where ticket_no=${ticket_no}`

//      connection.query(statement,(error,data)=>
//      {
//        connection.end()
//        response.send(utils.createResult(error,data))
//      })   
// })

module.exports = router