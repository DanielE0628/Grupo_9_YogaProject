const express = require ('express');


const controlador ={
    cartView:(req,res)=>{
        res.render('products/cart',{title: 'Carrito', estilo:'/stylesheets/carrito-style.css',});
    }

};

module.exports = controlador;