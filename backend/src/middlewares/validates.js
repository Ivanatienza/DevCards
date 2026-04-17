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

export const validateURL = (url) => {
    if(!url)
        return;
    try{
        const parsed = new URL(url);
        
        if(parsed.protocol !== 'http:' && parsed.protocol !== 'https:'){
            throw new Error('La URL debe empezar por http o https');
        }
    }catch(error){
        throw new Error('La URL introducida no es válida');
    }
}; 