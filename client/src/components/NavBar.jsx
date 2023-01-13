import React from 'react'
import { NavLink } from 'react-router-dom';

import { navlinks } from '../constants'
import './NavBar.css'

const NavBar = () => {
  return (
    <div className='navbar'>
      <p className='logo'>Logo</p>
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