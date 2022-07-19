const express = require ("express");

const estilos = {
    home: '/stylesheets/home-style.css',
    // productos: '/stylesheets/productos-style.css',
    // detlleProducto:'/stylesheets/detalle-producto-style.css',
    // register:'/stylesheets/register-style.css',
    // login:'/stylesheets/login-style.css',
};
// const productos = [
//     {
//         categoria: "Indumentaria",
//         subCategoria: "Mujer",
//         nombre: "Ropa ahoira funciona" ,
//         descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit.Unde adipisci quam maiores eum",
//         precio: "$ 5000.00",
//         imagen:"/images/productos/indumentaria/mujer-1.png",
//         },
//     ]
    
const controlador = { 
    vistaHome: (req, res) => {
        res.render('home.ejs',{title: 'Home', estilo: estilos.home});
    },
    
    // vistaProductos: (req, res) => {
        
    //     res.render('products/productos',{productos: productos,title: 'Productos', estilo: estilos.productos});
    // },

    // detallesProductos: (req, res) => {
    //     res.render('products/detalle-productos', {title: 'DetalleDeProductos', estilo: estilos.detalleProducto});
    // },

    // login: (req, res) => {
    //     res.render('users/login',{title: 'Login', estilo: estilos.login});
    // },

    // register: (req, res) => {
    //     res.render('users/register', {title: 'Registro', estilo: estilos.register});
    // },

    // instuctores: (req, res) => {
    //     res.render('users/instructores', {title: 'Instuctores', estilo: estilos.register});
    // },
};

module.exports = controlador;