const db = require('./db')
const utils = require('./utils')
const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'thumbnails/'})

const router = express.Router()

//admin
router.get('/', (request, response) => {
  const connection = db.connect()
  const statement = `select * from Bus`
  connection.query(statement, (error, data) => {
      connection.end()
      const buses = []
      for (let index = 0; index < data.length; index++) {
          const Bus = data[index]
          buses.push({
              bus_no: Bus['bus_no'],
              bus_name: Bus['bus_name'],
              no_of_seats: Bus['no_of_seats'],
              price: Bus['price'],
              arrival_time: Bus['arrival_time'],
              departure_time:Bus['arrival_time'],
              duration:Bus['duration'],
              driver_id:Bus['driver_id'],
              bus_type:Bus['bus_type'],
              source_city_id:Bus['source_city_id'],
              destination_city_id:Bus['destination_city_id'],
              bus_date:Bus['bus_date']
          })
      }
      response.send(utils.createResult(error, buses))
  })
})
//admin
router.get('/data', (request, response) => {
  const connection = db.connect()
  const statement = `select * from Bus`
  connection.query(statement, (error, data) => {
      connection.end()
      response.send(utils.createResult(error, data))
  })
})


//admin
router.post('/',(request,response)=>
{
    const connection = db.connect()

    const{
        bus_no,
        bus_name,
        no_of_seats,
        price,
        arrival_time,
        departure_time,
        duration,
        driver_id,
        bus_type,
        source_city_id,
        destination_city_id,
        bus_date
    }=request.body

    const statement = `insert into Bus (bus_no,bus_name,no_of_seats,price,arrival_time,departure_time,
        duration,driver_id,bus_type,source_city_id,destination_city_id,bus_date) values ('${bus_no}','${bus_name}',${no_of_seats},${price},
        '${arrival_time}','${departure_time}','${duration}',${driver_id},'${bus_type}',${source_city_id},${destination_city_id},'${bus_date}')`

     connection.query(statement,(error,data)=>
     {
      connection.end()
      response.send(utils.createResult(error,data))
     })
   })

   //amin
   router.delete('/delete/:bus_no',(request,response)=>
{
    const {bus_no} = request.params
    const connection=db.connect()
    const statement = `delete from Bus where bus_no='${bus_no}'`
    connection.query(statement,(error,data)=>
    {
      connection.end()
      response.send(utils.createResult(error,data))
    })
})

//unused
router.put('/:bus_no',(request,response)=>
{
    const {bus_no} = request.params
    const {bus_name} = request.body
    const {no_of_seats} = request.body
    const {price} = request.body
    const {arrival_time} = request.body
    const {departure_time} = request.body
    const {duration} = request.body
    const {driver_id} = request.body
    const {bus_type} = request.body
    
    const connection = db.connect()

    const statement = `update Bus set bus_name='${bus_name}',no_of_seats=${no_of_seats},price=${price},arrival_time='${arrival_time}',
    departure_time='${departure_time}',duration='${duration}',driver_id=${driver_id},bus_type=${bus_type} where bus_no='${bus_no}'`
     connection.query(statement,(error,data)=>
     {
       connection.end()
       response.send(utils.createResult(error,data))
     })   
})

//client
  router.get('/:source_city_name/:destination_city_name', (request, response) => {
  
     const {source_city_name} = request.params
     const {destination_city_name} = request.params
    
     const connection = db.connect()
     const statement = `select b.bus_no,b.bus_name,b.price,b.bus_type,s.source_city_name,d.destination_city_name,
     b.arrival_time,b.departure_time from Bus b inner join SourceCity s 
     on(b.source_city_id=s.source_city_id) inner join DestinationCity d 
     on(b.destination_city_id=d.destination_city_id) where s.source_city_name='${source_city_name}' 
     and d.destination_city_name='${destination_city_name}'`
     connection.query(statement, (error, data) => {
             connection.end()
             const buses = []
             for (let index = 0; index < data.length; index++) {
             const Bus = data[index]
             buses.push
             ({ 
               bus_no:Bus ['bus_no'],
               bus_name: Bus['bus_name'],
               price: Bus['price'],
               bus_type:Bus['bus_type'],
               arrival_time: Bus['arrival_time'],
               departure_time:Bus['arrival_time'],
               source_city_name:Bus['source_city_name'],
               destination_city_name:Bus['destination_city_name'],
              })
             }
             if (data.length == 0)
             {
               response.send(utils.createResult('bus does not exist'))
             }
             else
             response.send(utils.createResult(error, data))
         })
       })

       router.get('/:bus_no',(request,response)=>
      {
          const {bus_no} = request.params
          const connection=db.connect()
          const statement = `select bus_no,seat_no,status from bus_seat where bus_no='${bus_no}'`
          connection.query(statement, (error, data) => {
            connection.end()
            const seats = []
            let seat_no=0
            for (let index = 0; index < data.length; index++) {
            const Seat = data[index]
            seats.push
            ({ 
              bus_no:Seat['bus_no'],
              seat_no:Seat['seat_no'],
              status:Seat['status']
             })
            }
            if (data.length == 0)
            {
              response.send(utils.createResult('no seats available'))
            }
            else
            response.send(utils.createResult(error, data))
        })
      })

     
    
module.exports = router