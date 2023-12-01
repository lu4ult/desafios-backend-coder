// import { ProductModel } from "./models/product.model.js";
import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB {
    async getAll() {
        try {
            const response = await CartModel.find({});
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const response = await CartModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await CartModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        console.log(`id carrito: ${id}`);
        console.log(obj)
        try {
            const carrito = await CartModel.findById(id);


            //Eliminamos el producto del array, para luego volver a meterlo con push() con la cantidad correcta.
            //https://stackoverflow.com/questions/11637353/comparing-mongoose-id-and-strings
            carrito.products = carrito.products.filter(producto => producto.product._id.toString() !== obj.product);

            carrito.products.push(obj);

            const response = await CartModel.findByIdAndUpdate(id, carrito, { new: true });
            // // carrito.save();         //De dónde sale este save() ? Igual no me funcionó

            return response;

        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const response = await CartModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
