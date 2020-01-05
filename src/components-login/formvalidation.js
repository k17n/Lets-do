
function formvalidation(email,password){
    let errors = {};
    // Email Errors
    if (!email) {
      errors.email = "Required Email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }
    // Password Errors
    if (!password) {
      errors.password = "Required Password";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
  
   return errors
}




export default formvalidation