import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { navlinks } from '../constants'
import './NavBar.css'

const NavBar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('Home')

  console.log(isActive);

  return (
    <div className='navbar'>
      <p className='logo'>Logo</p>
      <div className='links'>
        {navlinks.map((link) => (
          <a
            {...link}
            key={link.name}
            onClick={() => {
              setIsActive(link.name)
              navigate(link.link, { isActive: link.name })
            }}
            className={`nav__link ${isActive === link.name ? 'active' : ''}`}
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  )
}

export default NavBar