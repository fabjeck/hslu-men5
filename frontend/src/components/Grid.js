import React from 'react';
import './Grid.scss';

import ImagePreview from './ImagePreview';

export default function Grid() {
  return (
    <section className="grid__container">
        <ImagePreview />
        <ImagePreview />
        <ImagePreview />
        <ImagePreview />
      </section>
  )
}