const express = require ('express');


const controlador ={
    cartView:(req,res)=>{
        res.render('cart',{title: 'Cart'});
    }
};

module.exports = controlador;