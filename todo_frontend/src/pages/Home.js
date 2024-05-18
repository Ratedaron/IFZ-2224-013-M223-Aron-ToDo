import React, { useEffect } from 'react';
import './Layout.css';

function Home() {
  useEffect(() => {
    // Clear the localStorage item "status" if it equals "notloggedIn"
    if (localStorage.getItem('status') === 'isLoggedIn') {
      localStorage.removeItem('status');
    }
  }, []);

  return (
    <div>
      <h1 id='h1ForHome'>Welcome to ToDo App</h1>
      <h3 id='h3ForHome'>Please log in</h3>
      <br />
      <p id='messageForUser'>For simple viewing use:</p>
      <p id='messageForUser'>Username: user</p>
      <p id='messageForUser'>Password: user</p>
      <p id='messageForUser'>These credentials are for read-only access. Enjoy exploring!</p>
    </div>
    
  );
}

export default Home;
