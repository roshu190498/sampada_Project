
const db = require('./db')
const utils = require('./utils')
const express = require('express')
const router = express.Router()

router.get('/:user_id', (request, response) => {
  
    const {user_id} = request.params
   
    const connection = db.connect()
    const statement = `select full_name,age,gender,mob_no from User where user_id=${user_id}`
    connection.query(statement, (error, data) => {
            connection.end()
            response.send(utils.createResult(error, data))
        })
      })

module.exports = router