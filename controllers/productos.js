const express = require ("express");


let idProducto = req.params.id;
const controlador = { 
    vistaDetalleMenu: (req, res) =>{
        let idProducto = req.params.id;
    }
}; const listaProductos = [
    {
            nombre: "Ropa mujer 1" ,
            descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit.Unde adipisci quam maiores eum",
            precio: "$ 5000.00",
            imagen:"/images/productos/indumentaria/mujer-1.png",
        },
];

module.exports = controlador;

