const express = require("express");
const app = express();

const path = require("path");
const publicPath = path.join(__dirname, 'public');

const port = process.env.PORT || 3030;

app.use(express.static(publicPath));

app.listen( port, () => console.log(`Servidor corriendo in port ${port}`) );

app.get("/", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/home.html"))
});

app.get("/detalle-productos", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/detalle-productos.html"))
});

app.get("/productos", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"./views/productos.html"))
});