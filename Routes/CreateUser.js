const express=require('express')
const router=express.Router()
const { body, validationResult } = require('express-validator');


const User=require('../models/User')

const bcrypt= require('bcryptjs')

const jwt=require('jsonwebtoken')


//Creating the endpoint for the user to Create new accocunts

router.post('/createuser',
[body('email').isEmail(),

body('password','Incorrect Password').isLength({ min: 5 })],
async (req,resp)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }

    const salt= await bcrypt.genSalt(10);
    let secPassword= await bcrypt.hash(req.body.password,salt)
    

    try {
        await User.create(
        {
            name:req.body.name,
            email:req.body.email,
            password:secPassword,
            location:req.body.location,

        })
        resp.json({success:true})
    } catch (error) {
        console.log(error)
        resp.json({success:false})
    }
})

module.exports=router;