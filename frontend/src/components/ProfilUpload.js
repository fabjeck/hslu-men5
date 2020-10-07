import React, { useContext, useRef } from 'react';
import './ProfilUpload.scss';

import userContext from '../helpers/userContext';

export default function ProfilEdit({image, onInputChange, onInputClear}) {
  const { user } = useContext(userContext);
  const fileInput = useRef(null);

  function handleInput(event) {
    onInputChange(event);
  }

  function handleClick() {
    onInputClear(fileInput.current);
  }

  return (
    <div className="profil__container">
      <div className="profil__image image__frame">
        {image && <img src={image} alt={user.username} />}
      </div>
      <div className="button__container">
        <label htmlFor="profil" className="file-input__label">
          <input onInput={handleInput} ref={fileInput} type="file" name="profil" id="profil" accept="image/png, image/jpeg, image/jpg, image/svg" />
          <button type="button" className="button button__action">Choose image</button>
        </label>
        <button onClick={handleClick} type="button" className="button button__passive">
          Remove image
      </button>
      </div>
    </div>
  )
};