//Middleware para verificar el rol del usuario administrador
export const requireAdmin = (req,res,next) => {
    if(!req.user || req.user.role !== "admin"){
        return res.status(403).json({message: "Debes ser un usuario administrador para acceder."});
    }
    next();
};