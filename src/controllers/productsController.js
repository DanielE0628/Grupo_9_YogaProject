const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
// const {Product} = require('../database/models/Product');
// const { all } = require('../routes/productsRoute');

const estilos = {
    productos: '/stylesheets/productos-style.css',

};

//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Category, Product, etc} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const products = db.Products;
const categorys = db.Categorys;
const marcas = db.Marcas;
const talles = db.Talles;

// .Promesas



const controller = {
        //todos los productos
        list: (req, res) => {
            
            products.findAll({
                include:[{association:"categorys"},{association:"marcas"},{association:"talles"}]
            })
            
                .then((productos)=>{
                    
                    res.render('products/products',{products:productos, title: 'Productos', estilo: estilos.productos });
                })
                .catch(error => res.send(error))
        },
        //detalle de un producto
        detail:(req, res) => {
            products.findByPk(req.params.id,{
                include:[{association:"categorys"},{association:"marcas"},{association:"talles"}]
            })
                .then((product)=>{
                    res.render("products/detail", {product})
                })
        },
        //Buscar prodcutos
        //pendiente
        // dale GIT


        //crear Prodcuto
        create: (req, res) => {
            // products.findAll({
            //     include:[{association:"categorys"},{association:"marcas"},{association:"talles"}]
            // })
            //    .then((products)=>{
            //    console.log(products.categorys)
            //     res.render('products/product-create',{products});
            // })
            // .catch(error => res.send(error))
           
            let promCategorys = categorys.findAll()
            let promMarcas = marcas.findAll()
            let promTalles = talles.findAll()
            Promise.all([promCategorys, promMarcas, promTalles])
            .then(([allCategorys, allMarcas, allTalles, products])=>{
                res.render('products/product-create', {allCategorys, allMarcas, allTalles, title: 'CrearProducto', estilo: estilos.crearProducto})
            }) .catch(error => res.send(error))
            
          },
        store:(req, res) => {
            let imagen = req.file.filename;
            console.log(imagen)
            console.log('imagen')

            products.create({
                name: req.body.name,
                category_id: req.body.category_id,
                price: req.body.price, 
                description: req.body.description,
                talle_id: req.body.talle_id,
                marca_id: req.body.marca_id,
                stock: req.body.stock,
                image: imagen,
                // create_at: req.body.created_at   
            })  
            .then((products)=>{
                res.redirect("/");
            })
                },
            //editar productos
            edit: (req, res) => {
                products.findByPk(req.params.id)
                .then((product)=>{
                    console.log(product);
                    res.render('products/product-edit',{product});
                })
            .catch(error => res.send(error))
            },

            update:(req, res) => {
                products.update([{
                    name: req.body.name,
                    category_id: req.body.category_id,
                    price: req.body.price, 
                    description: req.body.description,
                    talle_id: req.body.talle_id,
                    marca_id: req.body.marca_id,
                    stock: req.body.stock,
                    image: req.body.image,
                    // updated_at: req.body.updated_at   
                }])  
                .then((products)=>{
                    res.render('products/products-edit')
                })
            },
            
            //borrar productos
            delete: (req, res) => {
                products.findByPk(req.params.id)
                .then((product)=>{
                    console.log(product);
                    res.render('products/product-delete',{product});
                })
            .catch(error => res.send(error))
            },
            destroy: (req, res) => {
                products.destroy({
                    where: { id: req.params.id }
                });
                res.redirect('/products');
            },
      
}


module.exports = controller;