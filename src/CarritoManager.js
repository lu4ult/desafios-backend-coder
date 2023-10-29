import fs from 'fs';

export class CarritoManager {
    constructor() {
        this.path = './carrito-manager.json';
        this.carritos = [];
    }

    init() {
        try {
            this.carritos = JSON.parse(fs.readFileSync(this.path, 'utf-8')) || [];
        } catch (error) {
            console.log(error)
        }
    }

    #saveInFileSystem() {
        fs.writeFileSync(this.path, JSON.stringify(this.carritos));
    }

    #randomId() {
        const caracteres = 'ABCDE';

        let str = '';
        for (let i = 0; i < 3; i++) {
            str += caracteres[parseInt(Math.random() * caracteres.length)];
        }
        return str;
    }

    create() {
        //Generamos un ID con caracteres y luego verificamos si existe o debemos crear otro.
        let id;
        do {
            id = this.#randomId();
            console.log(`ID Random: ${id}`);
        } while (this.carritos.findIndex(e => e.id === id) >= 0);

        this.carritos.push({
            id: id,
            products: []
        });
        this.#saveInFileSystem();

        return {
            message: 'Carrito Creado',
            cid: id
        };
    }

    get(carritoID) {
        return this.carritos.find(e => e.id === carritoID);
    }

    update(carritoID, productoID) {
        //Buscamos el carrito en si (según carritoID) en el array de carritos

        let indiceCarrito = this.carritos.findIndex(e => e.id === carritoID);
        if (indiceCarrito === -1) {
            return {
                "status": 404,
                "message": 'Carrito no encontrado'
            };
        }


        //Ahora que ya tenemos el carrito en cuestión, buscamos el producto (según productoID)
        //dentro del array de productos del carrito.
        let carritoAActualizar = this.carritos[indiceCarrito];

        let productoEnCarritoIndice = carritoAActualizar.products.findIndex(p => p.id === productoID);
        if (productoEnCarritoIndice === -1) {
            carritoAActualizar.products.push({
                id: productoID,
                quantity: 1
            });
        }
        else {
            carritoAActualizar.products[productoEnCarritoIndice].quantity++;
        }

        //Para no "actualizar" el carrito, simplemente lo eliminamos del array lo volvemos a agregar una vez modificado
        this.carritos.splice(indiceCarrito, 1);
        this.carritos.push(carritoAActualizar);
        this.#saveInFileSystem();

        return {
            "status": 200,
            "message": 'Carrito actualizado',
            "json": JSON.stringify(carritoAActualizar)
        }
    }
}