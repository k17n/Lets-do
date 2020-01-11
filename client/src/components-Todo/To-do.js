import React,{Component} from 'react';
import Calender from './Calender';
import RenderedItem from './RenderedItem';






class Todo extends Component{


    constructor(){    
        super()  
     this.state={
           text:'',
           taskobject:{
               task:"",
               checked:false,
               key:'',
               date:'',
               userid:localStorage.getItem("id") || ''
           },
           taskarray: []
        }
    
        this.Dates=new Date().getDate()
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deletefn= this.deletefn.bind(this)
        this.taskeditfn= this.taskeditfn.bind(this)
        this.checkfn= this.checkfn.bind(this)
        this.fetcheditfn= this.fetcheditfn.bind(this)
        this.selectedDatesfn= this.selectedDatesfn.bind(this)
    }

    async componentDidMount() {
        try{
            const montharray=['January','Feburary','March','April','May','June','July','August','September','October','November','December']
            const month=montharray[new Date().getMonth()]
            const currentDate=new Date().getDate()+''+month
            const options= {
                method:'GET',
                headers: {
                   'Content-Type': 'application/json',
                   'auth':`${localStorage.getItem('Token')}`
                  
                 },
            }
       const response = await fetch(`/Todo/api/${currentDate},${localStorage.getItem("id")}`,options)
         const data = await response.json()
         if(data){
            this.setState({
                taskarray:data
            })
         }else{
            this.setState({
                taskarray:[]
            })
         }}catch(error){
             console.log(error)
         }
      }

    handleChange(e){
        const montharray=['January','Feburary','March','April','May','June','July','August','September','October','November','December']
        const month=montharray[new Date().getMonth()]
        this.setState({
            text:e.target.value,
            taskobject:{
                task:e.target.value,
                checked:false,
                key:Date.now(),
                date:this.Dates+''+month,
                userid:localStorage.getItem('id')
            }
        })
       
      }

      handleSubmit(e){
          e.preventDefault()
           let text = this.state.text
           if(text!== ''|| null){
           let taskobjects = this.state.taskobject
           let arraycombiner = []

           arraycombiner =[...this.state.taskarray,taskobjects]
          

        this.setState({
            text:'',
            taskobject:{
                task:'',
                key: ''
            },
            taskarray:arraycombiner

        })
       
       

        const postdata = taskobjects

         const options= {
             method:'POST',
             headers: {
                'Content-Type': 'application/json',
                'auth':`${localStorage.getItem('Token')}`
               
              },
              body: JSON.stringify(postdata)
         }

         fetch('/Todo/api',options)
     
           }
    
      }

      deletefn(key){
         const  filteredtask = this.state.taskarray.filter(task=>
             task.key!==key
         )

         this.setState({
             taskarray:filteredtask
         })
           
         fetch(`/Todo/delete/${key}`,{
             method:'DELETE',
             headers: {
                'Content-Type': 'application/json',
                'auth':`${localStorage.getItem('Token')}`
               
              }
         })
      }

      taskeditfn(key,text){
        
         const editedtask = this.state.taskarray
        
            editedtask.map(item =>{
                if(item.key===key){
                  return  item.task = text} 
                })

               

       this.setState({
            taskarray:editedtask
     })

      }

      fetcheditfn(key,text){


        fetch(`/Todo/patch/${key},${text}`,{
            method:'PATCH',
            headers: {
               'Content-Type': 'application/json',
               'auth':`${localStorage.getItem('Token')}`
              
             }
        })
             
      }

      checkfn(key,checked){
         
        const array = this.state.taskarray
        
        array.map(item=>{
            if(item.key===key && checked==false){
                return item.checked= true
              
                  
            }else if(item.key===key && checked==true){
                 return item.checked = false
            }
       
            
      
       
    })
        this.setState({
            taskarray:array
        })
           const editedcheckarray=this.state.taskarray.filter(item=>{
           return  item.key===key
         })
        
         fetch(`/Todo/put/${key}`,{
            method:'PUT',
            headers: {
               'Content-Type': 'application/json',
               'auth':`${localStorage.getItem('Token')}`
              
             },
             body: JSON.stringify(editedcheckarray)
        })
        }


       async selectedDatesfn(date,month){
            this.Dates=date
            const selectedDate=this.Dates+''+month
           
            const options= {
                method:'GET',
                headers: {
                   'Content-Type': 'application/json',
                   'auth':`${localStorage.getItem('Token')}`
                  
                 },
            }
          
            const response = await fetch(`/Todo/api/${selectedDate},${localStorage.getItem('id')}`,options)
              const data = await  response.json()
               if(data){
            this.setState({
                taskarray:data
            })
         }else{
            this.setState({
                taskarray:[]
            })
         }
        }
    render(){
    return(
        <div className="todo">
              <Calender selectedDates={this.selectedDatesfn}/>
              <div className="todo-task">
            <h2 >Today's Task</h2>
            <form onSubmit={this.handleSubmit}>
                <label className="task-label">
             <input type="text" className="custom-inputbox" placeholder="Add a new task.."  value={this.state.text} onChange={this.handleChange}/><div className="plusdiv"></div>
             <i className="fas fa-check"></i></label></form>
             <RenderedItem  taskdata={this.state.taskarray} deletetask={this.deletefn} taskedit={this.taskeditfn} checkboxhandler={this.checkfn} fetchedit={this.fetcheditfn}/>
        </div>
        </div>
        
    )
    }
}

export default Todo;