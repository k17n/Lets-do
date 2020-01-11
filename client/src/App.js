import React  from 'react';
import Login from './components-login/login'
import Register from './components-login/Register'
import AppTodo from "./components-Todo/AppTodo"
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
      (localStorage.getItem("Token")!=null)
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

function App(){
  return(

    <BrowserRouter>
      <Switch>
        <Route  path="/login" component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <PrivateRoute exact path='/' component={AppTodo}></PrivateRoute>
      </Switch>
   </BrowserRouter>


  )
  }

export default App;