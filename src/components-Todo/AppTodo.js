import React from "react"
import TodoUi from "./TodoUi"
import Todo from "./To-do"




function AppTodo(){


return(

  <React.Fragment>
    <div className="todo-ui">
      <TodoUi/>
      <Todo/>
      </div>
  </React.Fragment>



)


}


export default AppTodo;