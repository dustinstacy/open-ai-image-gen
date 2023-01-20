import { NavLink } from 'react-router-dom';

import { navlinks } from '../../constants';
import { NavBar } from '../../components';

import './Home.scss'

const NavCard = ({ link }) => (
    <NavLink to={link.link} className='nav__card'>
        <h1>{link.name}</h1>
        <img src={link.imgUrl} alt={link.name} />
        <h3>{link.description}</h3>
    </NavLink>
);

const Home = () => {

  return (
    <div className='page'>
      <NavBar />
      <div className='nav__cards'>
        {navlinks.map((link) => {
          if (link.name !== "Home") {
            return <NavCard link={link} key={link.name} />
          }
        })}
      </div>
    </div>
  )
}

export default Home
