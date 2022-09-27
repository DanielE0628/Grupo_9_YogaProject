const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {Product} = require('../database/models/Product');
const { all } = require('../routes/productsRoute');

const estilos = {
    productos: '/stylesheets/productos-style.css',
    detalleProducto:'/stylesheets/detail-style.css',
    crearProducto:'/stylesheets/product-create-style.css'
    
};



//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Category, Product, etc} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const products = db.products;
const categorys = db.categorys;
const marcas = db.marcas;
const talles = db.talles;

// .Promesas



const controller = {
        //todos los productos
        list: (req, res) => {
            
            products.findAll({
                include:["categorys"]
            })
            
                .then((productos)=>{
                    res.render('products/products',{products:productos, title: 'Productos', estilo: estilos.productos });
                })
                .catch(error => res.send(error))
        },
        //detalle de un producto
        detail:(req, res) => {
            products.findByPk(req.params.id)
                .then((product)=>{
                    res.render("products", {product})
                })
        },
        //Buscar prodcutos
        //pendiente
        // dale GIT


        //crear Prodcuto
        create: (req, res) => {
            categorys.findAll()
            .then((allCategorys)=>{
                console.log(allCategorys)
                res.render('products/product-create',{allCategorys, title: 'Productos', estilo: estilos.productos });
            })
            // Promise.all([promCategorys, promMarcas, promTalles])
            //  .then(([allCategorys, allMarcas, AllTalles]))
            //      res.render('products/product-create', {allCategorys, allMarcas, AllTalles ,title: 'CrearProducto', estilo: estilos.crearProducto})
             .catch(error => res.send(error))
            
          },
        store:(req, res) => {
            products.create([{
                name: req.body.name,
                category_id: req.body.category_id,
                price: req.body.price, 
                description: req.body.description,
                talle_id: req.body.talle_id,
                marca_id: req.body.marca_id,
                stock: req.body.stock,
                image: req.body.image,
                // create_at: req.body.created_at   
            }])  
            .then((products)=>{
                res.render('products/products',{products:products, title: 'Productos', estilo: estilos.productos });
            })
                },
}

module.exports = controller;