import React,{useState}  from 'react';
import formvalidation from './formvalidation';
import {Link, Redirect} from 'react-router-dom';



function Login(){
  const [inputvalue,setInput]=useState({
    email:'',
    password:''
  })
  const [submitValue,setSubmitvalue]=useState({
    email:'',
    password:''
  })
  const [errors,setErrors]=useState({})

 const [authenticated,setAuth]=useState(false)


  function handlechange(e){
    setInput({
    ...inputvalue,
     [e.target.name]:e.target.value
    }
  ) 
  }

  

 async function handlesubmit(e){
 
    e.preventDefault()
    
   const email = inputvalue.email;
   const password= inputvalue.password;
   const errorsvalue = formvalidation(email,password)
  
   setErrors(errorsvalue)
  
   
    setSubmitvalue({
      email:email,
      password:password
    })
   
    
       
    
    setInput({
      email:'',
      password:'',
    })

    const postData = {
      email,
      password
    }
    
   
    
    const options= {
      method:'POST',
      headers: {
         'Content-Type': 'application/json'
        
       },
       body: JSON.stringify(postData)
  }
 const response = await fetch('http://localhost:5000/api/Login',options)
 const data = await response.json()

 if (data=="Email or password is wrong"){
   setErrors({server:data})
 }else{
 const Token = data.Token
 const id = data.id
Token ? localStorage.setItem('Token',Token):''
 id ? localStorage.setItem('id',id):''

  localStorage.getItem("Token") ? setAuth(true) : setAuth(false)
 }
      }

 if(authenticated) return <Redirect to="/"/>
 
 
  return(
    <div className="login">
    <div className="wrapper">
      <h2>Log in</h2>
     <form onSubmit={handlesubmit}>
       <label>Email:</label>
       <input name="email" type="text" placeholder="reba21@gmail.com" id="email" required value={inputvalue.email} onChange={handlechange} autoComplete="off"  /><br/>
      {errors.email && <p className="error-text">{errors.email}</p>}
       <label >Password:</label>
       <input name="password" type="password" placeholder="password" id="pass" required value={inputvalue.password} onChange={handlechange} /><br/>
       {errors.password && <p className="error-text" >{errors.password}</p>}  {errors.server && <p className="error-text" >{errors.server}</p>} 
        <button className="login-button" type="submit"  >LOG IN</button>
        <button className="register-button" disabled><Link to="/register">Create Profile</Link></button>
     </form>
    
    </div>
    </div>
   )
}

export default Login;