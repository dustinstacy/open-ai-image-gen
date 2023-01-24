import React from 'react'

import { loader } from '../../assets';

import "./Loader.scss"

const Loader = () => {
    return (
        <div className='loader'>
            <img src={loader} alt='loader' className='loader__image' />
            <p className='loader__text'>
                Results Loading....
            </p>
        </div>
    )
}

export default Loader