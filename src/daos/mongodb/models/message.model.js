import { Schema, model } from "mongoose";

export const messagesCollectionName = "messages";

const messageSchema = new Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const MessageModel = model(
    messagesCollectionName,
    messageSchema
);
