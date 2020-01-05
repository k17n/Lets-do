import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
 


function Calender(props){
  
    let table=''
    let tableArray=[]
    let selectedRow=[]
  
   
    const date = new Date()
    
    const montharray=['January','Feburary','March','April','May','June','July','August','September','October','November','December']
    const dayarray=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const monthno = date.getMonth()

    const month =montharray[monthno]
    
    const year = date.getFullYear()
    const dateno = date.getDate()
    const crctmnno= monthno+1
    const noOFDays = new Date(year,crctmnno,0).getDate()
    const first_date= new Date(year,monthno,1).getDay()
 

    const token = localStorage.getItem('Token')
   
    //days row of table
    const frstrowdata=[]
    const frsttabledata=[]
    
    const mnth=['S','M','T','W','T','F','S']
    for(let i=0;i<=6;i++){
         frsttabledata.push(<th key={i}>{mnth[i]}</th>)
    }

    frstrowdata.push(<tr key="1" className="table-heading">{frsttabledata}</tr>)


  //first row of dates
    
     const firstarray=[]
     let count=1;
    for (let j=0;j<=6;j++){
         if(j<first_date){
            firstarray.push('')
         }else{
          
             firstarray.push(count)
             count++
            
         }

    }    
   
      firstarray.map(item=>{
         if(item===dateno){
             table=0
         }else{return}
            
      })
   
      

//second row of dates
  
    const secondarray=[]

        for(let l=0;l<=6;l++){
          
            
            secondarray.push(count)
               count++
              
           
            
        }

        secondarray.map(item=>{
            if(item===dateno){
                table=1
            }else{return}
               
         })
        
       
          
        
          


 //third row of dates       
       
       const thirdarray=[]
      
    
            for(let m=0;m<=6;m++){
               
         thirdarray.push(count)
                    count++
                    
                   
                  
             
            }
           
            thirdarray.map(item=>{
                if(item===dateno){
                    table=2
                }else{return}
                   
             })
          
      
          


 //fourth row of dates
  const fourtharray=[]
    
            for(let m=0;m<=6;m++){
                 if(count>noOFDays){
                     break
                 }else{
                   
                       fourtharray.push(count)
                        count++
                    
                   
                 }
            }
         
            fourtharray.map(item=>{
                if(item===dateno){
                    table=3
                }else{return}
                   
             })
              
        
//fifth row of dates
     
      const fiftharray=[]
    
            for(let m=0;m<=6;m++){
                 if(count>noOFDays){
                     break
                 }else{
                  
                   fiftharray.push(count)
                        count++
            
                 }
            }
           
            
            fiftharray.map(item=>{
                if(item===dateno){
                    table=4
                }else{return}
                   
             })
          
             tableArray =[firstarray,secondarray,thirdarray,fourtharray,fiftharray]
          selectedRow=tableArray[table]
        
         
        
         const [array,setArray]=useState({
            array:selectedRow,
            index:table,
            selectedDate:dateno,
           
        })
        const[loggedout,setLogout]= useState(false)
       
        const renderedarray=[]
        for(let i=0;i<array.array.length;i++){
            
          renderedarray.push(<td key={i} className={array.array[i]===array.selectedDate ? 'selected-td' : ''}onClick={(e)=>{
              props.selectedDates(e.target.innerText,month)
              selectDate(e.target.innerText,e.target)
              e.target.classList.add('selected-td')

          }}>{ array.array[i]}</td>)
        }
          
  
  


      function prevTable(){
      
      
    
        if(array.index<=0){return}else{
            const tr = document.getElementsByClassName('selector')
            for(let k=0;k<tr[0].cells.length;k++){
            
                tr[0].cells[k].classList.remove('selected-td')
                
            }
        let newIndex=array.index-1
        selectedRow=tableArray[newIndex]
        setArray((prevState)=>({
            ...prevState,
            array:selectedRow,
            index:newIndex,
        
        }))
    }}

    function nextTable(){
     
       
        if(array.index >=4){return}else{
            const tr = document.getElementsByClassName('selector')
            for(let k=0;k<tr[0].cells.length;k++){
             
                tr[0].cells[k].classList.remove('selected-td')
                
            }
        let newIndex=array.index+1
        selectedRow=tableArray[newIndex]
        
        setArray((prevState)=>({
            ...prevState,
            array:selectedRow,             
            index:newIndex,
        
        }))
    }}

    function selectDate(datesel,target){
      
        const tr = document.getElementsByClassName('selector')
         for(let k=0;k<7;k++){
           
             tr[0].cells[k].classList.remove('selected-td')
             
         }
            
         
             
          setArray((prevState)=>({
             ...prevState,
             
              selectedDate:datesel
              
          }))

          target.classList.add('selected-td')
             
        }

       function logoutfn(){
        
           
           localStorage.removeItem("Token")
           localStorage.removeItem("id")
            
                setLogout(true)
          
           
            
        }
    
        if(loggedout) return <Redirect to="/login"/>
      
        
      
    return(
    
        <div className="calender">
            <button className="logout" onClick={logoutfn}>Logout</button>
             <h1>{month.toUpperCase()} {year} </h1>
             <h2>{dayarray[new Date(year,monthno,array.selectedDate).getDay()].toUpperCase()}</h2>
             <h2>{array.selectedDate}</h2>
             <div className='table-wrapper'>
             <table className="custom-table">
                 
             <thead>{frstrowdata}</thead>
                <tbody>
                <tr key="2" className="selector">
                    {renderedarray}
                  
                </tr>
                </tbody>
               
               
               <button className="left-button" onClick={prevTable} ><i className="fas fa-chevron-left"></i></button>
             <button className="right-button"  onClick={nextTable}><i className="fas fa-chevron-right"></i></button>
             </table>
           
             </div>
       
        </div>
       
    )
}

export default Calender ;
