import React, { useState, useEffect } from 'react';
import './App.css';

export /*default*/ function App() {

  useEffect(() => { //does some wierd shit lol
    fetchTasks();
  }, []); // This empty dependency array ensures the effect runs only once when the component mounts

  const numberArray = [];

  function fetchTasks() {

    fetch('http://localhost:8080/getTasks')
      .then(response => {
        if (!response.ok) {
          throw new Error('failed to fetch tasks');
        }
        return response.json();
      })
      .then(data => {
        setTasks(data);

        // Clear existing numberArray
        numberArray.splice(0, numberArray.length);
        let currentLength = 1;
        // Populate numberArray with task IDs
        data.forEach(task => {
          numberArray.push({ taskid: task.taskid, taskName: task.taskName, taskDescription: task.taskDescription, length: currentLength });
          currentLength++; // Increment after each element handled
        });

        console.log(numberArray);
      })
      .catch(error => {
        console.error('Fetch error: ', error);
      })
  }

  const taskName = 'OOOOOOOOOOOOOO';
  const taskDescription = 'testTaskdes23';

  function addTask() {
    if (taskName !== null && taskName !== '' && taskDescription !== '') {
      const url = `http://localhost:8080/addTask?taskName=${encodeURIComponent(taskName)}&taskDescription=${encodeURIComponent(taskDescription)}`;

      fetch(url, {
        method: 'POST',
        headers: {
        },
        body: JSON.stringify({ taskName: taskName, taskDescription: taskDescription })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add task');
          }
          //getting the updated db again 
          fetch('http://localhost:8080/getTasks')
            .then(response => {
              if (!response.ok) {
                throw new Error('failed to fetch tasks');
              }
              return response.json();
            })
            .then(data => {
              setTasks(data);
            })
            .catch(error => {
              console.error('Fetch error: ', error);
            })
        })
        .catch(error => {
          console.error('Add task error: ', error);
        });
    }
  }
  function testIndex(taskid) {
    return numberArray.findIndex(item => item.taskid === taskid);
  }

  function delTask(index) {
    const url = `http://localhost:8080/delTask/${encodeURIComponent(index)}`;
    fetch(url, {
      method: 'DELETE',
      headers: {}
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }

        //  Optional Actions - Refresh the task list after deletion
        fetch('http://localhost:8080/getTasks')
          .then(response => {
            if (!response.ok) {
              throw new Error('failed to fetch tasks');
            }
            return response.json();
          })
          .then(data => {
            setTasks(data);
          })
          .catch(error => {
            console.error('Fetch error: ', error);
          })
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  }

  function editTask(index) {
    if (index !== null && index !== '') {
      const newTaskName = prompt('enter new Task name for task ' + index);

      const url = `http://localhost:8080/uptTask/${encodeURIComponent(index)}`;
      const requestBody = {
        taskName: newTaskName,
        taskDescription: 'Updated Task Description'
      };

      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('failed to eddit Task')
          }
          fetchTasks();
        })
        .catch(error => {
          console.error('Error editing task: ', error);
        });
    }
    else {
      alert('bro, gimme a valid value');
    }
  }
  const [tasks, setTasks] = useState([])

  return (
    <div className='alsoBlue'>
      <div className='margin'>

        <div id='container'>
          <h1 id='todoh1'>ToDo List</h1>
          <button id='addButton' onClick={addTask}>+</button>
        </ div>

        <div className='wholeList'>
          {tasks.map((task, index) => (
            <div className='inLine'>
              <ul>
                <div key={task.taskid} className="buttonList">
                  <button className='todobutton'><strong>
                    {index + 1} | TODO: {task.taskName}
                  </strong></button>
                  <div class="buttons">
                    <button id='editButton' onClick={() => editTask(task.taskid)}>Edit</button>
                    <button id='delButton' onClick={() => delTask(task.taskid)}>X</button>
                  </div>
                </div>
              </ul>
            </div>
          ))}
        </div>
      </div >
    </div>
  );
}
export default App;