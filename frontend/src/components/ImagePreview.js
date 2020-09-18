import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ImagePreview.scss';

export default function ImagePreview() {
  const location = useLocation();

  return (
    <article className="thumbnail">
      <div className="thumbnail-image__wrapper image__frame">
        <img src="https://p.vitalmtb.com/photos/press_releases/3006/title_image/s1600_G20_Force29_Utah_1342_496571.jpg?1564704290" alt="" />
        <Link className="thumbnail-link" to={{
          pathname: "/images/dsf",
          state: { background: location }
        }} />
        <h2>Bike Track</h2>
      </div>
      <div className="details__wrapper">
        <div className="publisher__wrapper">
          <div className="profil-image__wrapper image__frame">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg" alt="" />
          </div>
          Max Muster
        </div>
        <div className="publish-date">14 March 2020</div>
      </div>
    </article>
  )
}