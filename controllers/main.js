const express = require ("express");
const path = require ("path");

const controlador = { 
    home: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/home'))
    },
    productos: (req, res) => {
        res.sendFile(path.join(__dirname,"../views/productos"))
    },
    login: (req, res) => {
        res.sendFile(path.join(__dirname,"../views/login"))
    },
    register: (req, res) => {
        res.sendFile(path.join(__dirname,"../views/register"))
    },
    detallesProductos: (req, res) => {
        res.sendFile(path.join(__dirname,"../views/detalle-productos"))
    },
};

module.exports = controlador;