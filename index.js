const fs = require('fs');

class ProductManager {
    constructor() {
        this.products = [];
        this.path = './product-manager.json';
    }

    //En lugar de verificar si existe el archivo y actualizarlo, decidí seguir usando el this.products y simplemente sobreescribir el archivo completo.
    #saveInFileSystem() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
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
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(product);

        this.#saveInFileSystem();
    }

    getProducts() {
        // return this.products;
        let productos = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        return productos;
    }

    #getMaxId() {
        let maxId = 0;
        this.products.map(product => {
            if (product.id > maxId) {
                maxId = product.id
            }
        });

        return maxId;
    }

    getProductById(id) {
        const productosTodos = this.getProducts();
        const product = productosTodos.find(p => p.id === id);

        if (product) {
            return product;
        } else {
            console.log("Error: Producto no encontrado.");
            return null;
        }
    }

    updateProductById(id, title, description, price, thumbnail, code, stock) {
        let product = this.getProductById(id);
        if (!product) {
            return false;
        }

        if (title) {
            product.title = title;
        }

        if (description) {
            product.description = description;
        }
        if (price) {
            product.price = price;
        }

        //Una vez actualizado el producto, lo buscamos en el array para eliminarlo, y lo agregamos con los cambios.
        let indice = this.getProducts().findIndex(e => e.id === id);
        this.products.splice(indice, 1);
        this.products.push(product);

        this.#saveInFileSystem();
    }

    deleteProduct(id) {
        let indice = this.getProducts().findIndex(e => e.id === id);
        this.products.splice(indice, 1);
        this.#saveInFileSystem();

        return true;
    }
}

const productManager = new ProductManager();

productManager.addProduct("Televisor", "Televisor 42", 120000, "foto_tv.jpg", "779487804801547", 10);
productManager.addProduct("Lavarropas", "Lavarropas vertical", 80000, "foto2.jpg", "77987098451235", 50);
productManager.addProduct("Microondas", "Microondas", 94999, "foto3.jpg", "77911198451322", 5);

// console.log(productManager.getMaxId());

// console.log(productManager.getProducts());
// const producto1 = productManager.getProductById(3);
// console.log(producto1);

productManager.updateProductById(1, "Televisor 50", "Televisor más grande", 160000);
productManager.deleteProduct(2);

