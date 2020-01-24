const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

// router.get('/', (request, response) => {
//     const connection = db.connect()
//     const statement = `select * from User`
//     connection.query(statement, (error, data) => {
//         connection.end()
//         const users = []
//         for (let index = 0; index < data.length; index++) {
//             const user = data[index]
//             users.push({
            
//                 email: user['email'],
//                 full_name: user['full_name'],
//                 password: user['password'],
//                 mob_no: user['mob_no']
               

//             })
//         }
//         response.send(utils.createResult(error, users))
//     })
// })

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from User`
    connection.query(statement, (error, data) => {
        connection.end()
        const users = []
        for (let index = 0; index < data.length; index++) {
            const user = data[index]
            users.push({
                user_id: user['user_id'],
                email: user['email'],
                full_name: user['full_name'],
                password: user['password'],
                mob_no: user['mob_no'],
                gender: user['gender'],
                age: user['age']
            })
        }
        response.send(utils.createResult(error, users))
    })
})

router.post('/login', (request, response) => {
    console.log('Loginggggggggggggg in ')
    const {email, password} = request.body
    const connection = db.connect()
    const statement = `select * from User where email = '${email}' and password = '${password}'`
    connection.query(statement, (error, users) => {
        connection.end()
        
        if (users.length == 0) {
            response.send(utils.createResult('user does not exist'))
        } else {
            const user = users[0]
            const info = {
                user_id:user['user_id'],
                email: user['email'],
                password:user['password']
                
            }
            response.send(utils.createResult(null, info))
        }
    })
})

// router.delete('/:user_id',(request,response)=>
// {
//     const {user_id} = request.params
//     const connection=db.connect()
//     const statement = `delete from User where user_id=${user_id}`
//     connection.query(statement,(error,data)=>
//     {
//       connection.end()
//       response.send(utils.createResult(error,data))
//     })
// })



router.post('/register',(request,response)=>
{
 const connection = db.connect()
 const{
    email,
    full_name,
    password,
    mob_no,
    gender,
    age
  } =request.body

  const statement = `insert into User (email,full_name,password,mob_no,gender,age) 
  values ('${email}','${full_name}','${password}',${mob_no},'${gender}',${age})`

  connection.query(statement,(error,data)=>
{
 connection.end()
 response.send(utils.createResult(error,data))
})
})

router.post('/',(request, response) => {
    const { email, full_name, password, mob_no, gender, age, ticket_no, transaction_id} = request.body
   
    const connection = db.connect()
    const statement = `insert into User (email,full_name,password, 
        mob_no, gender, age, ticket_no, transaction_id) values 
    ('${email}', '${full_name}', '${password}', ${mob_no}, '${gender}', ${age}, 
    ${ticket_no},${transaction_id})`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

//client


module.exports = router