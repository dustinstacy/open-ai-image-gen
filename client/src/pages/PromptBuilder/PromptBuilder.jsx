import React from 'react'

import { NavBar } from '../../components'

import {
  lighting,
  energies,
  aesthetics,
  cameraSettings,
  artists, structure,
  filters,
  media
} from '../../constants';

import './PromptBuilder.css'

const PromptBuilder = () => {
  return (
    <div className='container'>
      <NavBar />
      {lighting.map((light) => (
        <h1 key={light.name}>{light.name}</h1>
      ))}
    </div>
  )
}

export default PromptBuilder