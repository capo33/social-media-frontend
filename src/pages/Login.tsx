import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Spinner from "../components/Spinner";

import { AuthUser } from "../interfaces/AuthInterface";
import { useAppDispatch, useAppSelector } from "../redux/app/store";
import { login } from "../redux/fetures/Auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState<AuthUser>({
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ formData, toast, navigate }));
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className='mycard'>
        <div className='card authCard'>
          <h2>Instagram</h2>

          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='email'
              placeholder='email'
              onChange={handleChange}
              value={formData.email}
            />
            <input
              type='password'
              name='password'
              placeholder='password'
              onChange={handleChange}
              value={formData.password}
            />
            <button
              className='btn waves-effect waves-light #64b5f6 blue darken-1'
              type='submit'
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
