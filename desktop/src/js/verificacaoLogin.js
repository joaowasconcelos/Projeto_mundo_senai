function ensureAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        return next();
    } else {
        req.flash('error', 'Faça login para ter Acesso');
        return res.redirect('/login');
    }
}
function ensureAdmin(req, res, next) {
    if (req.session.user && req.session.user.tipo.includes("adm")) {
        return next();
    } else {
        req.flash('error', 'Faça login para ter Acesso');
        return res.redirect('/login');
    }
}
function ensureMedico(req, res, next) {
    if (req.session.user && req.session.user.tipo.includes("medico")) {
        return next();
    } else {
        req.flash('error', 'Faça login para ter Acesso');
        return res.redirect('/login');
    }
}


module.exports = { ensureAuthenticated, ensureAdmin, ensureMedico };
