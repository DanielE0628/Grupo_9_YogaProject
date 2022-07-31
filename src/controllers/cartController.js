const express = require ('express');

const estilos = {
    carrito:'/stylesheets/carrito-style.css',
};


const controlador ={
    cartView:(req,res)=>{
        res.render('products/cart',{title: 'CarritoDeCompras', estilo: estilos.carrito});
    }
};

module.exports = controlador;