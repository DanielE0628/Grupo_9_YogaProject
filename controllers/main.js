const express = require ("express");

const estilos = {
    home: '/css/home-style.css',
    productos: '/css/productos-style.css',
    detlleProducto:'/css/detalle-producto-style.css',
    register:'/css/register-style.css',
    login:'/css/login-style.css',

}

const controlador = { 
    vistaHome: (req, res) => {
        res.render('home',{title: 'Home', estilo: estilos.home});
    },
    productos: (req, res) => {
        res.render('products/productos',{title: 'Productos', estilo: estilos.productos});
    },
    detallesProductos: (req, res) => {
        res.render('products/detalle-productos', {title: 'DetalleDeProductos', estilo: estilos.detalleProducto});
    },
    login: (req, res) => {
        res.render('users/login',{title: 'Login', estilo: estilos.login});
    },
    register: (req, res) => {
        res.render('users/register', {title: 'Registro', estilo: estilos.register});
    },
    instuctores: (req, res) => {
        res.render('users/instructores', {title: 'Instuctores', estilo: estilos.register});
    },
};

module.exports = controlador;