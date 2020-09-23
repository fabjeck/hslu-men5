import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ImagePreview.scss';

import Likes from './Likes';

export default function ImagePreview() {
  const location = useLocation();

  return (
    <article className="thumbnail">
      <div className="thumbnail-image__wrapper image__frame">
        <img src="https://p.vitalmtb.com/photos/press_releases/3006/title_image/s1600_G20_Force29_Utah_1342_496571.jpg?1564704290" alt="" />
        <Link className="thumbnail__link" to={{
          pathname: "/images/dsf",
          state: { background: location }
        }} />
        <div className="title__wrapper">
          <h2>
          <Link className="title__link" to={{
            pathname: "/images/dsf",
            state: { background: location }
          }}>Bike Track</Link>
          </h2>
        </div>
      </div>
      <div className="details__container">
        <div className="publisher__wrapper">
          <Link className="publisher__link" to="/user">
            <div className="profil-image__wrapper image__frame">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg" alt="" />
            </div>
            <span>Max Muster</span>
          </Link>
        </div>
        <div className="likes__wrapper">
          <Likes />
        </div>
      </div>
    </article>
  )
}