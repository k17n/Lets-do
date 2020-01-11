const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const registerRoute = require('./routes/registerRoute.js')
const TodoRoute= require('./routes/TodoRoute')
const path= require('path')
app.use(express.json())
app.use(cors())
dotenv.config()

mongoose.connect(process.env.URL,{useNewUrlParser: true,useUnifiedTopology: true})
mongoose.connection.once('open',()=>{
    console.log('Mongodb server connected')
}).on('error',()=>console.log('MongoDb server error'))


app.use('/api', registerRoute)
app.use('/Todo',TodoRoute )

if(process.env.NODE_ENV==="production"){

    app.use(express.static('client/dist'))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
    })
}


const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server running at ${port}` )
})




