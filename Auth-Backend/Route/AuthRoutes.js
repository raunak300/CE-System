const express=require('express')
const router=express.Router()

const {login,signup,check}= require('../Controller/Auth.js')

router.post('/auth/login',login)
router.post('/auth/signup',signup)
router.get('/auth/check',check)

module.exports= router;