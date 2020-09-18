import React from 'react';
import './Publisher.scss';

export default class Publisher extends React.Component {
  render() {
    return (
      <div className="publisher__wrapper flex-stretch">
        <div className="publisher__box">
          <div className="profil-image__wrapper image__frame">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg" alt="" />
          </div>
          <h2>Max Muster</h2>
        </div>
      </div>
    )
  }
}