// 📁 src/utils/validators.js

export function validateEmail(email) {

  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);

}

export function validatePassword(password) {

  return password &&
    password.trim().length >= 6;

}

export function validateRequired(value) {

  return value &&
    value.toString().trim().length > 0;

}

// LOGIN
export function validateLogin(data, t) {

  const errors = {};

  if(!validateEmail(data.email)){
    errors.email = t("invalidEmail");
  }

  if(!validatePassword(data.password)){
    errors.password = t("passwordMin");
  }

  return errors;

}

// REGISTER
export function validateRegister(data, t) {

  const errors = {};

  if(!validateRequired(data.name)){
    errors.name = t("requiredField");
  }

  if(!validateRequired(data.surname)){
    errors.surname = t("requiredField");
  }

  if(!validateEmail(data.email)){
    errors.email = t("invalidEmail");
  }

  if(!validatePassword(data.password)){
    errors.password = t("passwordMin");
  }

  if(data.password !== data.confirmPassword){
    errors.confirmPassword =
      t("passwordsNotMatch");
  }

  return errors;

}

// PROFILE
export function validateProfile(data, t) {

  const errors = {};

  if(!validateRequired(data.name)){
    errors.name = t("requiredField");
  }

  if(!validateRequired(data.surname)){
    errors.surname = t("requiredField");
  }

  if(!validateEmail(data.email)){
    errors.email = t("invalidEmail");
  }

  return errors;

}

// CARD
export function validateCard(data, t) {

  const errors = {};

  if(!validateRequired(data.title)){
    errors.title = t("titleRequired");
  }

  if(!validateRequired(data.description)){
    errors.description =
      t("descriptionRequired");
  }

  return errors;

}

// ADMIN USER
export function validateUser(data, t) {

  const errors = {};

  if(!validateRequired(data.name)){
    errors.name = t("requiredField");
  }

  if(!validateRequired(data.surname)){
    errors.surname = t("requiredField");
  }

  if(!validateEmail(data.email)){
    errors.email = t("invalidEmail");
  }

  if(data.password){

    if(!validatePassword(data.password)){
      errors.password = t("passwordMin");
    }

  }

  return errors;

}