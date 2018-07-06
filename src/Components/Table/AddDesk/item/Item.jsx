import React from 'react';

export default function Item(props) {

  return (
    <div className="form-item">
      <input type="text" name={props.name} onBlur={(e) => {
        e.target.value = ''
      }}/>
      <label htmlFor={props.name}>{props.value}</label>
    </div>
  )
}

