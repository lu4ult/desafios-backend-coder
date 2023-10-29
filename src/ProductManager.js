import fs from 'fs';

export class ProductManager {
    constructor() {
        this.products = [];
        this.path = './product-manager.json';
    }

    //En lugar de verificar si existe el archivo y actualizarlo, decidí seguir usando el this.products y simplemente sobreescribir el archivo completo.
    #saveInFileSystem() {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

    async addProduct(title, description, code, price, status, stock, category, thumbnails = []) {
        if (!title || !description || !code || !price || !stock || !category) {
            console.log("Error: Todos los campos son obligatorios.");
            return { error: 'Falta algún campo.' };
        }

        if (this.products.length === 0) {
            await this.getProducts();
        }

        // if (this.products.find(product => product.code === code)) {
        //     console.log("Error: El código del producto ya existe.");
        //     return { error: `Ya se encuentra el producto ${code}` };
        // }

        const product = {
            id: this.#getMaxId() + 1,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails,
        };



        this.products.push(product);
        this.#saveInFileSystem();

        return { id: product.id };
    }


    async getProducts() {
        if (this.products.length === 0) {
            try {
                this.products = await JSON.parse(fs.readFileSync(this.path, 'utf-8')) || [];
            } catch (error) {
                this.products = [];
            }
        }
        return this.products;
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