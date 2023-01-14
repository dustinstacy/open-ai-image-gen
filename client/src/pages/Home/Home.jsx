import { NavBar }  from '../../components';
import { NavLink } from 'react-router-dom';

import { navlinks } from '../../constants';
import './Home.css'

const NavCard = ({ link }) => (
  <div className='nav__card'>
    <h1>{link.name}</h1>
    <NavLink to={link.link}>
      <div>
        <img className="nav__img" src={link.imgUrl} alt={link.name} />
        <p className='nav__desc'>{link.description}</p>
      </div>
    </NavLink>
  </div>
);

const Home = () => {

  return (
    <div className='container'>
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
