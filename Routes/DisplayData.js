const express=require('express')
const router=express.Router()

router.use('/foodData',(req,resp)=>{
    try {
        resp.send([global.food_items,global.foodCategory])
    } catch (error) {
       console.error(error.message) 
    }
})

module.exports=router