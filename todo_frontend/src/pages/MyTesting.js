import React, { useState } from 'react';
import RobloxScreenShot20240408_111852622 from '../RobloxScreenShot20240408_111852622.png';
import kilo from '../Kilo.png';
import '../App.css';

const talk = {
  intro: 'About page',
  q: 'Hello, how are you?',
  r: 'I am Good'
};
const num = {
  1: '1'
};

const products = [
  { title: 'Cabbage', id: 1, isFruit: false },
  { title: 'Garlic', id: 2, isFruit: false },
  { title: 'Apple', id: 3, isFruit: true },
  { title: 'Banana', id: 4, isFruit: true },
  { title: 'Carrot', id: 5, isFruit: false },
  { title: 'Orange', id: 6, isFruit: true },
  { title: 'Broccoli', id: 7, isFruit: false },
  { title: 'Tomato', id: 8, isFruit: false },
  { title: 'Potato', id: 9, isFruit: false },
  { title: 'Lettuce', id: 10, isFruit: false }
];



function MyButton() {
  return (
    <button>I am a button</button>
  );
}

function AbtPage() {
  return (
    <>
      <h1>{talk.intro}</h1>
      <p>{talk.q}<br />{talk.r}</p>
    </>
  );
}
const content = '1';
const randomNumber = Math.ceil(Math.random() * 2);

function ButtonAlertForButton2() {
  const [count, setCount] = useState(0);
  function HandleClick() {
    setCount(count + 1);
    alert('button pressed ' + count + ' times');
  }
  return (<button id='button1' onClick={HandleClick}>
    helloo
  </button>
  );
}

function ButtonAlert() {
  const [count, setCount] = useState(0);
  function HandleClick() {
    setCount(count + 1);
    alert('button pressed ' + count + ' times');
  }
  return (<button id='button1' onClick={HandleClick}>
    helloo
  </button>
  );
}
function UseStateButton({ count, onClick }) {
  return (
    <button id='button1' onClick={onClick}>
      Clicked {count} times
    </button>
  );
}


export /*default*/ function MyTesting() {

  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  function Square() {
    const [value, setValue] = useState(null);

    function HandleClick() {
      setValue('X');
    }
    return <button className='square' onClick={HandleClick} >{value} </button>;
  }

  const [buttonCount, setButtonCount] = useState(0);

  const addAnotherButton = () => {
    setButtonCount(prevCount => prevCount + 1);
  };

  {//const taskDescription = 'Clean'}

    {/*function DeleteItem(index) {
    setButtonCount(prevTasks => {
      const updatedTasks = [...prevTasks];
      updatedTasks.splice(index, 1);
      return updatedTasks;
    });
  */}
  }



  
  const buttonStyle = {
    position: 'absolute',
    padding: '15px 25px',
    fontSize: '24px',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    outline: 'none',
    color: '#fff',
    borderRadius: '50px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    zIndex: '1', // Ensure buttons appear above each other
  };

  const redButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f44336',
    zIndex: '1', // Increase z-index to place above other buttons
    top: '50px', // Adjust position
    left: '50px', // Adjust position
  };

  const whiteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f1f1f1',
    zIndex: '2', // Adjust z-index to stack between other buttons
    top: '50px', // Adjust position
    left: '125px', // Adjust position to create overlap
  };

  const blueButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'blue',
    zIndex: '3', // Adjust z-index to stack above other buttons
    top: '50px', // Adjust position
    left: '200px', // Adjust position to create overlap
  };

    return (
      <div className='margin'>

<button className="button red" style={redButtonStyle}>Top Button</button>
      <button className="button white" style={whiteButtonStyle}>Middle Button</button>
      <button className="button" style={blueButtonStyle}>Bottom Button</button>
        <br />
        {/*<div id='container'>
        <button id='addButton' onClick={addAnotherButton}><strong>+</strong></button>
        <h1 id='todoh1'>ToDo List</h1>
      </div>
      <div className='wholeList'>
        {[...Array(buttonCount)].map((_, index) => (
          <div className='inLine'>
            <ul >
              <div key={index}>
                <button className='buttonList'><strong>Task: {index + 1} TODO: {ButtonName} </strong></button>
                <button onClick={() => DeleteItem(index)}>delete</button>
              </div>

            </ul>
          </div>
        ))}
      </ div >*/}

        <br />
        <div className="board-row">
          <Square />
          <Square />
          <Square />
        </div>
        <div className="board-row">
          <Square />
          <Square />
          <Square />
        </div>
        <div className="board-row">
          <Square />
          <Square />
          <Square />
        </div>

        {
          randomNumber === 2 && (
            <>
              <h1>Start with a button</h1>
              <MyButton />
              <AbtPage />
              <div className='overAllCenter'>
                <div className='polaroid'>
                  <img src={RobloxScreenShot20240408_111852622} alt="lolyimage" style={{ width: '100%', display: 'block' }} />
                  <div className='container'>
                    <p>This is a Roblox image</p>
                  </div>
                </div>

                <div className='polaroid'>
                  <img src={kilo} alt='hey' style={{ width: '100%', display: 'block' }} />
                  <div className='container'>
                    <p>This is a kilo image</p>
                  </div>
                </div>
              </div>
              <h1>'hello test' {content}{num[1]}</h1>
            </>
          )
        }
        {/* Call HandleClick function when button is clicked */}
        { /*<button id='button1' onClick={HandleClick}>
        Button
      </button>
      <button id='button1' onClick={HandleClick}>
        me 2nd button
      </button> */}



        <UseStateButton count={count} onClick={handleClick} />
        <UseStateButton count={count} onClick={handleClick} />
        <ButtonAlert />
        <ButtonAlertForButton2 />
        <ul>
          {products.map(product => (
            <li className='fruits' key={product.id} style={{ color: product.isFruit ? 'blue' : 'chocolate' }}>
              {product.title}
            </li>
          ))}
        </ul>
        {/*myFirstPostFetch if someone needs it */}
        
        {/*<p style="white-space: pre-wrap;">
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
</p>
*/}

{/*;
function deleteTask(index) {
  const updatedTasks = [...tasks];
  updatedTasks.splice(index, 1);
  setTasks(updatedTasks);
}*/}

{/*const updatedTasks = [...tasks];
    const newTaskDescription = prompt('Enter new task name:');
    if (newTaskDescription !== '' && newTaskDescription !== null) {
      updatedTasks[index].taskDescription = newTaskDescription;
      setTasks(updatedTasks);
    }*/}
</div >
      



    );
  }

  export default MyTesting;