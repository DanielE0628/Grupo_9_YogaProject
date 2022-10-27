const db = require('../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize")

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    try {
        if (req.cookies.userEmail) {
            const userToCookie = await db.Users.findOne({
                where: {
                    email: req.cookies.userEmail,
                }
            })
            if (!req.session.userLogged) {
                res.locals.isLogged = true;
                res.locals.userLogged = userToCookie
            }
        }
        if (req.session.userLogged) {
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged
        }

        next();

    } catch (error) {
        console.log('error in middleware')
        console.log(error)
        next();
    }
}

module.exports = userLoggedMiddleware;


