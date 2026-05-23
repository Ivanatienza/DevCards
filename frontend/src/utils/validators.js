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

// Login
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

// Registro
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

// Perfil del usuario
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

// Tarjeta
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

// Usuario administrador
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

export const required = (value, message) => {

  if(!value || !value.toString().trim()){

    return message;

  }

  return "";

};

export const isEmail = (value, message) => {

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(value && !regex.test(value)){

    return message;

  }

  return "";

};

export const minLength = (value, min, message) => {

  if(value && value.length < min){

    return message;

  }

  return "";

};