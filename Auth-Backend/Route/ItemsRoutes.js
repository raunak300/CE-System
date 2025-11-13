const { adminCart, updateItemData } = require("../Controller/ItemsA")
const tokenmiddleware = require("../Middleware/mid")

const express=require('express')
const router=express.Router()

router.get('/addcart/admin/:category',tokenmiddleware,adminCart)
router.post('/updatecart/admin',tokenmiddleware,updateItemData)


module.exports = router;