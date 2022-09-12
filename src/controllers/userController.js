const path = require('path');
const fs = require('fs');


//Requerir Express-Validator
const { validationResult } =  require ( 'express-validator' );

//ubicación de DATA JSON todos los usuarios
const usersDataBase = path.join(__dirname, '..', 'data', 'usersDataBase');
const User = require ('../models/User.js');

//llamar de DATA JSON todos los usuarios
const users = JSON.parse(fs.readFileSync(usersDataBase, 'utf-8'));

const controlador = { 
    vistaUser: (req, res) => {
        res.render('users/user');
    },

    vistaLogin: (req, res) => {
        res.render('users/userLogin');
    },

    vistaRegister: (req, res) => {
        res.render('users/userRegister');
    },

    vistaLista: (req, res) => {
        res.render('users/userList', {users})
    },

    vistaInstructors: (req, res) => {
        res.render('users/userInstructors');
    },

    vistaDetail: (req, res) => {
        let id = req.params.id;
        let user=users[id];
        res.render('users/userDetail', {user});
    },

    registro: (req, res) => {
        let newUser ={
            imagenUsuario: 'default-user.png'
        };
        // agragar imagen
        if(req.file){
			newUser.imagenUsuario = req.file.filename;
		}else{
			newUser.imagenUsuario = 'default-user.png';
		};

        //Validar nuevo usuario
        const resultValidation = validationResult(req);
        if ( resultValidation.errors.length > 0){
            return res.render ( 'users/userRegister', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        };

        //crear nuevo usuario
        User.create(req.body);
        
        res.redirect("/users/list");
    },

    edit: (req, res) =>{
        let id = req.params.id;
        let userToEdit=users[id];
        res.render("users/userEdit",{userToEdit});
    },

    search:function(req,res){
        let busquedaUsuario = req.query.search;

        let usersResults = [];
        for(let i=0; i<users.length; i++){
            if(users[i].nombre_y_apellido.includes(busquedaUsuario)){
                usersResults.push(users[i]);
            }
        }
        res.render('users/userResults', {users: usersResults})
    }
};

module.exports = controlador;