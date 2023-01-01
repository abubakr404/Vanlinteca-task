/*
 ******** General Variables ********
 */
const signUp = document.getElementById("signUp");
let inputsContainer = document.querySelectorAll(".input-control");
let validEmail = /\w+@\w+.\w+/;
// let validUserName = /[a-z0-9]+/;

let checked = null;
let user = null;

/*
 ******** Set State Functions ********
 */

const setUser = (newValue) => {
  user = newValue;
};

const setChecked = (newValue) => {
  checked = newValue;
};

const setError = (ele, error, state) => {
  ele.parentElement.nextElementSibling.innerText = error;
  setChecked({
    ...checked,
    [ele.name]: state,
  });
};

/*
 ******** Validations Functions ********
 */

const validateUserName = (ele) => {
  let errorMessage;
  if (ele.value === "") errorMessage = "the username is required";
  else if (ele.value.length < 4) errorMessage = "not valid username";
  else errorMessage = "";
  setError(ele, errorMessage, errorMessage === "" ? true : false);
};

const validateEmail = (ele) => {
  let errorMessage;
  if (ele.value === "") errorMessage = "the email is required";
  else if (!validEmail.test(ele.value)) errorMessage = "not valid email";
  else errorMessage = "";
  setError(ele, errorMessage, errorMessage === "" ? true : false);
};

const validatePassword = (ele) => {
  let errorMessage;
  if (ele.value === "") errorMessage = "the password is required";
  else if (ele.value.length < 8) errorMessage = "password must be at least 8 characters";
  else errorMessage = "";
  setError(ele, errorMessage, errorMessage === "" ? true : false);
};

const confirmPassword = (ele) => {
  let errorMessage;
  if (ele.value === "") errorMessage = "password confirmation is required";
  else if (ele.value !== user.password) errorMessage = "password is not matched";
  else errorMessage = "";
  setError(ele, errorMessage, errorMessage === "" ? true : false);
};

const checkFormFileds = (ele) => {
  switch (ele.name) {
    case "username":
      validateUserName(ele);
      break;
    case "email":
      validateEmail(ele);
      break;
    case "password":
      validatePassword(ele);
      break;
    case "password_confirmation":
      confirmPassword(ele);
      break;
    default:
      break;
  }
};

/*
 ******** Control Inputs Functions ********
 */

inputsContainer.forEach((input) => {
  input.querySelector("input").addEventListener("change", (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  });
});

inputsContainer.forEach((input) => {
  input.querySelector("input").addEventListener("blur", (e) => checkFormFileds(e.target));
});

const handleSubmit = (e) => {
  e.preventDefault();
  inputsContainer.forEach((input) => {
    checkFormFileds(input.querySelector("input"));
  });
  if (user !== null && Object.values(checked).every((filed) => filed)) {
    console.log(user, checked);
  }
};

signUp.addEventListener("submit", (e) => handleSubmit(e));
