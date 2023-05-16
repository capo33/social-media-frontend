import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Spinner from "../components/Spinner";

import { User } from "../interfaces/AuthInterface";
import { useAppDispatch, useAppSelector } from "../redux/app/store";


const Login = () => {
  const [formData, setFormData] = useState<User>({
    name: "",
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

  return <div>Login</div>;
};

export default Login;
