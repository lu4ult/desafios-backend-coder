class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            console.log("Error: Todos los campos son obligatorios.");
            return;
        }

        if (this.products.find(product => product.code === code)) {
            console.log("Error: El código del producto ya existe.");
            return;
        }

        const product = {
            id: this.getMaxId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getMaxId() {
        let maxId = 0;
        this.products.map(product => {
            if (product.id > maxId) {
                maxId = product.id
            }
        });

        return maxId;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.log("Error: Producto no encontrado.");
            return null;
        }
    }
}

const productManager = new ProductManager();

productManager.addProduct("Televisor", "Televisor 42", 120000, "foto_tv.jpg", "779487804801547", 10);
productManager.addProduct("Lavarropas", "Lavarropas vertical", 80000, "foto2.jpg", "77987098451235", 50);

console.log(productManager.getProducts());
const producto1 = productManager.getProductById(1);
console.log(producto1);

