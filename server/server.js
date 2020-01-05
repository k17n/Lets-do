const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 5000
const cors = require('cors')
const registerRoute = require('./Routes/registerRoute.js')
const TodoRoute= require('./Routes/TodoRoute')
app.use(express.json())
app.use(cors())

app.use('/api', registerRoute)
app.use('/Todo',TodoRoute )


app.listen(port,()=>{
    console.log(`server running at ${port}` )
})

mongoose.connect('mongodb://localhost:27017/Users',{useNewUrlParser: true,  useUnifiedTopology: true })
mongoose.connection.once('open',()=>{
    console.log('Mongodb server connected')
}).on('error',()=>console.log('MongoDb server error'))

