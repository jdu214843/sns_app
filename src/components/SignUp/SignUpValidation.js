function Validation(values) {
  let error = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]/;

  if (!values.fullname) {
    error.fullname = "Full name is required.";
  } else {
    error.fullname = "";
  }
  if (!values.username) {
    error.username = "user name is required.";
  } else {
    error.username = "";
  }

  if (values.email === "") {
    error.email = "Please enter a valid email address";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email did not match";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "Please enter a valid password";
  } else if (!password_pattern.test(values.password)) {
    error.password = "password did not match";
  } else {
    error.password = "";
  }

  return error;
}

export default Validation;
