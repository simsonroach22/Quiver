import React, { useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode'; // Ensure you have this installed
import { useNavigate } from 'react-router-dom';
import bg from '../assets/login-bg.mp4'; // Ensure the video file is in this path
import './Login_Signup.css';

const Login_Signup = () => {
  const [view, setView] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      alert('Signup successful, please login');
      resetForm();
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      const receivedToken = response.data.token;
      setToken(receivedToken);
      localStorage.setItem('token', receivedToken);

      const decoded = jwtDecode(receivedToken);
      alert(`Welcome! Your user ID is ${decoded.userId}`);
      navigate('/home');
    } catch (error) {
      alert(error.response?.data?.error || 'An error occurred during login.');
    }
  };

  return (
    <div className="video-bg-container">
      <video autoPlay muted loop playsInline className="bg-video">
        <source src={bg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="login-container-main">
        <div className="login-container">
          {view === 'login' ? (
            <>
              <h2>Login</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <button onClick={handleLogin}>Login</button>
              <p onClick={() => setView('signup')}>Don't have an account? Signup</p>
            </>
          ) : (
            <>
              <h2>Signup</h2>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <button onClick={handleSignup}>Signup</button>
              <p onClick={() => setView('login')}>Already have an account? Login</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login_Signup;
