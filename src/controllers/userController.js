const express = require ("express");
const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');

const estilos = {
    register:'/stylesheets/register-style.css',
    login:'/stylesheets/login-style.css',
    instructors: '/stylesheets/instructors-style.css',
};

//llamar de DATA JSON todos los usuarios
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controlador = { 
    vistaUser: (req, res) => {
        res.render('users/user',{title: 'Usuario', estilo: estilos.login});
    },

    vistaLogin: (req, res) => {
        res.render('users/login',{title: 'Login', estilo: estilos.login});
    },

    vistaRegister: (req, res) => {
        res.render('users/register', {title: 'Registro', estilo: estilos.register});
    },

    vistaLista: (req, res) => {
        
        res.render('users/userList', {title: 'ListaDeUsuarios', estilo: estilos.register, users});
    },

    vistaInstructors: (req, res) => {
        res.render('users/instructors', {title: 'Instuctores', estilo: estilos.instructors});
    },
    create: (req, res) => {
        
        //crear nuevo usuario
        const newUsers = req.body;
        //new id
        newUsers.id = users.length ++;
        // agragar imagen
        if(req.file){
			newUsers.imagenUsuario = req.file.filename;
		}else{
			newUsers.imagenUsuario = "default-user.png";
		}
        //agregar nuevo usuario a DATA JSON
        users.push(newUsers);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));

        res.redirect("/users/list");
    },
    edit: (req, res) =>{
        let idUser = req.params.idUser;
        let userToEdit=users[idUser];

        res.render("userEdit",{userToEdit:userToEdit});
    },
    search:function(req,res){
        let loQueBuscoElUsuario = req.query.search;

        let usersResults = [];
        for(let i=0; i<users.length; i++){
            if(users[i].name.includes(loQueBuscoElUsuario)){
                usersResults.push(users[i]);
            }
        }
       res.render('users/userResults', {usersResults: usersResults})
    }
};

module.exports = controlador;