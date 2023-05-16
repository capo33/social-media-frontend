import axios, { InternalAxiosRequestConfig } from "axios";
import { User } from "../../../interfaces/AuthInterface";
// import { AuthUser } from "../../../interfaces/AuthInterface";

// interceptors are functions that run before a request is made and after a response is received from the server
// API.interceptors.request.use((req: AxiosRequestConfig) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }

//   return req;
// });

const API = axios.create({
  baseURL: "http://localhost:5000/",
});

// set up the interceptor to add the token to the request (typescript)
// API.interceptors.request.use((req: InternalAxiosRequestConfig) => {
//   if (localStorage.getItem("profile")) {
//     req.headers.Authorization = `Bearer ${localStorage.getItem("profile")}`;
//   }
//   return req;
// });

// register
const register = async (formData: User) => {
  const response = await API.post(`/api/v1/auth/register`, formData);
   console.log("response.data", response.data);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// login
const login = async (formData: User) => {
  const response = await API.post(`/api/v1/auth/login`, formData);
  // if (data) {
  //   localStorage.setItem("user", JSON.stringify(data));
  // }
  return response.data;
};

// logout
const logout = () => {
  localStorage.removeItem("user");
};

const authServices = {
  register,
  login,
  logout,
};

export default authServices;
