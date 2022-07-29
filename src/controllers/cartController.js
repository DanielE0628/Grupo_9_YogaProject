const express = require ('express');


const controlador ={
    cartView:(req,res)=>{
        res.render('products/cart',{title: 'Carrito'});
    }
};

module.exports = controlador;