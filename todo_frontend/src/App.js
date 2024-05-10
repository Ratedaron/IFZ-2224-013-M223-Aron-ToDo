import React from 'react';
import RobloxScreenShot20240408_111852622 from './RobloxScreenShot20240408_111852622.png';
import kilo from './Kilo.png';
import './App.css';

function MyButton() {
  return (
    <button>I am a button</button>
  );
}

function AbtPage() {
  return (
    <>
      <h1>About page</h1>
      <p>Hello, how are you?<br />HHHHHHHHHHHHHHHHHHHHH</p>
    </>
  );
}

export default function App() {
  return (
    <div>
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
          <img src={kilo} alt='kiloren image' style={{ width: '100%', display: 'block' }} />
          <div className='container'>
            <p>This is a kilo image</p>
          </div>

        </div>


      </div>
    </div>
  );
}
