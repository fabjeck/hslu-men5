import React from 'react';
import './Grid.scss';

export default function Grid(props) {
  return (
    <section className="grid__container">
      {props.children}
    </section>
  )
}