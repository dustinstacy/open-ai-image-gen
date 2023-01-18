import React from 'react'
import { handleFormFieldChange } from '../../utils'

import './SizeSlider.css'

const SizeSlider = ({ setInputs, inputs }) => {
  return (
    <label>Size:
        <div className="size_div">
            <input
                className="size"
                type='range'
                min='1'
                max='3'
                defaultValue='1'
                list="sizes"
                onChange={(e) => handleFormFieldChange({ setInputs: setInputs, inputs: inputs }, 'size', e)}
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
    </label>
  )
}

export default SizeSlider