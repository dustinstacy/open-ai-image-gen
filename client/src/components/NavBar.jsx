import React from 'react'
import { NavLink } from 'react-router-dom';

import { navlinks } from '../constants'
import { logo } from '../assets';
import './NavBar.css'

const NavBar = () => {
  return (
    <div className='navbar'>
      <img src={logo} alt="logo"/>
      <div className='nav__links'>
        {navlinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.link}
            className="nav__link"
          >{link.name}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default NavBar