const express = require ("express");

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
        res.render('users/login',{title: 'Login', estilo: estilos.login});
    },

    vistaRegister: (req, res) => {
        res.render('users/register', {title: 'Registro', estilo: estilos.register});
    },

    vistaInstructors: (req, res) => {
        res.render('users/instructors', {title: 'Instuctores', estilo: estilos.instructors});
    },
};

module.exports = controlador;