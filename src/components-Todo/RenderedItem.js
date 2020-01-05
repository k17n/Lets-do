import React from 'react';

function RenderedItem(props){
       const data = props.taskdata
 
      const mapping = data.map((item,index) =>{
                     
       return   <div key={index} className="eachtaskwrapper" style={item.checked=== true ? { opacity:'0.35'} : {opacity:'1'}}>
                  <label  key={item.key} className="taskwrapper"> 
                  <input type="checkbox" name="tasks" className="taskcheckbox" value={item.checkbox} onClick={()=>props.checkboxhandler(item.key,item.checked)}/><div className="customCheckbox"></div>
                 <form  onSubmit={(e)=> {e.preventDefault()
                    props.fetchedit(item.key,item.task)
                    }}><input type="text" value= {item.task} className="taskinputbox"  onChange={(e)=> {props.taskedit(item.key,e.target.value)}}/></form> </label>
                  <i className="fas fa-times" onClick={()=>{props.deletetask(item.key,item.task)}} ></i>
                 </div>
     })
  
    return(

        <React.Fragment>
              {mapping}
        </React.Fragment>
    )

}
export default RenderedItem;