export const requireAdmin = (req,res,next) => {
    if(!req.user || req.role !=="admin"){
        return res.status(403).json({message: "Debes ser un usuario administrador para acceder."});
    }
    next();
};