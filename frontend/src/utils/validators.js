// =====================
// BASIC VALIDATORS
// =====================

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password && password.trim().length >= 6;
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateURL = (url) => {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};

// =====================
// LOGIN
// =====================

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

// =====================
// REGISTER
// =====================

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

// =====================
// PROFILE
// =====================

export function validateProfile(data, t) {
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

  if (data.avatar_url && !validateURL(data.avatar_url)) {
    errors.avatar_url = t("validationUrl");
  }

  return errors;
}

// =====================
// CARD
// =====================

export function validateCard(data, t) {
  const errors = {};

  if (!validateRequired(data.title)) {
    errors.title = t("validationRequired");
  }

  if (!validateRequired(data.description)) {
    errors.description = t("validationRequired");
  }

  if (!validateRequired(data.documentation_url) ||
      !validateURL(data.documentation_url)) {
    errors.documentation_url = t("validationUrl");
  }

  if (data.logo_url && !validateURL(data.logo_url)) {
    errors.logo_url = t("validationUrl");
  }

  if (Array.isArray(data.tags)) {
    const lower = data.tags.map(tag => tag.toLowerCase());
    if (lower.length !== new Set(lower).size) {
      errors.tags = t("validationDuplicateTags");
    }
  }

  return errors;
}

export const required = (val, msg) =>
  (!val || !val.toString().trim()) ? msg : "";

export const minLength = (val, min, msg) =>
  (val && val.length < min) ? msg : "";