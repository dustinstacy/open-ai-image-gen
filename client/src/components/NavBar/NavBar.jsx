import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';

import { useGlobalContext } from '../../context/GlobalContext';
import { navlinks } from '../../constants'
import { logo } from '../../assets';

import './NavBar.scss'

const NavBar = () => {
  const { user, logout } = useGlobalContext();
  const { pathname } = useLocation();

  return (
    <div className='navbar'>
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      <div className='navbar__links'>
        {navlinks.map((link) => {
          if (!user && link.name === "History") {
            return (
              <span
                style={{opacity: 0.5, pointerEvents: "none"}}
                key={link.name}
                className="navbar__link"
              >{link.name}
              </span>
            )
          } else {
            return (
              <NavLink
                key={link.name}
                to={link.link}
                className="navbar__link"
              >{link.name}
              </NavLink>
            )
          }
        })}
      </div>
      {user ? (
            <button onClick={logout}>Logout</button>
      ) : pathname === "/login" ? (
        <NavLink to="/register">
          <button>Register</button>
        </NavLink>
      ) : (
        <NavLink to="/login">
          <button>Login</button>
        </NavLink>
      )}

    </div>
  )
}

export default NavBar