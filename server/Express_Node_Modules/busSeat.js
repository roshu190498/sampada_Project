
const db = require('./db')
const utils = require('./utils')
const express = require('express')
const router = express.Router()

router.get('/:seat_no/:bus_no',(request,response)=>
{
    const {seat_no} = request.params
    const {bus_no} = request.params

    const connection = db.connect()
    const statement=`select seat_no, status from bus_seat where seat_no='${seat_no}' and bus_no='${bus_no}'`
    connection.query(statement,(error,data)=>
    {
     connection.end()
     response.send(utils.createResult(error,data))
    })
})

router.put('toggle/:bus_no/:seat_no',(request,response)=>
{
    const {bus_no} = request.params
    const {seat_no} = request.params
    var status=1
    const {status1} = request.body
    const connection = db.connect()

    const statement = `update bus_seat set status='${status1}' where bus_no='${bus_no}' and seat_no='${seat_no}'`
     connection.query(statement,(error,data)=>
     {
       connection.end()
       response.send(utils.createResult(error,data))
     })   
})

module.exports = router