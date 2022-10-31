function authMiddleware (req, res, next) {

    if (!req.session.userLogged && !res.locals.userLogged.isAdmin){
        return res.redirect('/users/login');
    }
    next();
}

module.exports = authMiddleware;