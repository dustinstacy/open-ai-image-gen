import React from 'react'
import { handleFormFieldChange } from '../../utils';

import "./ResultsCount.css";

const ResultsCount = ({ inputs, setInputs }) => {
  return (
    <label># of results:
        <input
            className="count"
            type='number'
            step="1"
            min='1'
            max='4'
            defaultValue='1'
             onChange={(e) => handleFormFieldChange({ setInputs: setInputs, inputs: inputs }, 'count', e)}
        />
    </label>
  )
}

export default ResultsCount