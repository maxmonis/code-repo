const validate = ({ email, password }) => {
    let errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errores.email = 'Invalid email';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must have at least 6 characters';
    }
    return errors;
  };
  
  export default validate;
  