import React from 'react';
import { Link } from 'react-router-dom';
import './ImageDetail.scss';

export default function ImageDetail() {
  return (
    <article className="image-detail__wrapper modal__box">
      <div className="detail__container">
        <div className="profil__wrapper image__frame">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg" alt="" />
          <Link className="image__link" to="/autor" />
        </div>
        <div className="text__wrapper">
          <h3>Bike Jump</h3>
          <span>by </span>
          <Link className="autor__link" to="/autor">Max Muster</Link>
        </div>
      </div>
      <div className="image__wrapper image__frame">
        <img src="https://p.vitalmtb.com/photos/press_releases/3006/title_image/s1600_G20_Force29_Utah_1342_496571.jpg?1564704290" alt="" />
      </div>
    </article>
  )
}