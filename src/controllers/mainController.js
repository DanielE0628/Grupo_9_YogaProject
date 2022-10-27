const express = require ("express");

const estilos = {
    home: '/stylesheets/home-style.css',
};
const controlador = { 
    vistaHome: (req, res) => {
        res.render('home');
        console.log('req.cookies.userEmail')
        console.log(req.cookies.userEmail)
    },
    vistaAdmins: (req, res) => {
        res.render('admins',{title: 'Inicio', estilo: estilos.home});
    },
};

module.exports = controlador;