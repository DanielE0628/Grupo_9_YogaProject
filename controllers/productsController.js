const express = require ("express");

const estilos = {
    productos: '/stylesheets/productos-style.css',
    detalleProducto:'/stylesheets/detalle-producto-style.css',
};

const productos = [
{
    categoria: "Indumentaria",
    subCategoria: "Mujer",
    nombre: "Ropa mujer 1" ,
    descripcion: " Lorem ipsum dolor sit amet consectetur adipisicing elit.Unde adipisci quam maiores eum",
    precio: "$ 5000.00",
    imagen:"/images/productos/indumentaria/mujer-1.png",
    },
];

const controlador = { 
    vistaProductos: (req, res) => {
        res.render('products/products',{title: 'Productos', estilo: estilos.productos, productos: productos});
    },
    detallesProductos: (req, res) => {
        res.render('products/detail', {title: 'DetalleDeProductos', estilo: estilos.detalleProducto});
    },
}; 

module.exports = controlador;