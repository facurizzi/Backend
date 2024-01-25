const ProductManager = require ("./ProductManager")
const productManager = new ProductManager('productos.json');

const express = require("express");
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

var fraseInicial = "hola, como andas"

app.get("/ping", (req, res) => {
    res.send("pong");
})

app.get("/api/frase", (req, res) => {
    res.send({frase: fraseInicial})
})
app.post("/api/palabras", (req, res) => {
    let body = req.body
    fraseInicial = fraseInicial + " "+body.palabra
    res.status(201).send({status:201})
})

app.get("/products", (req,res) => {

    let productos = productManager.getProducts();

    res.send(productos)
})

app.get("/products/:id", (req,res) => {

    const idbuscado = req.params.id;
    console.log(idbuscado)
    const productobuscado = productManager.getProductById(idbuscado);
    res.send(productobuscado)

})

app.listen(3000,() => {
    console.log("aplicacion funcionando")
})