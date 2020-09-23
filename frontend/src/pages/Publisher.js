import React from 'react';
import './Publisher.scss';

import Button from '../components/Button';
import Grid from '../components/Grid';

export default function Publisher() {
  return (
    <div className="publisher__container">
      <div className="publisher__box">
        <div className="profil-image__wrapper image__frame">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg" alt="" />
        </div>
        <div className="info__container">
          <h1>Max Muster</h1>
          <Button />
        </div>
      </div>
      <h2>This artists' work</h2>
      <Grid />
    </div>
  )
}