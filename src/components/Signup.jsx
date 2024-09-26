import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
  const [user, setUser] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });
  const navigate = useNavigate();

  // Function to handle gender selection (radio buttons)
  const handleRadioChange = (gender) => {
    setUser({ ...user, gender });
  };

  // Function to handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    // Basic validation for password match
    if (user.password !== user.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        timeout: 5000,  // 5-second timeout for the request
      });

      // Check if signup is successful
      if (res.data.success) {
        toast.success(res.data.message || 'Signup successful!');
        navigate('/login');
      } else {
        toast.error(res.data.message || 'Signup failed');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong!';
      toast.error(message);
      console.error('Error:', error);
    }

    // Clear form after submission
    setUser({
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
      gender: '',
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center'>Signup</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder='Full Name'
              required
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder='Username'
              required
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input input-bordered h-10'
              type="password"
              placeholder='Password'
              required
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='w-full input input-bordered h-10'
              type="password"
              placeholder='Confirm Password'
              required
            />
          </div>

          {/* Gender Selection with Radio Buttons */}
          <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <label className="mr-2">Male</label>
              <input
                type="radio"
                name="gender"
                checked={user.gender === 'male'}
                onChange={() => handleRadioChange('male')}
                className="radio mx-2"
                required
              />
            </div>
            <div className='flex items-center'>
              <label className="mr-2">Female</label>
              <input
                type="radio"
                name="gender"
                checked={user.gender === 'female'}
                onChange={() => handleRadioChange('female')}
                className="radio mx-2"
                required
              />
            </div>
          </div>

          <p className='text-center my-2'>Already have an account? <Link to="/login">Login</Link></p>
          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
