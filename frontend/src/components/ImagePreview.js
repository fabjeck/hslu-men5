import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ImagePreview.scss';

import Likes from './Likes';

export default function ImagePreview({ item }) {
  const location = useLocation();

  return (
    <article className="thumbnail">
      <div className="thumbnail-image__wrapper image__frame">
        <img
          srcSet={`${item.image[300]} 300w, ${item.image[500]} 500w`}
          src={item.image[300]}
          alt={item.title} />
        <Link className="thumbnail__link" to={{
          pathname: `/images/${item.title}`,
          state: { background: location }
        }} />
        <div className="title__wrapper">
          <h2>
            <Link className="title__link" to={{
              pathname: `/images/${item.title}`,
              state: { background: location }
            }}>{item.title}</Link>
          </h2>
        </div>
      </div>
      <div className="details__container">
        <div className="publisher__wrapper">
          <Link className="publisher__link" to={`/${item.publisher.username}`}>
            <div className="profil-image__wrapper image__frame">
              {item.publisher.profile && <img src={item.publisher.profile?.[50]} alt={item.publisher.username} />}
            </div>
            <span>{item.publisher.username}</span>
          </Link>
        </div>
        <div className="likes__wrapper">
          <Likes likes={item.likes} postID={item.postID} />
        </div>
      </div>
    </article>
  )
}