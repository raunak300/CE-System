const express=require('express')
const router=express.Router()

const {login,signup}= require('../Controller/Auth.js')

router.post('/auth/login',login)
router.post('/auth/login',signup)

module.exports= router;