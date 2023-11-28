import { Schema, model } from "mongoose";

export const cartsCollectionName = "carts";


//Acá cómo sería??

const cartSchema = new Schema({
    // name: { type: String, required: true },
    // description: { type: String, required: true },
    // price: { type: Number, required: true },
    // stock: { type: Number, required: true },
    products: [
        {
            id: { type: String, required: true },
            qty: { type: Number, required: true },
        }
    ]
});

export const CartModel = model(
    cartsCollectionName,
    cartSchema
);
