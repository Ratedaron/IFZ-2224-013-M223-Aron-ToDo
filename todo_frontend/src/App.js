import React, { useState } from 'react';
import RobloxScreenShot20240408_111852622 from './RobloxScreenShot20240408_111852622.png';
import kilo from './Kilo.png';
import './App.css';

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

export default function App() {
  // Define useState hook
  const [count, setCount] = useState(0);

  // Define HandleClick function
  function HandleClick() {
    // Update the count
    setCount(count + 1);
    // Show an alert with the current count
    alert('You clicked me ' + count + ' times');
  }


  return (
    <div className='margin'>
      {randomNumber === 2 && (
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
      )}
      {/* Call HandleClick function when button is clicked */}
      <button id='button1' onClick={HandleClick}>
        Button
      </button>
      <ul>
        {products.map(product => (
          <li className='fruits' key={product.id} style={{ color: product.isFruit ? 'blue' : 'chocolate' }}>
            {product.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
