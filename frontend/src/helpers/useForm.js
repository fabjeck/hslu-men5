import { useState } from 'react';

export default function useForm({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    // extract changed value from rest
    const { [name]: changedValue, ...rest } = values;

    const { [name]: touchedField, ...others } = touched;

    setValues({
      ...rest,
      [name]: value
    });

    setTouched({
      ...others,
      [name]: true
    });
  };

  function handleBlur(event) {
    const { name, value } = event.target;

    // remove old error
    const { [name]: removedError, ...rest } = errors;

    const error = validate[name](value);

    // validate field if it has been touched
    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error }),
    });
  };

  function handleInput(event) {
    const { name, files } = event.target;

    const { [name]: changedValue, ...rest } = values;

    const { [name]: removedError, ...others } = errors;

    setErrors({
      ...others,
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      const { result } = e.target;
      setValues({
        ...rest,
        [name]: {
          file: files[0],
          img: result
        }
      });
    };
    reader.readAsDataURL(files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formValidation = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validate[key](values[key]);
        const newTouched = { [key]: true }
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError })
          },
          touched: {
            ...acc.touched,
            ...newTouched
          }
        };
      },
      {
        errors: { ...errors },
        touched: { ...touched }
      }
    );

    setErrors(formValidation.errors);
    setTouched(formValidation.touched);

    if (
      !Object.values(formValidation.errors).length && // no errors
      Object.values(formValidation.touched).length ===
      Object.values(values).length // all fields are touched
    ) {
      onSubmit();
    }
  }

  return {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleInput,
    handleSubmit
  }
};
