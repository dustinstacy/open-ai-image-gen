import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { CgMenuHotdog, CgCloseR } from 'react-icons/cg'
import { easeInOut, motion } from 'framer-motion'

import { useGlobalContext } from '../../context/GlobalContext'
import { navlinks } from '../../constants'
import { logo } from '../../assets'

import './NavBar.scss'

const NavBar = () => {
	const { user, logout } = useGlobalContext()
	const { pathname } = useLocation()
	const [toggle, setToggle] = useState(false)

	return (
		<div className='navbar'>
			<img src={logo} alt='logo' />
			<div className='navbar__links'>
				{user &&
					navlinks.map((link) => (
						<NavLink
							key={link.name}
							to={link.link}
							className='navbar__link'>
							{link.name}
						</NavLink>
					))}
			</div>
			{user ? (
				<button onClick={logout}>Logout</button>
			) : pathname === '/' ? (
				<NavLink to='/register'>
					<button>Register</button>
				</NavLink>
			) : (
				<NavLink to='/'>
					<button>Login</button>
				</NavLink>
			)}
			<div className='navbar__menu'>
				<CgMenuHotdog onClick={() => setToggle(true)} />
				{toggle && (
					<motion.div
						whileInView={{ x: [300, 0] }}
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{
							duration: 0.3,
							ease: 'easeIn',
						}}>
						<CgCloseR onClick={() => setToggle(false)} />
						<ul>
							{navlinks.map((link) => (
								<NavLink
									key={link.name}
									to={link.link}
									className='navbar__link'
									onClick={() => setToggle(false)}>
									{link.name}
								</NavLink>
							))}
							<NavLink
								to='/logout'
								className='navbar__link logout'
								onClick={() => setToggle(false)}>
								Logout
							</NavLink>
						</ul>
					</motion.div>
				)}
			</div>
		</div>
	)
}

export default NavBar
