const express = require ('express')
const bodyParser = require('body-parser')

const routerBusType = require('./bus_type')
const routerSourceCity = require('./SourceCity')
const routerDestinationCity = require('./DestinationCity')
const routerPickupPoint = require('./pickup_point')
const routerDroppingPoint = require('./dropping_point')
const routerBus = require('./bus')
const routerDriver = require('./driver')
const routerTicket = require ('./ticket')
const routerUser = require('./user')
const routerPaymentmethod = require('./paymentmethod')
const routerBusDetails = require('./bus1')
const routerSeat = require('./busSeat')
const routerUser1 = require('./user1')
//const routerChecking = require('./checking')

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Method", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.use(bodyParser.json())
app.use('/bus_type',routerBusType)
app.use('/SourceCity',routerSourceCity)
app.use('/DestinationCity',routerDestinationCity)
app.use('/pickup_point',routerPickupPoint)
app.use('/dropping_point',routerDroppingPoint)
app.use('/bus',routerBus)
app.use('/driver',routerDriver)
app.use('/ticket',routerTicket)
app.use('/user',routerUser)
app.use('/paymentmethod',routerPaymentmethod)
app.use('/bus1',routerBusDetails)
app.use('/busSeat',routerSeat)
app.use('/user1',routerUser1)
//app.use('/checking',routerChecking)

app.listen(4000,'0.0.0.0',()=>
{
    console.log('server started at 4000')
})