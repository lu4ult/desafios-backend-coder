import mongoose, { Schema, model } from "mongoose";

export const cartsCollectionName = "carts";

export const cartSchema = new Schema({
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


//No me interesa el populate al traer todos los carritos, sino en cada carrito en específico
// cartSchema.pre("find", function () {
//     this.populate("products.product");
// })

cartSchema.pre("findOne", function () {
    this.populate("products.product");
})

export const CartModel = model(
    cartsCollectionName,
    cartSchema
);
