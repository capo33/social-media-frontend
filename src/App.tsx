import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Header from "./components/Header";

import "./App.css";
// import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Header />
      {/* <ToastContainer /> */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<div>Login</div>} />
      </Routes>
    </Router>
  );
}

export default App;
