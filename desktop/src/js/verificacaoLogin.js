function ensureAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        return next();
    } else {
        return res.send('<script>alert("Você não tem permissão para visualizar este recurso"); window.location.href="/Login";</script>');
    }
}

function ensureAdmin(req, res, next) {
    if (req.session.user && req.session.user.tipo === 'Adm') {
        return next();
    } else {
        return res.send('<script>alert("Você não tem permissão para visualizar este recurso"); window.location.href="/Login";</script>');
    }
}

function ensureMedico(req, res, next) {
    if (req.session.user && req.session.user.tipo === 'Medico') {
        return next();
    } else {
        return res.send('<script>alert("Você não tem permissão para visualizar este recurso"); window.location.href="/Login";</script>');
    }
}

module.exports = {
    ensureAuthenticated,
    ensureAdmin,
    ensureMedico
};
