import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import { useGlobalContext } from '../../context/GlobalContext'
import { navlinks } from '../../constants'
import { Footer } from '../../components'
import './Home.scss'

const NavCard = ({ link }) => (
	<NavLink to={link.link} className='navcard'>
		<h1>{link.name}</h1>
		<img src={link.imgUrl} alt={link.name} />
		<p>{link.description}</p>
	</NavLink>
)

const Home = () => {
	const navigate = useNavigate()
	const { user, getCurrentUser } = useGlobalContext()

	useEffect(() => {
		getCurrentUser()
		if (!user) navigate('/')
	}, [user, navigate, getCurrentUser])

	return (
		<div className='home__container'>
			<div className='navcards'>
				{navlinks.map((link) => {
					if (link.name !== 'Home') {
						return <NavCard link={link} key={link.name} />
					} else {
						return <p key={link.name} />
					}
				})}
				<Footer />
			</div>
		</div>
	)
}

export default Home
