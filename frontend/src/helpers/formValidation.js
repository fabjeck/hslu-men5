const validateUsername = (value) => {
  if (value.trim() === '') {
    return 'Username is required';
  }
  if (/[^a-zA-Z -]/.test(value)) {
    return 'Username must only contain letters';
  }
  return null;
}

const validateMail = (value) => {
  if (value.trim() === '') {
    return 'Mail is required';
  }
  if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    .test(value)) {
    return null;
  }
  return 'Invalid mail format';
}

const validatePassword = (value) => {
  if (value.trim() === '') {
    return 'Password is required';
  }
  if (value.trim().length < 8) {
    return 'Password must contain at least 8 characters';
  }
  return null;
}

export { validateUsername, validateMail, validatePassword }