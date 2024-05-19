import React, { useState, useEffect } from 'react';
import './Layout.css';

function Home() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ['ROLE_USER'],
  });

  useEffect(() => {
    if (localStorage.getItem('status') === 'isLoggedIn') {
      localStorage.removeItem('status');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  const createUser = () => {
    const url = `http://localhost:8080/api/auth/signup`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create user');
        }
        return response.json();
      })
      .then((data) => {
        console.log('User created successfully:', data);
        setShowForm(false); // Hide form after successful creation
      })
      .catch((error) => {
        console.error('Create user error: ', error);
      });
  };

  return (
    <div>
      <h1 id="h1ForHome">Welcome to ToDo App</h1>
      <h3 id="h3ForHome">Please log in</h3>
      <button onClick={() => setShowForm(true)}>Create New User</button>
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  role: [e.target.value],
                }))
              }
              required
            >
              <option value="ROLE_USER">User</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      <br />
      <p id="messageForUser">For simple viewing use:</p>
      <p id="messageForUser">Username: user</p>
      <p id="messageForUser">Password: user</p>
      <p id="messageForUser">These credentials are for read-only access. Enjoy exploring!</p>
    </div>
  );
}

export default Home;
