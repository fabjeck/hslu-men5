import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import './Upload.scss';

import Error from '../components/Error';

import useForm from '../helpers/useForm';
import userContext from '../helpers/userContext';

function validateTitle(title) {
  if (validator.isEmpty(title, { ignore_whitespace: true })) {
    return 'Title is required.';
  }
  if (!validator.isAlphanumeric(title, 'en-US')) {
    return 'Title has to be alphanumeric';
  }
  return null;
}

function validateImage(image) {
  if (!image) {
    return 'Image is required.';
  }
  return null;
}

const validate = {
  title: title => validateTitle(title),
  image: image => validateImage(image),
}

const initialValues = {
  title: '',
  image: ''
};

export default function Upload() {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleInput,
    handleSubmit
  } = useForm({
    initialValues,
    validate,
    onSubmit
  });

  const { user } = useContext(userContext);
  const history = useHistory();

  async function onSubmit() {
    const { title, image } = values;
    const formData = new FormData();
    formData.set('title', title);
    formData.set('image', image.file);
    try {
      await axios.post(
        'http://localhost:8080/posts',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${user.token}`,
          }
        }
      );
      history.push('/');
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="auth__container upload__container">
      <h1>Upload</h1>
      <form onSubmit={handleSubmit} autoComplete="off" noValidate>
        <fieldset>
          <label>Title</label>
          <input type="text" name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} />
          {(touched.title && errors.title) && <Error text={errors.title} />}
        </fieldset>
        <fieldset>
          <div className="upload-field__wrapper image__frame">
            <label htmlFor="image">
              Click to add image
              <input type="file" name="image" id="image" onInput={handleInput} accept="image/png, image/jpeg, image/jpg, image/svg" />
              {values.image && <img src={values.image.img} alt="" />}
            </label>
          </div>
          {errors.image && <Error text={errors.image} />}
        </fieldset>
        <fieldset>
          <input className="button button__action form__button" type="submit" value="Upload" />
        </fieldset>
      </form>
    </div>
  )
};