//Requerir Express-Validator
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");

const controlador = {
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

    login: async (req, res) => {
        try {
            const userToLogin = await db.Users.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (userToLogin.dataValues.isActive) {

                let userLogged = {
                    id: userToLogin.id,
                    cart: userToLogin.cart,
                    avatar: userToLogin.avatar,
                    email: userToLogin.email,
                    name: userToLogin.name,
                    lastName: userToLogin.lastName,
                    birthdate: userToLogin.birthdate,
                    isAdmin: userToLogin.isAdmin,
                    created_at: userToLogin.created_at,
                    updated_at: userToLogin.updated_at,
                    isActive: userToLogin.isActive
                }

                if (req.body.recordar) {
                    res.cookie(
                        'userEmail',
                        req.body.email,
                        { maxAge: ((1000 * 60) * 60) }
                    )
                }

                if (userToLogin) {
                    let passCompared = bcryptjs.compareSync(req.body.password, userToLogin.password);
                    if (passCompared) {
                        req.session.userLogged = userLogged;
                        res.redirect('/');
                    }

                    return res.render('users/userLogin', {
                        errors: {
                            email: {
                                msg: 'las credenciales son inválidas'
                            }
                        }
                    })
                }

            }
            return res.render('users/userLogin', {
                errors: {
                    email: {
                        msg: 'Email no registrado'
                    }
                }
            });

        } catch (error) {
            console.log('************************-----------ERROR-----------************************')
            console.log('In userController login!!!');
            console.log(error);
            res.send("Error de proceso")
        }




    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    },

    vistaProfile: async (req, res) => {
        //buscar usuario en db
        const userDb = await db.Users.findByPk(req.session.userLogged.id)

        res.render('users/userProfile', { user: userDb });

    },

    editar: async (req, res) => {
        try {
            //buscar usuario por ID en db
            const userDb = await db.Users.findOne({
                where: {
                    id: req.params.id
                }
            });
            //agregar imagen 
            let imagen = userDb.avatar;
            if (req.file) {
                imagen = req.file.filename
            };
            //editar usuario
            let userToEdit = {
                avatar: imagen,
                name: req.body.nombre,
                lastName: req.body.apellido,
                birthdate: req.body.fecha_de_nacimiento,
            };
            if (req.session.userLogged.isAdmin) {
                userToEdit.isActive = req.body.activarUser;
                userToEdit.isAdmin = req.body.userAdmin;
            }

            await db.Users.update(userToEdit, {
                where: {
                    id: req.params.id
                }
            });
            const userEdit = await db.Users.findByPk(req.params.id)
            if (req.session.userLogged.email === userEdit.dataValues.email) {
                req.session.userLogged = userEdit.dataValues;
            }
            res.redirect(`${req._parsedOriginalUrl.pathname}`)

        } catch (error) {
            console.log('************************-----------ERROR-----------************************')
            console.log('In userController editar!!!');
            console.log(error);
            res.send("Error de proceso")
        }


        // //Validar datos usuario
        // const resultValidation = validationResult(req);
        // if (resultValidation.errors.length > 0) {
        //     return res.render('users/userProfile', { user },{
        //         errors: resultValidation.mapped(),
        //         oldData: req.body
        //     })
        // };
    },

    logicDelete: async (req, res) => {
        try {
            const userDb = await db.Users.findByPk(req.params.id)

            let userToEdit = userDb.dataValues
            userToEdit.isActive = false
            console.log(userToEdit)

            await db.Users.update(userToEdit, {
                where: {
                    id: req.params.id
                }
            })

            req.session.userLogged = false;
            res.redirect(`/`);


        } catch (error) {
            console.log('************************-----------ERROR-----------************************')
            console.log('In userController logicDelete!!!');
            console.log(error);
            res.send("Error de proceso")
        }
    },

    vistaDelete: async (req, res) => {

        //buscar usuario en db
        const userDb = await db.Users.findByPk(req.params.id)

        res.render('users/userDelete', { user: userDb });

    },

    eliminar: async (req, res) => {
        try {
            let borrarUser = req.body.borrarUser

            if (borrarUser != "false") {
                const userAdmin = await db.Users.findOne({
                    where: {
                        email: req.session.userLogged.email
                    }
                })

                const userToDelete = await db.Users.findByPk(req.body.borrarUser)

                if (userAdmin) {
                    let passCompared = bcryptjs.compareSync(req.body.password, userAdmin.password);
                    
                    if (passCompared) {
                        await db.Users.destroy({
                            where: {
                                id: req.body.borrarUser
                            }
                        })
                        console.log('************************----------------------************************')
                        console.log(`El usuario ${userToDelete.name} fue eliminado por ${userAdmin.name}`)
                        console.log('************************----------------------************************')
                        res.redirect('/users/list')
                    }

                    return res.render(`users/userDelete`, {
                        errors: {
                            password: {
                                msg: 'las credenciales son inválidas'
                            }
                        },
                        user: userToDelete.dataValues
                    })
                    
                }
            }
            res.redirect('/users/list')

        } catch (error) {
            console.log('************************-----------ERROR-----------************************')
            console.log('In userController eliminar!!!');
            console.log(error);
            res.send("Error de proceso")
        }
    }
};

module.exports = controlador;