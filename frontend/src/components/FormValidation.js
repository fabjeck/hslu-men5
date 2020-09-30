import React, { useState } from 'react';
import './FormValidation.scss';

export default function Auth({ initialValues, validate, submit, children }) {

  const [values, setValues] = useState(initialValues);

  const [errors, setErrors] = useState({});

  const [serverError, setServerError] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    const { [name]: changedValue, ...rest } = values;

    setValues({
      ...rest,
      [name]: value
    });
  }

  function handleBlur(event) {
    const { name, value } = event.target;

    const { [name]: removedError, ...rest } = errors;

    const error = validate[name](value);

    setErrors({
      ...rest,
      ...(error && { [name]: error })
    });

    setServerError({})
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validate[key](values[key]);
        return {
          ...acc,
          ...(newError && { [key]: newError })
        };
      },
      {}
    )

    setErrors(errors);

    if (!Object.values(errors).length) {
      try {
        await submit(values);
      } catch (error) {
        if (error.response?.status === 409) {
          setServerError({
            username: error.response.data.message
          })
        } else if (error.response?.status === 401) {
            setServerError({
              auth: error.response.data.message
            })
        } else {
          console.log(error);
        };
      }
    };
  }

  return (
    <React.Fragment>
      {React.Children.map(children, (child) => React.cloneElement(child, { handleChange, handleBlur, handleSubmit, values, errors, serverError }))}
    </React.Fragment>
  )
}