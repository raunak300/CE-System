const express=require('express')
const app=express()

var cors = require('cors')

const dotenv=require('dotenv')
dotenv.config()

const startWorker=require('./Worker Function/Item-Worker')
const manageDLQ=require('./Worker Function/DLQ-Worker')

app.use(express.json())
app.use(cors())

const port=process.env.PORT; 

app.listen(port,(req,res)=>{
    console.log(`listening on port: ${port}`)
    startWorker();
    manageDLQ();
})