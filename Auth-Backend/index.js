const express=require('express')
const app=express()
const cookieParser = require('cookie-parser');
var cors = require('cors')

const dotenv=require('dotenv')
dotenv.config()

const corsOptions={
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

const port=process.env.PORT;

const Authroutes=require('./Route/Auth')
app.use('/api/user',Authroutes)


app.listen(port,(req,res)=>{
    console.log(`listening on port: ${port}`)
})