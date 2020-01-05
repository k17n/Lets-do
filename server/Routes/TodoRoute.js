const router = require('express').Router()
const mongoose = require('mongoose')
const verify = require('../jwtverify')
const db = mongoose.connection
router.post('/api',verify,(request,response) =>{
    console.log(request.body)
    const dataposted = request.body
    db.collection('tasks').insertOne(dataposted)
 } )

 router.get('/api/:id',verify ,(request,response)=>{
    console.log(request.user)
     const resdata=request.params.id.split(',')
     const date=resdata[0]
     const id=resdata[1]
    db.collection('tasks').find({date: date ,'userid': `${id}`}).toArray((err,data)=>{
        if(err){
            response.end()
        }else{
            console.log(data)
            response.json(data)
        }
    })
  
 })

 router.delete('/delete/:key',verify, (request,response)=>{
    const param = request.params.key
    console.log(param)
     paramvalue = JSON.parse(param)
    const query = {key:paramvalue}
    console.log(query)

    db.collection('tasks').findOneAndDelete(query,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }
    })
})

router.patch('/patch/:key',verify, (request,response)=>{
    const param = request.params.key.split(',')
    const paramkey = param[0]
    const paramtext = param[1]
    const jsonkey = JSON.parse(paramkey)
    
    const query={key:jsonkey}
    const system = {task:paramtext}
    console.log(jsonkey,paramtext)
    db.collection('tasks').findOneAndUpdate(query, { $set:system }, {returnOriginal : false}, (err, result) => {
         console.log(result)
         console.log(err)
      });
})

router.put('/put/:key',verify ,(request,response)=>{
    const param = request.params.key
   
    const jsonkey = JSON.parse(param)
    
    const query={key:jsonkey}

    const dataposted = request.body[0].checked

   const system = {checked:dataposted}
 
    db.collection('tasks').findOneAndUpdate(query, { $set:system }, {returnOriginal : false}, function (err, result) {
         console.log(result)
        console.log(err)
      });
})


module.exports=router