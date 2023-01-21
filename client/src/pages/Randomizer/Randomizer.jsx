import React from 'react'
import { NavBar, AuthBox } from '../../components'

import {lighting, energies, cameraSettings, media, artists, aesthetics, structure } from '../../constants';

import './Randomizer.scss'

const Randomizer = () => {

  return (
    <div className='page'>
      <div className='randomizer__container'>
        <AuthBox />
      </div>
    </div>
      )
}

export default Randomizer