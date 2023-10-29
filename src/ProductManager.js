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

    async getProductById(id) {
        const productosTodos = await this.getProducts();
        const product = productosTodos.find(p => p.id === id);

        if (!product) {
            console.log("Error: Producto no encontrado.");
        }
        return product;
    }


    async updateProductById(id, title, description, code, price, status, stock, category, thumbnails) {
        let product = await this.getProductById(id);
        if (!product) {
            return { error: 'Producto a actualizar no encontrado' };
        }

        if (title) {
            product.title = title;
        }

        if (description) {
            product.description = description;
        }

        if (code) {
            product.code = code;
        }

        if (price) {
            product.price = price;
        }

        if (status) {
            product.status = status;
        }

        if (stock) {
            product.stock = stock;
        }

        //Una vez actualizado el producto, lo buscamos en el array para eliminarlo, y lo agregamos con los cambios.
        // console.log(this.getProducts())
        let indice = (await this.getProducts()).findIndex(e => e.id === id);
        console.log(`Indice: ${indice}`)
        this.products.splice(indice, 1);
        this.products.push(product);

        this.#saveInFileSystem();

        return (true);
    }

    async deleteProduct(id) {
        if (this.products.length === 0) {
            try {
                this.products = await JSON.parse(fs.readFileSync(this.path, 'utf-8')) || [];
            } catch (error) {
                this.products = [];
            }
        }
        try {
            let indice = (await this.getProducts()).findIndex(e => e.id === id);
            if (indice === -1) {
                return { error: `Producto a borrar con id: ${id} no encontrado.` };
            }
            this.products.splice(indice, 1);
            this.#saveInFileSystem();
            return true;
        } catch (error) {
            return { error: error };
        }
    }
}