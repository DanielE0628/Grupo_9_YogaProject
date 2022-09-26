const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {Product} = require('../database/models/Product');


const estilos = {
    productos: '/stylesheets/productos-style.css',
    detalleProducto:'/stylesheets/detail-style.css',
    crearProducto:'/stylesheets/product-create-style.css'
    
};
const controladorDb ={
    //vistas los productos
    index: (req, res) => {},
    detail: (req, res) => {},
    //crear productos
    create: (req, res) => {},
    store: (req, res) => {},
    //editar productos
    edit: (req, res) => {},
    update: (req, res) => {},
    //borrar porductos
    delete: (req, res) => {},
    destroy: (req, res) => {},
    destroyImg: (req, res) => {},

}


<<<<<<< HEAD
    //crear producto
    create: (req, res) => {
        res.render('products/product-create', {title: 'CrearProducto', estilo: estilos.crearProducto});
    },
    
    store: (req, res) => {
        //llamar de DATA JSON todos los productos
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //crear nuevo producto
        const newProduct = req.body;
        //new id
        newProduct.id = products.length + 1;
        // agragar imagen
        if(req.file){
			newProduct.image = req.file.filename;
		}else{
			newProduct.image = "default-image.png";
		}
        //agregar nuevo porducto a DATA JSON
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/')
    },
    //editar un producto
    edit: (req, res) => {
        //llamar de DATA JSON todos los productos
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //buscamos la id del prodcuto a editar
        const idProduct = req.params.id;
        const productEdit = products.find( item => item.id == idProduct)
        //renderisamos la vista
        res.render('products/product-edit',{productEdit, title: 'Editanado Prodcuto: ', estilo: estilos.crearProducto});
    },
    update: (req, res) =>{
        //llamar de DATA JSON todos los productos
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //buscamos la id del prodcuto a editar
        const idProduct = req.params.id;
        // agregamos el/los nuevos parametros del producto a editar
        const productEdit = req.body;
        //edtiamos los parametros
        products.forEach(product => {
            if (idProduct == product.id){
                product.name = productEdit.name;
				product.price = productEdit.price;
				product.discount = productEdit.discount;
				product.category = productEdit.category;
                product.subCategory = productEdit.subCategory;
                product.quality = productEdit.quality;
				product.description = productEdit.description;
                if(req.file){
					product.image = req.file.filename;
				}
            }
        });
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/products');
    },
    destroy: (req, res) =>{
        //llamar de DATA JSON todos los productos
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        //buscamos la id del prodcuto a eliminar
        const idProduct = req.params.id;
        //buscamos la imagen y la eliminamos
        products.forEach(product => {
            if(idProduct == product.id){
                if(product.image && product.image != "default-image.png" ){
                    const imagePath = path.join(__dirname, '../../public/images/products', product.image);
					fs.unlinkSync(imagePath)
                }
            }
        })
        //flitramos al idproduct para dejarlo afuera del nuevo database
        const productsList = products.filter(item => item.id != idProduct ) 
        fs.writeFileSync(productsFilePath, JSON.stringify(productsList, null, ' '));
		res.redirect('/products')
    },
    destroyImg: (req, res) =>{
         //llamar de DATA JSON todos los productos
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
         //buscamos la id del prodcuto a eliminar
        const idProduct = req.params.id; 
        //buscamos la imagen y la eliminamos
        products.forEach(product => {
            if(idProduct == product.id){
                if(product.image && product.image != "default-image.png" ){
                    const imagePath = path.join(__dirname, '../../public/images/products', product.image);
					fs.unlinkSync(imagePath)
                    product.image = "default-image.png";
                }
            } 
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '))
        })
        res.redirect('/products')
    },
=======
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
            console.log(Product)
            products.findAll({
                include:[{association: "categorys"},{association: "marcas"},{association: "talles"}]
            })
            
                .then((productos)=>{
                    console.log(productos)
                    res.render('products/products',{products:productos, title: 'Productos', estilo: estilos.productos });
                })
                .catch(error => res.send(error))
        },
        //detalle de un producto
        detail:(req, res) => {
            products.findByPk(req.params.id, {
                include: [{association: "categorys"}]
            })
                .then((product)=>{
                    res.render("products/detail/:id", {product})
                })
                .catch(error => res.send(error))       
        },
        //Buscar prodcutos
        //pendiente
        // dale GIT


        //crear Prodcuto
        create: (req, res) => {
            categorys.findAll()
            // marcas.findAll()
            // talles.findAll()
            // .then(([allCategorys, allMarcas, allTalles])=>{
            //      res.render('products/product-create', {allCategorys, allMarcas, allTalles ,title: 'CrearProducto', estilo: estilos.crearProducto})
            // })
            .then((allCategorys)=>{
                console.log(allCategorys)
                res.render('products/product-create',{allCategorys, title: 'Productos', estilo: estilos.productos });
            })
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
                res.redirect('products/products',{products:products, title: 'Productos', estilo: estilos.productos });
            })
            .catch(error => res.send(error))
                },
>>>>>>> 72e7d5afcf43ce847bc645b7d667dbe93423c3a0
}

module.exports = controller;