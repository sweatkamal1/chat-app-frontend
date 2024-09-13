import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/register`, user, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  }

  return (
    <div className="min-w-96 mx-auto">
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center'>Signup</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
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
              type="text"
              placeholder="Username"
              className="input input-bordered w-full"
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
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
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
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <span className='text-base label-text'>Gender</span>
            <div className="flex gap-4">
              <div>
                <input
                  onClick={() => handleCheckbox("Male")}
                  type="checkbox"
                  className="checkbox checkbox-primary"
                />
                <label className='label-text'>Male</label>
              </div>
              <div>
                <input
                  onClick={() => handleCheckbox("Female")}
                  type="checkbox"
                  className="checkbox checkbox-primary"
                />
                <label className='label-text'>Female</label>
              </div>
              <div>
                <input
                  onClick={() => handleCheckbox("Other")}
                  type="checkbox"
                  className="checkbox checkbox-primary"
                />
                <label className='label-text'>Other</label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Signup</button>
          <p className='text-center my-4'>
            Already have an account? <Link className='text-blue-600' to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
