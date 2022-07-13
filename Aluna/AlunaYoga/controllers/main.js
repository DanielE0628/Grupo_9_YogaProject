const express = require ("express");
const path = require ("path");

const controlador = { 
    home: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/home.ejs'))
    },
    productos: (req, res) => {
        res.sendFile(path.join(__dirname,"../views/productos.html"))
    },
    login: (req, res) => {
        res.sendFile(path.join(__dirname,"../views/login.html"))
    },
    register: (req, res) => {
        res.sendFile(path.join(__dirname,"../views/register.html"))
    },
    detallesProductos: (req, res) => {
        res.sendFile(path.join(__dirname,"../views/detalle-productos.html"))
    },
}

module.exports = controlador;