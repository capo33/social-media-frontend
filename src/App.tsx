import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Header from "./components/Header";

import "./App.css";
import Login from "./pages/Login";
import AddPost from "./components/AddPost";
import UserProfile from "./components/UserProfile";

import { useAppSelector } from "./redux/app/store";
import Profile from "./pages/Profile";
import PostDetails from "./components/PostDetails";

function App() {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={user ? <Profile /> : <Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/add-post' element={<AddPost />} />
        <Route path='/post-details/:id' element={<PostDetails />} />
        <Route
          path='/profile/:id'
          element={user ? <UserProfile /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
