import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Spinner from "../components/Spinner";

import { User } from "../interfaces/AuthInterface";
import { register } from "../redux/fetures/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/app/store";

const Register = () => {
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const { isLoading, user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    dispatch(register({ formData, toast, navigate }));
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
              name='name'
              placeholder='name'
              onChange={handleChange}
              value={formData.name}
            />
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

export default Register;
