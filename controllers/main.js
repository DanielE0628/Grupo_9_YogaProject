const express = require ("express");

const controlador = { 
    vistaHome: (req, res) => {
        res.render('home',{title: 'Home'});
    },
    productos: (req, res) => {
        res.render('productos',{title: 'Productos'});
    },
    login: (req, res) => {
        res.render('login',{title: 'Login'});
    },
    register: (req, res) => {
        res.render('register', {title: 'Registro'});
    },
    detallesProductos: (req, res) => {
        res.render('detalle-productos', {title: 'DetalleDeProductos'});
    },
};

module.exports = controlador;