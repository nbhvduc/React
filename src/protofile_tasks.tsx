import { useState } from "react" 
import './tasks.css'

export function Protofile_Task({id,name}:any){
    const[isDone,setIsDone]=useState(false)
    return(
    <div className="task_container">
        <div className="info">
            <p>{id}</p>
            <h5 className={isDone? "taskDone":""}>{name}</h5>
        </div>
   
        <button className="btn_edit" onClick={()=>setIsDone(true)}> Done </button>
        <button className="btn_edit_not_done" onClick={()=>setIsDone(false)}> Not Done </button> 


    </div>



    )
}