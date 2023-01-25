import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import axios from 'axios'
import {BsHeart, BsHeartFill} from 'react-icons/bs'

import "./History.scss"
import {Footer, Paginate, ImageCard} from '../../components'

const History = () => {
  const { promptHistory, getCurrentUser, user } = useGlobalContext();
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = !filterFavorites ? promptHistory.slice(indexOfFirstResult, indexOfLastResult) :
    promptHistory.filter((history) => history.favorite === true).slice(indexOfFirstResult, indexOfLastResult)
    ;



  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    getCurrentUser();
    }, [getCurrentUser])

  const markFavorite = async (e, history) => {
    e.preventDefault();
    axios.put(`/api/history/${history._id}/favorite`)
    }

  const removeFavorite = async (e, history) => {
    e.preventDefault();
    axios.put(`/api/history/${history._id}/removeFavorite`)
  }

  const handleFilterFavorites = (e) => {
    e.preventDefault();
    setFilterFavorites((current) => !current);
  }

  useEffect(() => {
  }, [promptHistory])

  return (
    <div className="page">
      <div className='history__container'>
      {currentResults.length > 0 ? (
          <div className='history'>
            <div className='history__header'>
              <h1>Prompt History</h1>
              <button className={filterFavorites ? "filtered" : ""} onClick={(e) => handleFilterFavorites(e) }>Favorites</button>
            </div>
      {filterFavorites ? (
              currentResults.filter((history) => history.favorite === true).map((favorite) => (
                        <div className='history__collection' key={favorite._id}>
          <div className='history__images'>
            {favorite.images.map((image) => (
              <img key={image} src={image} alt="prompt" />
            ))}
          </div>
          <div className='history__prompt'>
            <span onClick={(e) => !favorite.favorite ? markFavorite(e, favorite) : removeFavorite(e, favorite)}>{favorite.favorite ? <BsHeartFill className='heart'/> : <BsHeart/>}</span>
            <p>{favorite.prompt}</p>
          </div>
        </div>
              ))
      ) : (currentResults.map((history) => (
        <div className='history__collection' key={history._id}>
          <div className='history__images'>
            {history.images.map((image, i) => (
              <ImageCard id={image + i} prompt={history.prompt} name={user.name} image={image} key={image} />
            ))}
          </div>
          <div className='history__prompt'>
            <span className="history__favorite" onClick={(e) => !history.favorite ? markFavorite(e, history) : removeFavorite(e, history)}>
              {history.favorite ? <BsHeartFill className='heart'/> : <BsHeart/>}
            </span>
            <p>{history.prompt}</p>
          </div>
        </div>
      )))}
            <Paginate
              resultsPerPage={resultsPerPage}
              results={promptHistory}
              paginate={paginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              filter={filterFavorites}
            />
        </div>
      ) : (
        <h1 className='history__login'>{user ? "Time to make history" : "Login in to view your history"}</h1>
        )}
      </div>
    </div>

  )
}

export default History