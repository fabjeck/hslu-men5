import React from 'react';
import './Home.scss';

import ImagePreview from '../components/ImagePreview';
import Searchbar from '../components/Searchbar';

export default function Home() {
  return (
      <div className="home__wrapper flex-stretch">
        <Searchbar />
        <section className="grid__container">
          <ImagePreview />
          <ImagePreview />
          <ImagePreview />
          <ImagePreview />
        </section>
      </div>
  )
}