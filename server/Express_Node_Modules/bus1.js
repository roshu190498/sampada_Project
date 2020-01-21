
const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/:bus_no', (request, response) => {
  
    const {bus_no} = request.params
   
    const connection = db.connect()
    const statement = ` select b.bus_name,b.source_city_id,s.source_city_name,b.destination_city_id,d.destination_city_name,b.arrival_time,
    b.departure_time,b.price,b.bus_type from Bus b inner join SourceCity s on (b.source_city_id=s.source_city_id) 
    inner join DestinationCity d on(b.destination_city_id=d.destination_city_id)
     where b.bus_no='${bus_no}'`
    connection.query(statement, (error, data) => {
            connection.end()
            const buses = []
            for (let index = 0; index < data.length; index++) {
            const Bus = data[index]
            buses.push
            ({ 
              bus_name: Bus['bus_name'],
              source_city_id:Bus['source_city_id'],
              source_city_name:Bus['source_city_name'],
              destination_city_id:Bus['destination_city_id'],
              destination_city_name:Bus['destination_city_name'],
              arrival_time: Bus['arrival_time'],
              departure_time:Bus['arrival_time'],
              price: Bus['price'],
              bus_type:Bus['bus_type']
             })
            }
            if (data.length == 0)
            {
              response.send(utils.createResult('no details'))
            }
            else
            response.send(utils.createResult(error, data))
        })
      })
module.exports = router