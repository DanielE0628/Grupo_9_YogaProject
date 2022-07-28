const fs = require('fs');
const path = require('path');
//datos JSON
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const estilos = {
    productos: '/stylesheets/productos-style.css',
    detalleProducto:'/stylesheets/detalle-producto-style.css',
    crearProducto:'/stylesheets/register-style.css'
};


const controlador = { 
    //todos los productos
    index: (req, res) => {
        res.render('products/products',{products:products, title: 'Productos', estilo: estilos.productos });
    },
    //detalla de un producto
    detail: (req, res) => {
        res.render('products/detail', {title: 'DetalleDeProductos', estilo: estilos.detalleProducto});
    },

    //crear producto
    create: (req, res) => {
        res.render('products/product-create', {title: 'CrearProducto', estilo: estilos.crearProducto});
    },

}; 
module.exports = controlador;