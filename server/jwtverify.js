const jwt = require('jsonwebtoken')

function verify (req,res,next){
   const token = req.headers.auth
   console.log(` token is ${token}`)
   if(!token) return res.status(401).send("access denied")

   try{
       const verification = jwt.verify(token,process.env.TOKEN_SECRET)
       req.user =verification
       console.log(req.user)
       next()
         
   }
   
   catch(err){
       res.status(400).send('invalid token')
   }
}


module.exports = verify