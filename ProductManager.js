class ProductManager {
    constructor() {
      this.products = [];
      this.id = 0;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Todos los campos son obligatorios");
        return;
      }
  
      if (this.products.some(product => product.code === code)) {
        console.log("Ya existe un producto con el mismo codigo");
        return;
      }
  
      const Product = {
        id: this.id+1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      };
  
      this.products.push(Product);
      console.log("Producto agregado:", Product);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (product) {
        return product;
      } else {
        console.log("Producto no encontrado");
      }
    }
  }
  
//testing de lo que hice: 
const productManager = new ProductManager();

const lista = productManager.getProducts();
console.log("Productos:", lista);

productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

const lista1 = productManager.getProducts();
console.log("Productos:", lista1);

productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

const idbuscado = 1;
const buscarProduct = productManager.getProductById(idbuscado);
console.log("Producto encontrado por ID:", buscarProduct)

const idfalso = 999;
const falsoProduct = productManager.getProductById(idfalso);

  
