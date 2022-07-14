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
        res.render('productos',{title: 'Productos', estilo: estilos.productos});
    },
    detallesProductos: (req, res) => {
        res.render('detalle-productos', {title: 'DetalleDeProductos', estilo: estilos.detalleProducto});
    },
    login: (req, res) => {
        res.render('login',{title: 'Login', estilo: estilos.login});
    },
    register: (req, res) => {
        res.render('register', {title: 'Registro', estilo: estilos.register});
    },
};

module.exports = controlador;