function ensureAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        return next();
    } else {
        res.status(401).send('Você não tem permissão para visualizar este recurso');
    }
}
function ensureAdmin(req, res, next) {
    if (req.session.user && req.session.user.tipo.includes("adm")) {
        return next();
    } else {
        res.status(403).send('Você não tem permissão para visualizar este recurso');
    }
}
function ensureMedico(req, res, next) {
    if (req.session.user && req.session.user.tipo.includes("medico")) {
        return next();
    } else {
        res.status(403).send('Você não tem permissão para visualizar este recurso');
    }
}


module.exports = { ensureAuthenticated, ensureAdmin, ensureMedico };
