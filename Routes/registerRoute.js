const router = require('express').Router()
const User= require('../models/registermodal')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/register', async (req,res)=>{
    console.log(req.body)
 await User.find({email:req.body.email}).exec(async (err,data)=>{
  if(err){
      response.end()
  }else{
    
    const emailExist = data
     console.log(emailExist.length)
  if(emailExist.length > 0){
    console.log(`already ${emailExist}`)
   return res.json("email already exists").status(400)
  
 }
 const salt = await bcrypt.genSaltSync(10)
const hash = await bcrypt.hash(req.body.password,salt)

      const user = new User({
          name:req.body.username,
          email:req.body.email,
          password:hash
      })
       
      try{
          const usersaved = await user.save()
          console.log(usersaved)
          const Token = jwt.sign({_id:usersaved._id},process.env.TOKEN_SECRET)
          const id= usersaved._id
          console.log(Token,id)
          res.json({
            Token:Token,
            id:id} )

      }catch(err){
        res.status(400).send(err)
      }

    }
  })
})
  




router.post('/Login', async (req,res)=>{
 
     await User.findOne({email:req.body.email}).exec ( async (err,data)=>{
     if(err){
        response.end()
    }else{
      const user = data
    
      if(!user) {
        console.log('email doesnt exist')
        return res.json("Email or password is wrong").status(400)}
  
      const passwordcompare = await bcrypt.compare(req.body.password,user.password)
      if(!passwordcompare) {
        console.log('password is wrong')
        return res.json('Email or password is wrong').status(400)}

       
        const Token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
        const id = user._id
        res.json({
          Token:Token,
          id:id} )

   
    
        
    }})
   
 
})

module.exports=router