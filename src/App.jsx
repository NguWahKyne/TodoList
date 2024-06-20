import './styles.scss'
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { useState ,useEffect} from 'react';
import { FaAngleDown } from 'react-icons/fa';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter]= useState('all');
  

 useEffect(() => {
    fetchTasks();
  }, [filter]);

  //const fetchTasks=() => {
    // let url = 'http://localhost:3001/todos';
    // if (filter === 'completed') {
    //   url += '?completed = true';
    // } else if (filter === 'incomplete') {
    //    url += '?completed = false';
    // }

    const fetchTasks = () => {
      let url = 'http://localhost:3001/todos';
      if (filter === 'true') {
        url += '?completed=true';
      } else if (filter === 'false') {
        url += '?completed=false';
      }
    fetch(url)
      .then(res => res.json())
      .then(data => setTasks(data));
  };
  
  const addTask =(title)=>{
    const newTask ={title, done:false ,completed: false};
    // const newTask ={title, done:false };
    fetch('http://localhost:3001/todos' ,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(newTask),
    })
    .then(res =>res.json())
    .then(data=>setTasks(prev => [...prev, data]));
  };

  const removeTask = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setTasks(prev => prev.filter(task => task.id !== id));
    });
  };

  const updateTaskDone = (id, newDone) => {
    const task = tasks.find(task => task.id === id);
    const updatedTask = { ...task, done: newDone ,completed: newDone};
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then(res => res.json())
      .then(updated => {
        setTasks(prev => prev.map(task => (task.id === id ? updated : task)));
      });
  };

  

const editTask = (id, newTitle) => {
    const task = tasks.find(task => task.id === id);
    const updatedTask = { ...task, title: newTitle };
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then(res => res.json())
      .then(updated => {
        setTasks(prev => prev.map(task => (task.id === id ? updated : task)));
      });
  };

  const progressComplete =tasks.filter(t=> t.completed).length;
  const progressTotal= tasks.length;
  

  return (
    <>
      <div className='container'> 
          <div className='progress-container'>
            <h1 className='title-txt'> Progress</h1>
                  <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${(progressComplete / progressTotal) * 100}%` }}
                      ></div>
                  </div>
          </div>
          {/* task section */}
          <div> 
            <div className='task-title'>
              <h3> Task</h3>
            </div>
            
            <div className='task-action'>
              <select className='custom-select' onChange={(e) => setFilter(e.target.value)}> 
                <option value="all">All</option>
                <option value="true">Done</option>
                <option value="false">Undone</option>
              </select> 
          </div>


          </div>
              {tasks.map((task,id) =>(
                <TaskList key={task.id} 
                {...task}
                onEdit={(newTitle) => editTask(task.id,newTitle)}
                remove={()=> removeTask(task.id)}
                onToggle={(done) => updateTaskDone(task.id,done)}
                />
              ))}
              <TaskForm onAdd={addTask}/>
       </div>
    
    </>
  )
}

export default App
