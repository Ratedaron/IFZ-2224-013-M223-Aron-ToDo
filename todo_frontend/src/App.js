import React, { useState } from 'react';
import './App.css';

export /*default*/ function App() {

  const [buttonCount, setButtonCount] = useState(0);
  const [tasks, setTasks] = useState([]);

  function addTask() {
    const taskDescription = prompt('Enter a Task description for task ' + (tasks.length + 1));
    if (taskDescription !== null && taskDescription !== '') {
      const updatedTasks = [...tasks, { id: tasks.length + 1, name: 'Task ' + (tasks.length + 1), taskDescription }];
      setTasks(updatedTasks);
    }
  }

  function deleteTask(index) {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  }

  function editTask(index) {
    const updatedTasks = [...tasks];
    const newTaskDescription = prompt('Enter new task name:');
    if (newTaskDescription !== '' && newTaskDescription !== null) {
      updatedTasks[index].taskDescription = newTaskDescription;
      setTasks(updatedTasks);
    }
  }

  return (
    <div className='margin'>

      <div id='container'>
        <h1 id='todoh1'>ToDo List</h1>
        <button id='addButton' onClick={addTask}>+</button>
      </ div>

      <div className='wholeList'>
        {tasks.map((task, index) => (
          <div className='inLine'>
            <ul>
              <div key={task.id} className="task-item">
                <button onClick={() => deleteTask(index)}>Delete</button>
                <button onClick={() => editTask(index)}>Edit</button>

                <button className='buttonList'><strong>{task.name} | TODO: {task.taskDescription} </strong></button>

              </div>
            </ul>
          </div>
        ))}
      </div>
    </div >
  );
}
export default App;
