import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../redux/app/store";
import { logout } from "../redux/fetures/Auth/authSlice";

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    // <div>
    //   <h1>Header</h1>
    //   <ul>
    //     <li>
    //       <Link to='/'>Home</Link>
    //     </li>
    //     <li>
    //       <Link to='/register'>Register</Link>
    //     </li>
    //     <li>
    //       <Link to='/login'>Login</Link>
    //     </li>
    //     <li>
    //       <Link to='/add-post'>Add Post</Link>
    //     </li>
    //   </ul>
    // </div>
    <nav>
      <div className='nav-wrapper container'>
        <a href='/' className='brand-logo left'>
          Logo
        </a>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          {user ? (
            <>
              <li>{(user?.name).slice(0, 1).toUpperCase()}</li>
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
