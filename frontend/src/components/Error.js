import React from 'react';
import './Error.scss';


export default function Error(props) {
  return (
    <div className="error__wrapper">
      {props.text}
    </div>
  )
}