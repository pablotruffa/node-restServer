let verificaAdmin = (req, res, next) => {
    if (req.usuario.role != 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            error: {
                message: 'Usuario sin privilegios.'
            }
        });
    }

    next();
}

module.exports = {
    verificaAdmin
}