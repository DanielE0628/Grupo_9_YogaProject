//Requerir Express-Validator
const { validationResult } =  require ( 'express-validator' );

const User = require ('../models/User.js');

//llamar de DATA JSON todos los usuarios
const users = User.findAll();

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
        let users = User.findAll();
        res.render('users/userList', {users})
    },

    vistaInstructors: (req, res) => {
        res.render('users/userInstructors');
    },

    vistaDetail: (req, res) => {
        let id = req.params.id;
        let user = User.findByPk(id);
        res.render('users/userDetail', {user});
    },

    registro: (req, res) => {
        
        //Validar nuevo usuario
        const resultValidation = validationResult(req);
        if ( resultValidation.errors.length > 0){
            return res.render ( 'users/userRegister', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        };
        //agregar imagen o imagen default
        let imagen = User.addAvatar(req.file);
        //crear nuevo usuario
        User.create(req.body,imagen);
        
        res.redirect("list");
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