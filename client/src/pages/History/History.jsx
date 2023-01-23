import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { useNavigate } from 'react-router-dom';

import "./History.scss"

const History = () => {
    const { user, promptHistory } = useGlobalContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && navigate) {
            navigate("/");
        }
    }, [user, navigate])

  const toggleFavorite = async (e, history) => {
    e.preventDefault();
  }

  return (
    <div className="page">
      <div className='history'><h1>Prompt History</h1>
      {promptHistory.map((history) => (
        <div className='history__collection' key={history._id}>
          <div className='history__images'>
            {history.images.map((image) => (
              <img key={image.slice(-10)} src={image} alt="prompt" />
            ))}
          </div>
          <div className='history__prompt'>
            <span onClick={(e) => toggleFavorite(e, history)}>{history.favorite ? "❤️" : "🤍"}</span>
            <p>{history.prompt}</p>
          </div>
        </div>
      ))}
        </div>
    </div>
  )
}

export default History