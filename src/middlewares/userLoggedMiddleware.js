const db = require('../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");

function userLoggedMiddleware(req, res, next) {
    
    req.cookies.email? () =>{
        res.locals.isLogged = false
        db.Users.findOne({
            where: {
                email: req.cookies.email
            }
        })
        .then((userFromCookie) => {
            
            if (userFromCookie) {
                req.session.userLogged = userFromCookie;
            }
            
            if (req.session.userLogged) {
                res.locals.isLogged = true;
                res.locals.userLogged = req.session.userLogged;
            }
            
            next();
        });
    } : next();
}
module.exports = userLoggedMiddleware;