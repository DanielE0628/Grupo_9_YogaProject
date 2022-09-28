const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {Product} = require('../database/models/Product');
const { all } = require('../routes/productsRoute');

const controlador ={
    cartVista:(req,res)=>{
        res.render('products/cart');
        // db.Product.findAll()
        // .then((userCart)=>{
        //     res.render('products/cart',{userCart});//en la vista userCart.cart
        //     })
    },
    cartAdd:(req, res)=>{
        db.user.update(req.params.id)
        .then((addProduct)=>{
            db.user.cart =[];  // no va a funcionar es la idea, buscar manera de hacerlo
            cart.push(addproduct)
            return db.user.cart
            res.render('products/cart',{addProduct});
            })
    },
    //borrar producto del carrito
    cartDestroy:(req, res)=>{
        db.user.update(req.params.id)
        .then((deleteProduct)=>{
            db.user.cart =[];  // no va a funcionar es la idea, buscar manera de hacerlo
            cart.pop(deleteProduct)
            return db.user.cart
            res.render('products/cart',{deleteProduct});
            })
    }, 
   
    //vaciar carrito
       cartDestroyAll:(req, res)=>{
        db.user.cart.delete(req.params.id)
        .then((deleteAllProducts)=>{
              // no va a funcionar es la idea, buscar manera de hacerlo
            
            res.render('products/cart',{deleteAllProducts});
            })
}
}
module.exports = controlador;
