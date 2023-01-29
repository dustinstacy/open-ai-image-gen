import React from 'react'

import './SizeSlider.scss'

const SizeSlider = ({handleChange}) => {
    return (
        <div className="size__slider">
            <label>Size:</label>
            <input
                className="range"
                type='range'
                min='1'
                max='3'
                defaultValue='1'
                list="sizes"
                onChange={(e) => handleChange('size', e)}
            />
            <datalist id='sizes'>
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </datalist>
            <span>
                <p>SM</p>
                <p>MED</p>
                <p>LG</p>
            </span>
        </div>
  )
}

export default SizeSlider