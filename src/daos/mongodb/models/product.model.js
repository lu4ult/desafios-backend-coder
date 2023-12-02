import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export const productsCollectionName = "products";

const productsSchema = new Schema({
    name: { type: String, required: true, index: true },
    description: { type: String, required: true },
    code: { type: String, required: true, index: true },
    price: { type: Number, required: true, index: true },
    status: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    category: { type: String },
    thumbnails: [
        { type: String, default: [] }
    ]
});

productsSchema.plugin(mongoosePaginate)

export const ProductModel = model(
    productsCollectionName,
    productsSchema
);
