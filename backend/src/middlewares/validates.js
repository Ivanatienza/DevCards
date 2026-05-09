export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !regex.test(email)){
        throw new Error('El email es inválido.');
    }
};

export const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
    if(!password || !regex.test(password)){
        throw new Error('La contraseña ha de tener 6 caracteres mínimo, una minúscula, una mayúscula, un número y un caracter especial');
    }
};

export const validateName = (name) => {
    if(!name || name.trim().length < 2){
        throw new Error("El nombre es inválido");
    }
};


export const validateText = (text, field = "Campo") => {
    if(!text || text.trim().length < 3){
        throw new Error(`${field} inválido`);
    }
};

export const validateURL = (url) => {
    if(!url)
        return;

    try{
        const parsed = new URL(url);
        
        if(!["http: ", "https"].includes(parsed.protocol)){
            throw new Error();
        }
    }catch(error){
        throw new Error('La URL introducida no es válida');
    }
};

export const validateTags = (tags) => {
    if(!Array.isArray(tags)){
        throw new Error("Las etiquetas son inválidas");
    }
};