const express = require('express')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const UserModel = require('../model/user.model')

const userRoute = express.Router()


userRoute.post('/signup',async(req,res)=>{
    const { email,password } = req.body
    try {
        
        // console.log(email,password)
        const user = UserModel.find({email})

        if(user.length>0){
            res.status(200).send({msg:"user already exists...!"})
           
        }else{
            
            const hashP =await bcrypt.hash(password,5)

            const userObj=new UserModel({...req.body,password:hashP})
            const result = await userObj.save()
            // console.log(userObj)
            res.status(200).send({msg:"registered successful",result})
        }
        
    } catch (err) {
        res.status(400).send({error:err.message})
        
    }
})

userRoute.post('/login',async(req,res)=>{
    const { email,password } = req.body
    try {
        
        const user =await UserModel.findOne({email:email})
        
        // console.log(user)
        const decoded =await bcrypt.compare(password,user.password)
        if(!decoded){
            res.status(200).send({msg:"user does not exists...!"})
           
        }
              // console.log(decoded)
            if(decoded && email === user.email){
                const token =jwt.sign({Email:user.email},process.env.privateKey)
                console.log(token)

                  res.status(200).send({msg:"login successful",token})
            }
        
        
    } catch (err) {
        res.status(400).send({error:err.message})
        
    }
})

module.exports=userRoute