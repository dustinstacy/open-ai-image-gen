import React from 'react'

import './Loader.css'

import { loader } from '../../assets';

const Loader = () => {
    return (
        <div className='loader'>
            <img src={loader} alt='loader' className='loader__image' />
            <p className='loader__text'>
                Results Loading <br/> Please wait...
            </p>
        </div>
    )
}

export default Loader