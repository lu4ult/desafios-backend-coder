import express from 'express';
import fs from 'fs';

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

productManager.addProduct("Televisor", "Samsung 43 Neo", 549999, "foto_tv.jpg", "MLA19787254", 10);
productManager.addProduct("Lavarropas", "Lavarropas Horizontal Whirlpool", 534699, "foto2.jpg", "MLA26951442", 50);
productManager.addProduct("Microondas", "Microondas Atma", 72999, "foto3.jpg", "MLA8376814", 5);
productManager.addProduct("Aire Acondicioando", "Split frio/calor", 459999, "split.jpg", "MLA16212559", 15);


const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hola!');
});

app.get('/products', (req, res) => {
    const { limit } = req.query;

    if (limit === undefined) {
        res.status(200).json(productManager.getProducts());
    }
    else {
        let productos = productManager.getProducts();

        while (productos.length > parseInt(limit)) {
            productos.pop();
        }

        res.status(200).json(productos);
    }
});



app.get('/products/:pid', (req, res) => {
    const { pid } = req.params;
    const productIdDeseado = parseInt(pid);

    let producto = productManager.getProductById(productIdDeseado);
    if (producto) {
        res.status(200).json(producto);
    }
    else {
        res.status(404).send(`El producto con ID ${productIdDeseado} no existe.`);
    }
});

const PORT = 8080;
app.listen(PORT, () => { console.log("server iniciado") });




