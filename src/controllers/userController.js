// const express = require ("express");
const fs = require('fs');
const path = require('path');

//ubicación de DATA JSON todos los usuarios
const usersDataBase = path.join(__dirname, '../data/usersDataBase.json');
//llamar de DATA JSON todos los usuarios
const users = JSON.parse(fs.readFileSync(usersDataBase, 'utf-8'));

const estilos = {
    register:'/stylesheets/register-style.css',
    login:'/stylesheets/login-style.css',
    instructors: '/stylesheets/instructors-style.css',
};

const controlador = { 
    vistaUser: (req, res) => {
        res.render('users/user',{title: 'Usuario', estilo: estilos.login});
    },

    vistaLogin: (req, res) => {
        res.render('users/userLogin',{title: 'Login', estilo: estilos.login});
    },

    vistaRegister: (req, res) => {
        res.render('users/userRegister', {title: 'Registro', estilo: estilos.register});
    },

    vistaLista: (req, res) => {
        res.render('users/userList', {users, title: 'ListaDeUsuarios', estilo: estilos.register, })
    },

    vistaInstructors: (req, res) => {
        res.render('users/userInstructors', {title: 'Instuctores', estilo: estilos.instructors});
    },
    create: (req, res) => {
        //crear nuevo usuario
        const newUser = {
            id: req.body.id,
            nombre_y_apellido: req.body.nombre_y_apellido,
            email: req.body.email,
            fecha_de_nacimiento: req.body.fecha_de_nacimiento,
            pasword: req.body.pasword,
            comfirmPasword: req.body.comfirmPasword,
            imagenUsuario: req.body.imagenUsuario,
        };
        //new id
        newUser.id = users.length;
        // agragar imagen
        if(req.file){
			newUser.imagenUsuario = req.file.filename;
		}else{
			newUser.imagenUsuario = 'default-user.png';
		}
        //agregar nuevo usuario a DATA JSON
            users.push(newUser);
            fs.writeFileSync(usersDataBase, JSON.stringify(users, null, '   '));
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
            if(users[i].nombre_y_apellido.includes(loQueBuscoElUsuario)){
                usersResults.push(users[i]);
            }
        }
        res.render('users/userResults', {usersResults: usersResults})
    }
};

module.exports = controlador;