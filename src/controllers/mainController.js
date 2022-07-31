const express = require ("express");

const estilos = {
    home: '/stylesheets/home-style.css',
};
const controlador = { 
    vistaHome: (req, res) => {
        res.render('home',{title: 'Inicio', estilo: estilos.home});
    },
};

module.exports = controlador;