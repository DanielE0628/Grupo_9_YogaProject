const express = require ("express");

const estilos = {
    register:'/stylesheets/register-style.css',
    login:'/stylesheets/login-style.css',
    instructors: '/stylesheets/instructors-style.css',
};

const controlador = { 
    vistaLogin: (req, res) => {
        res.render('users/login.ejs',{title: 'Login', estilo: estilos.login});
    },

    vistaRegister: (req, res) => {
        res.render('users/register.ejs', {title: 'Registro', estilo: estilos.register});
    },

    vistaInstructors: (req, res) => {
        res.render('users/instructors.ejs', {title: 'Instuctores', estilo: estilos.instructors});
    },
};

module.exports = controlador;