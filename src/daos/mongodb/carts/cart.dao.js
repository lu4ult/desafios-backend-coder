import MongoDao from "../mongo.dao.js";
import { CartModel } from "./cart.model.js";
// import { ProductModel } from "./product.model.js";

export default class CartDaoMongoDB extends MongoDao {
    constructor() {
        super(CartModel);    //this.model en MongoDao
    }
}


// export default class CartDaoMongoDB {
//     async getAll() {
//         try {
//             const response = await CartModel.find({});
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async getById(id) {
//         try {
//             // const response = await CartModel.findById(id).populate();
//             //Usamos findOne en lugar findById porque sino no me funcionaba el middleware para populate()

//             //el método populate() acá no es necesario aparentemente, funciona mientres esté el middleware, lo dejamos como recordatorio.
//             const response = await CartModel.findOne({ _id: id }).populate();
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async create(obj) {
//         try {
//             const response = await CartModel.create(obj);
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async update(id, obj) {
//         console.log(`id carrito: ${id}`);
//         console.log(obj)
//         try {
//             const carrito = await CartModel.findById(id);


//             //Eliminamos el producto del array, para luego volver a meterlo con push() con la cantidad correcta.
//             //https://stackoverflow.com/questions/11637353/comparing-mongoose-id-and-strings
//             carrito.products = carrito.products.filter(producto => producto.product._id.toString() !== obj.product);
//             carrito.products.push(obj);

//             const response = await CartModel.findByIdAndUpdate(id, carrito, { new: true });
//             // // carrito.save();         //De dónde sale este save() ? Igual no me funcionó

//             return response;

//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async delete(id) {
//         try {
//             const response = await CartModel.findByIdAndDelete(id);
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }
