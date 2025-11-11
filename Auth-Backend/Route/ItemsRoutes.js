const { adminCart } = require("../Controller/ItemsA")
const tokenmiddleware = require("../Middleware/mid")

const express=require('express')
const router=express.Router()

router.get('/addcart/admin/:category',tokenmiddleware,adminCart)


module.exports = router;