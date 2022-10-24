//Requerir Express-Validator
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize")


const controlador = {
    vistaUser: (req, res) => {
        res.render('users/user');
    },

    vistaLista: (req, res) => {
        db.Users.findAll()
            .then((users) => {
                res.render('users/userList', { users })
            })
    },

    vistaDetalle: (req, res) => {
        db.Users.findByPk(req.params.id)
            .then((user) => {
                res.render('users/userDetail', { user })
            })
    },

    vistaInstructors: (req, res) => {
        res.render('users/userInstructors');
    },

    vistaRegister: (req, res) => {
        res.render('users/userRegister');
    },

    registro: (req, res) => {
        //Validar nuevo usuario
        const resultValidation = validationResult(req);

        //Validar nuevo usuario
        if (resultValidation.errors.length > 0) {
            return res.render('users/userRegister', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        };

        //buscar usuario por email en db
        db.Users.findOne({
            where: {
                email: req.body.email
            }
        })
            .then((userDb) => {
                //Validar usuario existente
                if (userDb) {
                    return res.render('users/userRegister', {
                        errors: {
                            email: {
                                msg: 'Este email ya está registrado'
                            }
                        },
                        oldData: req.body
                    })
                };
            })

        //crear nuevo usuario
        let userToCreate = {
            avatar: "",
            email: req.body.email,
            name: req.body.nombre,
            birthdate: req.body.fecha_de_nacimiento,
            password: bcryptjs.hashSync(req.body.password, 10),
        }

        //comparar contraseñas 
        let comparePass = bcryptjs.compareSync(req.body.comfirmPassword, userToCreate.password);

        if (!comparePass) {
            return res.render('users/userRegister', {
                errors: {
                    comfirmPassword: {
                        msg: 'Las contraseñas no coinciden'
                    }
                },
                oldData: req.body
            })
        } else {
            //agregar imagen o imagen default
            let imagen = 'default-user.png';
            if (req.file) {
                imagen = req.file.filename;
            }
            userToCreate.avatar = imagen;
            //Guardar usuarion en Db
            db.Users.create(userToCreate)
                .then(() => {
                    res.redirect("/users/login");
                })
        }
    },

    vistaLogin: (req, res) => {
        res.render('users/userLogin');
    },

    login: (req, res) => {
        db.Users.findOne({
            where: {
                email: req.body.email
            }
        })
            .then((userToLogin) => {
                if (userToLogin) {
                    let passCompared = bcryptjs.compareSync(req.body.password, userToLogin.password);
                    if (passCompared) {
                        delete userToLogin.password;
                        req.session.userLogged = userToLogin;
                        res.render('home');
                    } else {
                        return res.render('users/userLogin', {
                            errors: {
                                email: {
                                    msg: 'las credenciales son inválidas'
                                }
                            }
                        });
                    }

                    if (req.body.recordar) {
                        res.cookie(
                            'userEmail',
                            req.body.email,
                            { maxAge: (1000 * 60 * 60) }
                        )
                    }

                    return res.render('users/userLogin', {
                        errors: {
                            email: {
                                msg: 'Email no registrado'
                            }
                        }
                    });
                }
            })
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    },

    vistaProfile: (req, res) => {
        //buscar usuario en db
        db.Users.findByPk(req.session.userLogged.id)
            .then((userDb) => {
                res.render('users/userProfile', { user: userDb });
            })
    },

    editar: (req, res) => {
        //buscar usuario por ID en db
        db.Users.findByPk(req.params.id)
            .then((userDb) => {
                //agregar imagen 
                let imagen = userDb.avatar;
                if (req.file) {
                    imagen = req.file.filename
                }
                //editar usuario
                let userToEdit = {
                    avatar: imagen,
                    name: req.body.nombre,
                    lastName: req.body.apellido,
                    birthdate: req.body.fecha_de_nacimiento,
                }

                db.Users.update(userToEdit, {
                    where: {
                        id: req.params.id
                    }
                })
                    .then(() => {
                        req.session.userLogged = userDb
                        res.redirect(`/`);
                    })
            })

        // //Validar datos usuario
        // const resultValidation = validationResult(req);
        // if (resultValidation.errors.length > 0) {
        //     return res.render('users/userProfile', { user },{
        //         errors: resultValidation.mapped(),
        //         oldData: req.body
        //     })
        // };
    },

    logicDelete: (req, res) => {
        db.Users.findByPk(req.params.id)
            .then((userDb) => {
                let userToEdit = {
                    active: false,
                }
                db.Users.update(userToEdit, {
                    where: {
                        id: req.params.id
                    }
                })
                    .then(() => {
                        req.session.userLogged = false;
                        res.redirect(`/`);
                    })
            })
    },

    eliminar: (req, res) => {
        db.Users.destroy({
            where: {
                id: req.body.id
            }
        })
            .then((userDelete) => {
                res.render(`el usuario ${userDelete.name} fue eliminado`)
            })
    },
};

module.exports = controlador;