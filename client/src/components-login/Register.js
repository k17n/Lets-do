import React,{useState}  from 'react';
import formvalidation from './formvalidation';
import {Link,Redirect} from 'react-router-dom';



function Register(){
  const [inputvalue,setInput]=useState({
    username:'',
    email:'',
    password:''
  })
  const [submitValue,setSubmitvalue]=useState({
    username:'',
    email:'',
    password:''
  })
  const [errors,setErrors]=useState({})
  const [authenticated,setAuth]= useState(false)
  


  function handlechange(e){
    setInput({
    ...inputvalue,
     [e.target.name]:e.target.value
    }
  ) 
  }

  

 async  function  handlesubmit(e){
 
    e.preventDefault()
    const username= inputvalue.username
   const email = inputvalue.email;
   const password= inputvalue.password;
   const errorsvalue = formvalidation(email,password)
  
   setErrors(errorsvalue)
  
   
    setSubmitvalue({
      username:username,
      email:email,
      password:password
    })

   

    
    setInput({
      username:'',
      email:'',
      password:'',
    })
    
     const postdata = {
       username,
       email,
       password
     }
     
     const options= {
      method:'POST',
      headers: {
         'Content-Type': 'application/json'
        
       },
       body: JSON.stringify(postdata)
  }

    const response = await fetch('/api/register',options)
    const  data = await response.json()
    console.log(data)
   
    if (data=="email already exists"){
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
      <h2>Create Account</h2>
     <form onSubmit={handlesubmit}>
     <label >Username:</label>
       <input name="username" type="text" placeholder="Name" id="username" required value={inputvalue.username} onChange={handlechange} autoComplete="off"  /><br/>
       <label >Email:</label>
       <input name="email" type="text" placeholder="reba21@gmail.com" id="email" required value={inputvalue.email} onChange={handlechange} autoComplete="off"  /><br/>
      {errors.email && <p className="error-text">{errors.email}</p>}
       <label >Password:</label>
       <input name="password" type="password" placeholder="password" id="pass" required value={inputvalue.password} onChange={handlechange} /><br/>
       {errors.password && <p className="error-text" >{errors.password}</p>} {errors.server && <p className="error-text" >{errors.server}</p>}
        <button className="login-button" type="submit">Register</button>
     </form>
     <Link to="/">Already have an account with us </Link>
    </div>
    </div>
   )
}







export default Register;