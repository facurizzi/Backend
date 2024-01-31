const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const ProductManager = require("./ProductManager.js");
const productManager = new ProductManager("productos.json");

const app = express();

const routerUsers = require("./routes/users.router");

// Configuración de Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    extname: ".handlebars", // Agrega esta línea para especificar la extensión de los archivos
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Routers
app.use(routerUsers);

var fraseInicial = "hola, como andas";

// Reglas
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/api/frase", (req, res) => {
  res.send({ frase: fraseInicial });
});

app.post("/api/palabras", (req, res) => {
  let body = req.body;
  fraseInicial = fraseInicial + " " + body.palabra;
  res.status(201).send({ status: 201 });
});

app.get("/products", (req, res) => {
  let productos = productManager.getProducts();
  res.send(productos);
});

app.get("/products/:id", (req, res) => {
  const idbuscado = req.params.id;
  console.log(idbuscado);
  const productobuscado = productManager.getProductById(idbuscado);
  res.send(productobuscado);
});

app.get("/", (req, res) => {
  let testUser = {
    name: "Hilda",
    last_name: "Martinez",
  };

  res.render("index", testUser);
});

app.listen(3000, () => {
  console.log("Aplicación funcionando en el puerto 3000");
});
