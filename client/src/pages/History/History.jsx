import React, { useEffect } from 'react'
import { useGlobalContext } from '../../context/GlobalContext'
import { useNavigate } from 'react-router-dom';

import "./History.scss"

const History = () => {
    const { user } = useGlobalContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && navigate) {
            navigate("/");
        }
    }, [user, navigate])

  return (
    <div>History</div>
  )
}

export default History