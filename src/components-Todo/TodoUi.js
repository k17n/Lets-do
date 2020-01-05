import React from 'react';
import svg from './assets/image.svg';
import png from './assets/svg.png'


function TodoUi(){

return(

   
    <div className="left-side">
       <h1 className="custom-color">ToD<img src={png} alt="todo-icon" width="25" height="25"/></h1>
       <p className="custom-color">Stay on track and Organize your Life with ToDo</p>
       <img  className="to-do-svg" src={svg} alt="to-do-svg" height="55%" width="75%"/>
       <ul className="custom-ul">
         <li>ToDo is your Ultimate Daiky Planner</li>
         <li>Create,assign,organize,prioritize and share tasks</li>
         <li>Alerts,notifications,reminders to keep you on track</li>
       </ul>
    </div>
  


)

}

export default TodoUi;