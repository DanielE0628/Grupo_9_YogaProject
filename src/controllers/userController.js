//Requerir Express-Validator
const { validationResult } = require('express-validator');
const User = require('../models/User.js');
const bcryptjs = require('bcryptjs');
//llamar de DATA JSON todos los usuarios
const users = User.findAll();

const controlador = {
    vistaUser: (req, res) => {
        res.render('users/user');
    },

    

    vistaLista: (req, res) => {
        let users = User.findAll();
        res.render('users/userList', { users })
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

        if (resultValidation.errors.length > 0) {
            return res.render('users/userRegister', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        };
        //buscar usuario por email en db
        let userDb = User.findByField('email', req.body.email);

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

        //crear nuevo usuario
        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            comfirmPassword: bcryptjs.hashSync(req.body.comfirmPassword, 10),
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
        }else{
            //agregar imagen o imagen default
            let imagen = User.addAvatar(req.file);
            userToCreate.imagenUsuario = imagen;
            let userCreate = User.create(userToCreate);
            res.redirect("/users/login");
        };


    },

    vistaLogin: (req, res) => {
        res.render('users/userLogin');
    },

    login: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);

        if (userToLogin) {
            let passComparePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (passComparePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                res.redirect('/');

            }

            if (req.body.recordar) {
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60 * 60) })
            }

            return res.render('users/userLogin', {
                errors: {
                    email: {
                        msg: 'las credenciales son inválidas'
                    }
                }
            });
        }

        return res.render('users/userLogin', {
            errors: {
                email: {
                    msg: 'Usuario no registrado'
                }
            }
        });
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    },

    vistaProfile: (req, res) => {
        let id = req.session.userLogged.id;
        //buscar usuario por email en db
        let userDb = User.findByPk(id);
        let user = userDb;
        console.log('user');
        console.log(user);

        res.render('users/userProfile', { user });
    },

    edit: (req, res) => {

        // //Validar datos usuario
        // const resultValidation = validationResult(req);
        // if (resultValidation.errors.length > 0) {
        //     return res.render('users/userProfile', {
        //         errors: resultValidation.mapped(),
        //         oldData: req.body
        //     })
        // };

        let userToEdit = {
            id: req.params.id,
            name: req.body.name,
            apellido: req.body.apellido,
        }  
        
        console.log('userToEdit');
        console.log(req.body);
        res.redirect("/")
    },

    search: function (req, res) {
        let busquedaUsuario = req.query.search;
        let usersResults = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].nombre_y_apellido.includes(busquedaUsuario)) {
                usersResults.push(users[i]);
            }
        }
        res.render('users/userResults', { users: usersResults })
    }
};

module.exports = controlador;