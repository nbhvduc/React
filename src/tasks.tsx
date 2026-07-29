import { Protofile_Task } from "./protofile_tasks"
import './tasks.css'

const tasks=[
    {
        id:1,
        name:"Learn React"


    },
    {
        id:2,
        name:"Learn Frontend"
    }
]

export function Tasks(){
    return(
        <div>
            {tasks.map((task)=>(
                <Protofile_Task
                key={task.id}
                id={task.id}
                name={task.name}/>

            ))}
        </div>
    )
}