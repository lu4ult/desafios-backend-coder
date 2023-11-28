import { Schema, model } from "mongoose";

export const cartsCollectionName = "cart";


//Acá cómo sería??

const cartSchema = new Schema({
    // name: { type: String, required: true },
    // description: { type: String, required: true },
    // price: { type: Number, required: true },
    // stock: { type: Number, required: true },
    products: [
        {
            //ID del producto,
            //Cantidad de este producto
        }
    ]

});

export const CartModel = model(
    cartsCollectionName,
    cartSchema
);
