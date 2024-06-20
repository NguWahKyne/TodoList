import { useState } from "react";

function TaskForm({onAdd}){
    const [taskName ,setTaskName] =useState('');

    function handleSubmit(e){
        e.preventDefault();
        onAdd(taskName);
        setTaskName('');
    }

    return(
            <form className="add-task" onSubmit={handleSubmit}>
                <input type="text" 
                value={taskName} 
                onChange={e=>setTaskName(e.target.value)}                       
                placeholder='Add your todo'/>
                {/* <button>+</button> */}
        </form>
    )
}

export default TaskForm;