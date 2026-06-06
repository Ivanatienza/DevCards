export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !regex.test(email.trim())) {
    throw new Error("El email es inválido.");
  }
};

export const validatePassword = (password) => {
  if (!password || password.trim().length < 6) {
    throw new Error("La contraseña debe tener mínimo 6 caracteres.");
  }
};

export const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    throw new Error("El nombre es inválido");
  }
};

export const validateText = (text, field = "Campo") => {
  if (!text || text.trim().length < 3) {
    throw new Error(`${field} inválido`);
  }
};

export const validateURL = (url) => {
  if (!url) {
    throw new Error("La URL es obligatoria");
  }

  try {
    const parsed = new URL(url);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error();
    }
  } catch {
    throw new Error("La URL introducida no es válida");
  }
};

export const validateTags = (tags) => {
  if (!tags) {
    throw new Error("Las etiquetas son obligatorias");
  }

  const arr = Array.isArray(tags)
    ? tags
    : tags.split(",");

  const cleaned = arr
    .map(t => t.trim().toLowerCase())
    .filter(Boolean);

  if (cleaned.length === 0) {
    throw new Error("Las etiquetas no pueden estar vacías");
  }

  return cleaned;
};
