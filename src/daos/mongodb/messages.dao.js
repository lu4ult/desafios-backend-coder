import { MessageModel } from "./models/message.model.js"



export default class MessagesDaoMongo {
    async create(data) {
        const { user, message } = data;
        console.log(user)
        console.log(message);
        try {
            const response = await MessageModel.create({
                user,
                message,
            });
            return response;
        } catch (error) {

        }
    }
}

