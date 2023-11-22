import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserProvider';

const LoginForm = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((form) => ({
      ...form,
      [id]: value,
    }));
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3000/api/users/login', formData);
      setUser(res.data);
      navigate(state?.from || '/');
    } catch (error) {
      console.error('Error response:', error.response);
      setErrorMessage(error.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className='formWrapper-login'>
      <div className='formContainer-login'>
        <div className='formHeader'>
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit} className='form' id='form'>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {loading && <p>Loading...</p>}

          <div className='form-control'>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" placeholder='Enter your email' value={formData.email} onChange={handleChange} />
            {errorMessage && !formData.email && <p className='error'>{errorMessage}</p>}
          </div>
          <div className='form-control'>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder='Enter your password' value={formData.password} onChange={handleChange} />       {errorMessage && !formData.password && <p className='error'>{errorMessage}</p>}
          </div>

          <button className="form-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
