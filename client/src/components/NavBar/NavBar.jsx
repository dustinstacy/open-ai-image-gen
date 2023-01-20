import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

import { navlinks } from '../../constants'
import { logo } from '../../assets';
import './NavBar.scss'

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <img src={logo} alt="logo" onClick={() => navigate('/')} />
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