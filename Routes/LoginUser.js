const express=require('express')
const app=express();
const router=express.Router();
const bcrypt= require('bcryptjs')

const secretKey=process.env.secretKey
const jwt=require('jsonwebtoken')



const { body, validationResult } = require('express-validator');
const User=require('../models/User')


router.post('/loginuser',
[body('email').isEmail()],
async (req,resp)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }


    let email=req.body.email;

    // const salt= await bcrypt.genSalt(10);
    // let secPassword= await bcrypt.hash(req.body.password,salt)


    try {
        let userData= await User.findOne({email})
        if(!userData)
        {
            return resp.status(400).json({ errors: 'Try to login with Correct Credentials' });
        }

        let comparePassword = await bcrypt.compare(req.body.password,userData.password)

        if(!comparePassword)
        {
            return resp.status(400).json({ errors: 'Try to login with Correct Credentials' });
        }
        

        const data={
            user:{
                id:userData.id
            }
        }
        const authToken= jwt.sign(data,secretKey)
        resp.json({success:true , authToken:authToken})
    } catch (error) {
        console.log(error)
        resp.json({success:false})
    }
})

module.exports=router