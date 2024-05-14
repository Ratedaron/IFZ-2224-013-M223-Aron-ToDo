import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  // State variables to store the username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setisLoggedIn] = useState(true);

  const navigate = useNavigate()

  /*useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('user');
    if (token) {
      setisLoggedIn(true);
      navigate.push('/'); // Redirect to home page if logged in
      console.log(isLoggedIn);
      localStorage.removeItem('status');
    }
  }, [navigate, isLoggedIn]);
*/

  // State variable to store user data
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  

  // Function to handle username input change
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUserData({ ...userData, username: event.target.value });
  };

  // Function to handle password input change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setUserData({ ...userData, password: event.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can perform login/authentication logic here

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', userData);

      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
        alert('logged in!');
        localStorage.removeItem('status');
        localStorage.setItem('status', 'isLoggedIn' );
      } else {
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }

    console.log(userData);
    // Reset the input fields after submission
    setUsername('');
    setPassword('');
  };

  // Check if user is logged in based on localStorage status
  if (localStorage.getItem('status') === 'isLoggedIn') {
    return (
      <div>
        <p>Logged in</p>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
