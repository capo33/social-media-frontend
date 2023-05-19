import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../redux/fetures/Auth/authSlice";
import { useAppSelector, useAppDispatch } from "../redux/app/store";

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const nameStyle = {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#ccc",
    margin: "5px",
  };

  return (
    <nav>
      <div className='nav-wrapper container'>
        <a href='/' className='brand-logo left'>
          Logo
        </a>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          {user ? (
            <>
              <li style={nameStyle}>
                {(user?.name).slice(0, 1).toUpperCase()}
              </li>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <Link to='/add-post'>Add post</Link>
              </li>
              <li>
                <Link to='/login' onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
