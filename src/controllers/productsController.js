const path = require('path');
//-----------Validator--------------
const { validationResult } = require('express-validator');
//--------Sequelize----------
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op, where } = require("sequelize");





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
    //---------------------------------GUESTS-------------------------------------
         //todos los productos
         list: (req, res) => {
            let promCategorys = categorys.findAll()
            let promMarcas = marcas.findAll()
            let promProducts =products.findAll({
                include:[{association:"categorys"},{association:"marcas"},{association:"talles"}]
            })
            Promise.all([promProducts, promCategorys, promMarcas])
                .then(([products, allCategorys, allMarcas])=>{

                    res.render('products/products',{ products, allCategorys, allMarcas});
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
        search: (req, res) => {
            let search = req.query.search
            let promCategorys = categorys.findAll()
            let promMarcas = marcas.findAll()
            let promProducts =products.findAll({
                where:{ name: { [Op.like]: '%' + `${search}`  + '%' }},
                include:[{association:"categorys"},{association:"marcas"},{association:"talles"}]
            })
            Promise.all([promProducts, promCategorys, promMarcas])
            .then(([products, allCategorys, allMarcas])=>{
                res.render('products/products',{ products, allCategorys, allMarcas});
            })
            .catch(error => res.send(error))


        },
        //---------------------------- Menu----------------------------------
        // menuCategory: (req, res)=>{
        //     let promCategorys = categorys.findAll()
        //     let promMarcas = marcas.findAll()
        //     let promProducts = products.findAll({
        //         where:{ category_id:{  [Op.eq] : req.body.category} },
        //         include:[{association:"categorys"},{association:"marcas"},{association:"talles"}]
        //     })
        //     Promise.all([promProducts, promCategorys, promMarcas])
        //     .then(([products, allCategorys, allMarcas])=>{
        //         res.render('products/products',{ products, allCategorys, allMarcas});
        //     })
        //     .catch(error => res.send(error))
        // },
 //---------------------------- Filro----------------------------------
        filter: (req, res)=>{
             //---------categoria-------------
            let categoria = req.body.category;
             //---------marca-------------
            let marca = req.body.marca;
            //-----------------------condicional where------------------
            let whereIf = "";
            if(categoria && !marca  ){ whereIf = {category_id: categoria }}
            else if (!categoria && marca){ whereIf = {  marca_id: marca }}
            else if (categoria && marca){ whereIf = [{category_id: categoria},{marca_id: marca}]}
            //-----------------------------orden------------
            //-------precio------------
            let orderPrice = req.body.orderPrice;
            let price = "";
            if(orderPrice == 1){ price = ["finalPrice"] } else {price = ["finalPrice", "DESC"]};
            //----------nombre---------
            let orderAlfa = req.body.orderAlfa;
            let alfa = "";
            if(orderAlfa == 1){ alfa = ["name"] } else {alfa = ["name", "DESC"]};
            //-------fecha------
            let orderDate = req.body.orderDate;
            if (orderDate){ordeDateIf =["created_at"]};
            // condicional Order
            let orderIf ="";
            if (orderPrice && !orderAlfa && !orderDate){orderIf =[price]}
            else if (orderPrice && orderAlfa && !orderDate){orderIf =[price, alfa]}
            else if (orderPrice && orderAlfa && orderDate){orderIf =[price, alfa, "created_at"]}
            else if (!orderPrice && orderAlfa && !orderDate){orderIf =[alfa]}
            else if (!orderPrice && orderAlfa && orderDate){orderIf =[alfa,"created_at"]}
            else if (!orderPrice && !orderAlfa && orderDate){orderIf =["created_at"]};
            //-----------promesas---------------
            let promCategorys = categorys.findAll()
            let promMarcas = marcas.findAll()
            let promProducts = products.findAll({
                where: whereIf,
                order:orderIf,
                include:[{association:"categorys"},{association:"marcas"},{association:"talles"}]
            })
            Promise.all([promProducts, promCategorys, promMarcas])
            .then(([products, allCategorys, allMarcas])=>{
                console.log(orderIf)
                

                res.render('products/products',{ products, allCategorys, allMarcas});
            })
            .catch(error => res.send(error))


        },
    //---------------------------------USERS--------------------------------------
    // comprar ---------- en construccion
    buy:(req, res)=>{
        // cantidades
        let cant = 1;
        //arrays de ids o de id de prodcutos
        let productsIdCart= [];
        //ver si es un All o un ByPk
        products.findByPk({
            where: productsIdCart,
        })
        .then(product => {
            return product.decrement('stock', {by: cant})
        }).then(product=> {
            res.redirect("/")
            // Postgres will return the updated user by default (unless disabled by setting { returning: false })
            // In other dialects, you'll want to call user.reload() to get the updated instance...
        })
        .catch(error => res.send(error))
    },
    //---------------------------------ADMINS / CRUD-----------------------------------------------
//---------------------------- Products----------------------------------
        //crear Prodcuto

        create: (req, res) => {
             //-------------promesas-----------
            let promCategorys = categorys.findAll()
            let promMarcas = marcas.findAll()
            let promTalles = talles.findAll()
            Promise.all([promCategorys, promMarcas, promTalles])
            .then(([allCategorys, allMarcas, allTalles, products])=>{
                res.render('products/product-create', {allCategorys, allMarcas, allTalles, title: 'CrearProducto', estilo: estilos.crearProducto})
            }) .catch(error => res.send(error))
          },

        store:(req, res) => {
            //--------------fecha----------------
            let date = new Date();
            // -----------descuento--------
            let discount = req.body.discount;
            //---Precio Final -----
            let price = req.body.price;
            let finalPrice = price;
            if(discount != 0){ finalPrice = (price-(price*discount/100))}
            //----- imagen------
            let imagen = "";
            if(!req.file){imagen = "default.jpg"}
            else{
                imagen = req.file.filename
            }
            // promesas
            products.create({
                name: req.body.name,
                category_id: req.body.category_id,
                price: req.body.price,
                discount: req.body.discount,
                finalPrice: finalPrice ,
                description: req.body.description,
                talle_id: req.body.talle_id,
                marca_id: req.body.marca_id,
                stock: req.body.stock,
                image: imagen,
                created_at: date
            })
            .then((product)=>{
                res.redirect("/");
            })
                },
            //editar productos
            edit: (req, res) => {
                let promProduct = products.findByPk(req.params.id,{include:[{association:"categorys"},{association:"marcas"},{association:"talles"}]})
                let promCategorys = categorys.findAll()
                let promMarcas = marcas.findAll()
                // let promTalles = talles.findAll()
                Promise.all([promProduct,promCategorys, promMarcas])
                .then(([ product, allCategorys, allMarcas])=>{
                    res.render('products/product-edit', { product, allCategorys, allMarcas});
                })
            .catch(error => res.send(error))
            },

            update:(req, res) => {
                 //--------------fecha----------------
                let date = new Date();
                //---Precio Final -----
                let price = req.body.price;
                let discount = req.body.discount;
                let finalPrice = price;
                if(discount != 0){ finalPrice = (price-(price*discount/100))}
                // -----Imagen----
                let editProduct =  {
                    name: req.body.name,
                    category_id: req.body.category_id,
                    price: req.body.price,
                    discount: req.body.discount,
                    description: req.body.description,
                    talle_id: req.body.talle_id,
                    marca_id: req.body.marca_id,
                    stock: req.body.stock,
                    finalPrice: finalPrice,
                    updated_at: date
                }
                if (req.file){editProduct.image = req.file.filename}
                  // promesas
                products.update(
                   editProduct
                ,{
                where:{
                    id: req.params.id
                }})
                .then((product)=>{
                    res.redirect('../../products/detail/'+ req.params.id)
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
      //---------------------------- Category----------------------------------
     //lista
      listCategory: (req, res) => {
        categorys.findAll()
        .then((allCategorys)=>{
                res.render('products/categorys/list', { allCategorys});
            })
        .catch(error => res.send(error))
        },
        // crear
        storeCategory:(req, res) => {
            let date = new Date();
            categorys.create({
                 nombre: req.body.nombre,
                 created_at: date
            })
            .then((product)=>{
                res.redirect("/products/categorys");
            })
                },
            // editar
              updateCategory:(req, res) => {
                let date = new Date();
                let editCategory =  {
                    nombre: req.body.nombre,
                    updated_at: date
                }
                  // promesas
                categorys.update(
                editCategory
                ,{
                where:{
                    id: req.params.id
                }})
                .then((category)=>{
                 
                    res.redirect("/products/categorys")
                })
            },

            //borrar productos

            destroyCategory: (req, res) => {
                categorys.destroy({
                    where: { id: req.params.id }
                });
                res.redirect("/products/categorys");
            },

                //---------------------------- Marcas----------------------------------

                listMarcas: (req, res) => {
            marcas.findAll()
            .then((allMarcas)=>{
                res.render('products/marcas/list', {allMarcas})
            }) .catch(error => res.send(error))
          },

        storeMarca:(req, res) => {
            let date = new Date();
            marcas.create({
                nombre: req.body.nombre,
                created_at: date
            })
            .then((product)=>{
                res.redirect("/");
            })
                },

    //editar marcas
            editMarca: (req, res) => {
            marcas.findAll()
            .then((allMarcas)=>{
                    res.render('products/product-category-edit', { allMarcas});
                })
            .catch(error => res.send(error))
            },

            updateMarca:(req, res) => {
                let date = new Date();
                let editMarca =  {
                    nombre: req.body.nombre,
                    updated_at: date
                }

                  // promesas
                marcas.update(
                    editMarca
                ,{
                where:{
                    id: req.params.id
                }})
                .then((marca)=>{
                    res.redirect("../../products/marcas")
                })
            },

            //borrar marcas
            deleteMarca: (req, res) => {
                marcas.findByPk(req.params.id)
                .then((marca)=>{

                    res.render('products/product-marcas-delete',{marca});
                })
            .catch(error => res.send(error))
            },

            destroyMarca: (req, res) => {
                marcas.destroy({
                    where: { id: req.params.id }
                });
                res.redirect('/products/marcas');
            },
}


module.exports = controller;
