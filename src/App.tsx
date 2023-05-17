import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Header from "./components/Header";

import "./App.css";
import Login from "./pages/Login";
import AddPost from "./components/AddPost";
import UserProfile from "./components/UserProfile";
// import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Header />
      {/* <ToastContainer /> */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path='/profile/:id' element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
