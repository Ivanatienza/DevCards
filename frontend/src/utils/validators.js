export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePassword(password) {
  return password && password.trim().length >= 6;
}

export function validateRequired(value) {
  return value && value.toString().trim().length > 0;
}

export function validateLogin(data, t) {
  const errors = {};

  if (!validateEmail(data.email)) {
    errors.email = t("validationEmail");
  }

  if (!validatePassword(data.password)) {
    errors.password = t("validationPasswordMin");
  }

  return errors;
}

export function validateRegister(data, t) {
  const errors = {};

  if (!validateRequired(data.name)) {
    errors.name = t("validationRequired");
  }

  if (!validateRequired(data.surname)) {
    errors.surname = t("validationRequired");
  }

  if (!validateEmail(data.email)) {
    errors.email = t("validationEmail");
  }

  if (!validatePassword(data.password)) {
    errors.password = t("validationPasswordMin");
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = t("validationPasswordsMatch");
  }

  return errors;
}

// PERFIL
export function validateProfile(data, t) {
  const errors = {};
  if (!validateRequired(data.name)) errors.name = t("validationRequired");
  if (!validateRequired(data.surname)) errors.surname = t("validationRequired");
  if (!validateEmail(data.email)) errors.email   = t("validationEmail");
  return errors;
}

// CARD
export function validateCard(data, t) {
  const errors = {};
  if (!validateRequired(data.title)) errors.title = t("validationRequired");
  if (!validateRequired(data.description)) errors.description = t("validationRequired");
  if (data.documentation_url && !data.documentation_url.startsWith("http")) {
    errors.documentation_url = t("validationUrl");
  }
  return errors;
}

export const required = (value, message) => {
  if (!value || !value.toString().trim()) return message;
  return "";
};

export const isEmail = (value, message) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value && !regex.test(value)) return message;
  return "";
};

export const minLength = (value, min, message) => {
  if (value && value.length < min) return message;
  return "";
};