import React from 'react'
import { NavBar } from '../../components'

import {lighting, energies, cameraSettings, media, artists, aesthetics, structure } from '../../constants';

import './Randomizer.scss'

const Randomizer = () => {

  return (
    <div className='page'>
      <NavBar />
      <div className='randomizer__container'>
        <button type="button" onClick={() => spin()}>Spin</button>
      </div>
    </div>
      )
}

export default Randomizer