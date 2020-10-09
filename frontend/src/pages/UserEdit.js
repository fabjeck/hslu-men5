import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';

import ProfilUpload from '../components/ProfilUpload';
import Error from '../components/Error';

import useForm from '../helpers/useForm';
import userContext from '../helpers/userContext';


export default function UserEdit() {

  function validateMail(mail) {
    if (validator.isEmpty(mail, { ignore_whitespace: true })) {
      return 'Mail is required.';
    }
    if (!validator.isEmail(mail)) {
      return 'Invalid mail format.';
    }
    return null;
  }

  function validatePassword(password) {
    if (!validator.isEmpty(password, { ignore_whitespace: true }) && !validator.isLength(password, { min: 8 })) {
      return 'Password must contain at least 8 characters.';
    }
    return null;
  }

  function validateRepeatPassword(repeatPassword) {
    if (validator.isEmpty(repeatPassword, { ignore_whitespace: true }) && !validator.isEmpty(values.password, { ignore_whitespace: true })) {
      return 'Repeating password is mandatory.';
    }
    if (!validator.equals(values.password, repeatPassword)) {
      return 'Passwords don\'t match.';
    }
    return null;
  }

  const validate = {
    mail: mail => validateMail(mail),
    password: password => validatePassword(password),
    repeatPassword: repeatPassword => validateRepeatPassword(repeatPassword)
  }

  const { user, edit } = useContext(userContext);

  const initialValues = {
    mail: user.mail,
    password: '',
    repeatPassword: ''
  };

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm({
    initialValues,
    validate,
    onSubmit
  });

  const [image, setImage] = useState(user.image?.[100]);
  const [file, setFile] = useState();
  const [imageChanged, setImageChanged] = useState(false);
  const reader = new FileReader();
  const history = useHistory();

  function changeImage(event) {
    const { files } = event.target;
    setFile(files[0]);
    setImageChanged(true);
    reader.onload = (e) => {
      const { result } = e.target;
      setImage(result);
    };
    reader.readAsDataURL(files[0]);
  }

  function removeImage(fileInput) {
    fileInput.value = '';
    setImage();
    setFile();
  }

  async function onSubmit() {
    const { mail, password } = values;
    const formData = new FormData();
    if (imageChanged) {
      formData.set('image', file);
    }
    formData.set('mail', mail);
    formData.set('password', password);
    try {
      const { data } = await axios.patch(
        'http://localhost:8080/users',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${user.token}`,
          }
        }
      );
      edit(data.user);
      history.push('/');
    } catch (error) {
      return error;
    }
  }

  return (
    <div className="auth__container">
      <h1>Edit Profil</h1>
      <form onSubmit={handleSubmit} autoComplete="on" noValidate>
        <fieldset>
          <ProfilUpload image={image} onInputChange={changeImage} onInputClear={removeImage} />
        </fieldset>
        <fieldset>
          <label>Mail</label>
          <input type="email" name="mail" value={values.mail} onChange={handleChange} onBlur={handleBlur} autoComplete="email" />
          {(touched.mail && errors.mail) && <Error text={errors.mail} />}
        </fieldset>
        <fieldset>
          <label>New Password</label>
          <input type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete="new-password" />
          {(touched.password && errors.password) && <Error text={errors.password} />}
        </fieldset>
        <fieldset>
          <label>Repeat Password</label>
          <input type="password" name="repeatPassword" value={values.repeatPassword} onChange={handleChange} onBlur={handleBlur} autoComplete="off" />
          {(touched.repeatPassword && errors.repeatPassword) && <Error text={errors.repeatPassword} />}
        </fieldset>
        <fieldset>
          <input className="button button__action form__button" type="submit" value="Edit" />
        </fieldset>
      </form>
    </div>
  )
};