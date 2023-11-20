import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {

  const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      })

      const [errorMessage, setErrorMessage] = useState(false)

      const handleChange = e => {
        const { id, value } = e.target
        setFormData(form => {
          return {
            ...form,
            [id]: value
          }
        })
        setErrorMessage(null)
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const res = await axios.post('http://localhost:3000/api/users/signup/', formData);
          console.log(res.data);
          navigate('/login');
        } catch (error) {
            console.log('ERROR RESPONSE: ', error.response);
            setErrorMessage(error.response.data.message)
      };
    }

  return (
    <div className='formWrapper'>
        <div className='formContainer'>
        <div className='formHeader'>
                <h2>Sign Up</h2>
        </div>

        <form onSubmit={handleSubmit} className='form' id='form'>
            <div className='form-control error'>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" placeholder='Enter your first name' value={formData.firstName} onChange={handleChange}/>
                {errorMessage && !formData.firstName && <p className='error'>{errorMessage}</p>}
            </div>
            <div className='form-control'>
                <label htmlFor="lastName">Last Name</label>
                <input type="text"  id="lastName" placeholder='Enter your last name' value={formData.lastName} onChange={handleChange}/>
                {errorMessage && !formData.lastName && <p className='error'>{errorMessage}</p>}
            </div>
            <div className='form-control'>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" placeholder='Enter your email' value={formData.email} onChange={handleChange}/> 
                {errorMessage && !formData.email && <p className='error'>{errorMessage}</p>}
            </div>
            <div className='form-control'>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder='Enter your password' value={formData.password} onChange={handleChange}/>
                {errorMessage && !formData.password && <p className='error'>{errorMessage}</p>}
            </div>
        

            <button className="form-btn">LOGIN</button>
        </form>
        </div>
       
    </div>
  )
}

export default SignUpForm