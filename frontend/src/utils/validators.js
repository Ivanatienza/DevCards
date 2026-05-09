export const required = (value) => {
    return value && value.trim() !== "" || "Campo obligatorio";
};

export const minLength = (min) => (value) => {
    return value.length >= min || `Introduce un mínimo de ${min} caracteres`;
};

export const isEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) || "El email es inválido";
};

export const isURL = (value) => {
    if(!value) return true;

    try{
        new URL(value);
        return true;
    }catch(error){
        return "La URL es incorrecta";
    }
};