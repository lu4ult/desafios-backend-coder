import mongoose, { Schema, model } from "mongoose";

export const cartsCollectionName = "carts";

const cartSchema = new Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                // default: []                              //Con esto me da error
            },
            quantity: { type: Number, default: 1 }
        }

    ]
});

cartSchema.pre("find", function () {
    this.populate("products");
})

export const CartModel = model(
    cartsCollectionName,
    cartSchema
);
