//Middleware para verificar JWT
import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next) => {
    const token = req.cookies?.auth_token;

    //Si no existe el token devuelve un error
    if(!token){
        return res.status(401).json({message: "Token no proporcionado"});
    }

    //Verifica el token
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }catch(error){
        return res.status(403).json({message: "Token invalido"});
    }
};