import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

export function App() {
  const numberArray = [];
  const [showForm, setShowForm] = useState(false); // State to track form visibility

  // Function to fetch tasks from the server
  function fetchTasks() {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.accessToken) {
        throw new Error('Access token not found in localStorage');
      }

      const token = user.accessToken;

      fetch('http://localhost:8080/getTasks', {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "mode": "cors",
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch tasks');
          }
          return response.json();
        })
        .then(data => {
          setTasks(data.reverse());  // Reverse the tasks array when setting it

          numberArray.splice(0, numberArray.length);
          let currentLength = 1;

          data.forEach(task => {
            numberArray.push({ taskid: task.taskid, taskName: task.taskName, taskDescription: task.taskDescription, length: currentLength });
            currentLength++;
          });
        })
        .catch(error => {
          console.error('Fetch error: ', error);
        });
    } catch (error) {
      console.error('Error in fetchTasks: ', error);
    }
  }

  const fetchTasksCallback = useCallback(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchTasksCallback();
  }, [fetchTasksCallback]);

  // useStates for task fields and tasks list
  const [taskDescription, setTaskDescription] = useState('');
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  // Function to add a new task
  function addTask() {
    // Getting the token for validation
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    if (taskName && taskDescription) {
      const url = `http://localhost:8080/addTask?taskName=${encodeURIComponent(taskName)}&taskDescription=${encodeURIComponent(taskDescription)}`;

      fetch(url, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "mode": "cors",
        },
        body: JSON.stringify({ taskName, taskDescription })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add task');
          }
          fetchTasks();
        })
        .catch(error => {
          console.error('Add task error: ', error);
        });
    }
  }

  // Function to delete a task
  function delTask(index) {
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    const url = `http://localhost:8080/delTask/${encodeURIComponent(index)}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`,
        "mode": "cors"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
        setTasks(tasks.filter(task => index !== task.taskid));
        fetchTasks();
      })
      .catch(error => {
        console.error('Delete task error: ', error);
      });
  }

  // Function to edit a task
  function editTask(index) {
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    if (index !== null && index !== '') {
      const newTaskName = prompt('Enter new Task name for task ' + index);

      const url = `http://localhost:8080/uptTask/${encodeURIComponent(index)}`;
      const requestBody = {
        taskName: newTaskName,
        taskDescription: 'Updated Task Description'
      };

      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
          "mode": "cors"
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to edit Task');
          }
          fetchTasks();
        })
        .catch(error => {
          console.error('Error editing task: ', error);
        });
    } else {
      alert('Please provide a valid value.');
    }
  }

  // Function to toggle task description visibility
  const toggleExpandTask = (taskid) => {
    setExpandedTaskId(expandedTaskId === taskid ? null : taskid);
  };

  return (
    <div className='biggerBox'>
      <div className='margin'>
        <div id='container'>
          <h1 id='todoh1'>ToDo List</h1>
        </div>

        {/* Button to toggle form visibility */}
        {!showForm && (
          <button className="addTaskButton" onClick={() => setShowForm(true)}>Add A Task</button>
        )}

        {/* Form for adding a task */}
        {showForm && (
          <div className='fancyForm'>
            <button className="closeButton" onClick={() => setShowForm(false)}>X</button>
            <form onSubmit={(event) => {
              event.preventDefault();
              addTask();
            }}>
              <label htmlFor="taskName">Task Name:</label>
              <input
                type="text"
                value={taskName}
                id="taskName"
                name="taskName"
                onChange={(e) => setTaskName(e.target.value)}
              /><br /><br />
              <label htmlFor="taskDescription">Task Description:</label>
              <input
                type="text"
                value={taskDescription}
                id="taskDescription"
                name="taskDescription"
                onChange={(e) => setTaskDescription(e.target.value)}
              /><br /><br />
              <input type="submit" value="Submit" />
            </form>
          </div>
        )}

        {/* Task List */}
        <div className='wholeList'>
          {tasks.map((task, index) => (
            <div className='inLine' key={task.taskid}>
              <ul>
                <div className="buttonList">
                  <button
                    className={`todobutton ${expandedTaskId === task.taskid ? 'expanded' : ''}`}
                    onClick={() => toggleExpandTask(task.taskid)}
                  >
                    <strong>
                      {index + 1} | TODO: {task.taskName}  {/* Adjusted for reverse order */}
                    </strong>
                    {expandedTaskId === task.taskid && (
                      <div className="taskDescription">
                        {task.taskDescription}
                      </div>
                    )}
                  </button>
                  <div className="buttons">
                    <button id='editButton' onClick={() => editTask(task.taskid)}>Edit</button>
                    <button id='delButton' onClick={() => delTask(task.taskid)}>X</button>
                  </div>
                </div>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
