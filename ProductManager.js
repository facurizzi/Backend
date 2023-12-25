const fs = require('fs');
class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.id = 1;

    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data) || [];
      this.id = this.buscarId(this.products);
    } catch (error) {
    }
  }
  
  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some(product => product.code === code)) {
      console.error("Ya existe un producto con el mismo codigo");
      return;
    }

    const newProduct = {
      id: this.id++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.products.push(newProduct);
    this.guardarProducts();
    console.log("Producto agregado");
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (product) {
      return product;
    } else {
      console.error("Producto no encontrado");
    }
  }

  updateProduct(id, updatedProduct) {
    const posicion = this.products.findIndex(product => product.id === id);
    if (posicion !== -1) {
      this.products[posicion] = { ...this.products[posicion], ...updatedProduct, id };
      this.guardarProducts();
      console.log("Producto actualizado");
    } else {
      console.error("Producto no encontrado");
    }
  }

  deleteProduct(id) {
    const posicion = this.products.findIndex(product => product.id === id);
    if (posicion !== -1) {
      const deletedProduct = this.products.splice(posicion, 1)[0];
      this.guardarProducts();
      console.log("Producto eliminado:", deletedProduct);
    } else {
      console.error("Producto no encontrado");
    }
  }

  buscarId(products) {
    const buscoId = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
    return buscoId + 1;
  }

  guardarProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
  }
}

// TESTEANDO LO QUE HICE 
const productManager = new ProductManager('productos.json');

console.log("Productos iniciales:", productManager.getProducts());

productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
productManager.addProduct("producto prueba1", "Este es un producto prueba1", 500, "Sin imagen", "abc456", 25);

const idbuscado = 1;
const productobuscado = productManager.getProductById(idbuscado);

if (productobuscado) {
  console.log(`Producto encontrado con ID ${idbuscado}:`, productobuscado);
} else {
  console.error(`Producto no encontrado con ID ${productIdToFind}`);
}

const idmodifico = 1;
productManager.updateProduct(idmodifico, { price: 250, stock: 30 });

const borraid = 1;
productManager.deleteProduct(borraid);

// Llamar a "getProducts" después de la eliminación
console.log("Productos:", productManager.getProducts());

