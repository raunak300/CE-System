const express=require('express')
const app=express()

const dotenv=require('dotenv')
dotenv.config()

const connect = require('./Model/connect')

const port=process.env.PORT;

const Authroutes=require('./Route/Auth')
app.use('/api/user',Authroutes)


app.listen(port,(req,res)=>{
    console.log(`listening on port: ${port}`)
    //connect()
})