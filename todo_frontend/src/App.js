import React, { useState, useEffect, useCallback } from 'react';
import './App.css';



export /*default*/ function App() {

  const numberArray = [];

  // this is the fetch function for getting tasks from db, if you want to know what happends when this link gets called go to the Home controller in the backend
  function fetchTasks() {
    //we save the saved token once again here in this function, so that we can use it to send it

    const token = JSON.parse(localStorage.getItem("user")).accessToken; // Token lesen
    //the acuall fetch  with its body to get all tasks, no parameters needed fortunatly
    fetch('http://localhost:8080/getTasks', {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${token}`, // hier wird der Token übergeben <- yes indeed
        "mode": "cors",
      }
    })
      //this is cool, we define what to do after the fetch with "then"
      // we can also use the data the fetch returns lol
      .then(response => {
        if (!response.ok) {
          throw new Error('failed to fetch tasks');
        }
        return response.json();
      })
      //the second thing we do after the fetch
      .then(data => {
        setTasks(data); // we put all the data we got as a respone into a List

        // Clear existing numberArray
        numberArray.splice(0, numberArray.length);
        let currentLength = 1;
        // Populate numberArray with task IDs
        //we carefullly put all the data in array here
        // I did this so that the tasks are numberd
        data.forEach(task => {
          numberArray.push({ taskid: task.taskid, taskName: task.taskName, taskDescription: task.taskDescription, length: currentLength });
          currentLength++; // Increment after each element handled
        });
        // i did this output for testing
      //  console.log(numberArray);
      })
      .catch(error => {
        console.error('Fetch error: ', error);
      })
  }
  //idk what this does
  const fetchTasksCallback = useCallback(() => {
    fetchTasks(setTasks);
  }, [fetchTasks]);

  useEffect(() => {
    fetchTasksCallback();
  }, [fetchTasksCallback]);

  //const taskName = 'OOOOOOOOOOOOOO';
  const taskDescription = 'testTaskdes23';
  const [taskName, setTaskName] = useState('');

  function addTask() {
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    if (taskName !== null && taskName !== '' && taskDescription !== '') {
      const url = `http://localhost:8080/addTask?taskName=${encodeURIComponent(taskName)}&taskDescription=${encodeURIComponent(taskDescription)}`;

      fetch(url, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`, // hier wird der Token übergeben <- yes indeed
          "mode": "cors",
        },
        body: JSON.stringify({ taskName: taskName, taskDescription: taskDescription })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to add task');
          }
          //getting the updated db again 
          //without the array
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

  function delTask(index) {
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
    const url = `http://localhost:8080/delTask/${encodeURIComponent(index)}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`, // hier wird der Token übergeben <- yes indeed
          "mode": "cors"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
        //  Optional Actions - Refresh the task list after deletion
        setTasks(tasks.filter(task => index !== task.taskid));

        fetchTasks();
      })
  }

  function editTask(index) {
    const token = JSON.parse(localStorage.getItem("user")).accessToken;
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
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`, // hier wird der Token übergeben <- yes indeed
          "mode": "cors"
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

  const [clicked, setClicked] = useState(false);
  const [important, setImportant] = useState(false);

  const handleMouseDown = () => {
    setClicked(true);
  };

  const handleMouseUp = () => {
    setClicked(false);
  };

  const handleDoubleClick = () => {
    setImportant(true);
  };

  return (

    <div className='biggerBox'>
      <div className='margin'>



        <div id='container'>
          <h1 id='todoh1'>ToDo List</h1>
        </ div>


        <form onSubmit={(event) => {
          event.preventDefault(); // Prevent the default form submission behavior
          addTask(); // Call addTask function with the content of the form field as parameter
     console.log(taskName);
     }}>
          <label htmlFor="test">testfield:</label>
          <input
            type="text"
            value={taskName}
            id="test"
            name="testfield"
            onChange={(e) => setTaskName(e.target.value)} // Update taskName state with just the string value
            /><br /><br />
          <input type="submit" value="Submit" />
        </form>


        <div className='wholeList'>
          {tasks.map((task, index) => (
            <div className='inLine'>
              <ul>
                <div key={task.taskid} className="buttonList">
                  <button
                    className={`todobutton ${clicked ? 'black-text' : ''} ${important ? 'important' : ''}`}
                    onClick={handleDoubleClick}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                  ><strong>
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