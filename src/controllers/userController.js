//const express = require ("express");
const fs = require('fs');
const path = require('path');

//Requerir Express-Validator
const { validationResult } =  require ( 'express-validator' );

//ubicación de DATA JSON todos los usuarios
const usersDataBase = path.join(__dirname, '..', 'data', 'usersDataBase.json');
const User = require ('../models/User.js')

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
        let idUser = req.params.idUser;
        let user=users[idUser];
        res.render('users/userDetail', {user});
    },

    registro: (req, res) => {
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
        let idUser = req.params.idUser;
        let userToEdit=users[idUser];
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