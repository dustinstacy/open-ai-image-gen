import React from 'react'
import { NavBar } from '../../components'

import {lighting, energies, cameraSettings, media, artists, aesthetics, structure } from '../../constants';

import './Randomizer.css'

const Randomizer = () => {

  const spin = () => {

  }

  return (
    <div className='container'>
      <NavBar />
      <button type="button" onClick={() => spin()}>Spin</button>
    </div>
      )
}

export default Randomizer