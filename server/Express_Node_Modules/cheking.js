const db = require('./db')
const utils = require('./utils')
const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'thumbnails/'})

const router = express.Router()

router.post('/draw', (request, response) => {
    const{source_city_name,destination_city_name} = request.body
    const connection = db.connect()
    const statement = ` select s.source_city_name,d.destination_city_name from Bus b inner join
     SourceCity s on(b.source_city_id=s.source_city_id) inner join DestinationCity d on 
     (b.destination_city_id=d.destination_city_id) where s.source_city_name='${source_city_name}' 
     and d.destination_city_name='${destination_city_name}'`
    connection.query(statement, (error, buses) => {
        connection.end()
        
        if (buses.length == 0) {
            response.send(utils.createResult('bus does not exist'))
        } else {
            const bus = buses[0]
            const info = {
                source_city_name: bus['source_city_name'],
                destination_city_name:bus['destination_city_name']
                }

                const statement2=`select b.bus_name,b.price,b.bus_type,s.source_city_name,d.destination_city_name,
                b.arrival_time,b.departure_time from Bus b inner join SourceCity s 
                on(b.source_city_id=s.source_city_id) inner join DestinationCity d 
                on(b.destination_city_id=d.destination_city_id) where s.source_city_name='${source_city_name}' and 
                d.destination_city_name='${destination_city_name}' ;`
                connection.query(statement2, (error, data) => {
                    connection.end()
                    const buses = []
                    for (let index = 0; index < data.length; index++) {
                        const Bus = data[index]
                        buses.push({
                            bus_name: Bus['bus_name'],
                            price: Bus['price'],
                            arrival_time: Bus['arrival_time'],
                            departure_time:Bus['arrival_time'],
                            bus_type:Bus['bus_type'],
                            source_city_name:Bus['source_city_name'],
                            destination_city_name:Bus['destination_city_name']
                        })
                    }
            response.send(utils.createResult(null, info))
        
    })
    }
  })
  
})


 
module.exports = router