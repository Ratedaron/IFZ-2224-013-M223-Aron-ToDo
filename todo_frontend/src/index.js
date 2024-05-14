import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import About from './pages/About';
import reportWebVitals from './reportWebVitals';
import Layout from './pages/Layout';
import MyTesting from './pages/MyTesting';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';


export default function App2() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
         <Route index element={<Home />} />
          <Route path='tasks' element={<App />} />
          <Route path="about" element={<About />} />
          <Route path="myTesting" element={<MyTesting />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App2 />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
