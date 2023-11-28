import mongoose from 'mongoose';


export const initMongoDB = async (esLocal) => {
    try {
        if (esLocal) {
            console.log("Conectando Mongo Local...");
            await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
        }
        else {
            console.log("Conectando Atlas...")
            await mongoose.connect("mongodb+srv://lu4ult:Im96t9zOOm9xUBp0@cluster0.srh3w77.mongodb.net/ecommerce?retryWrites=true&w=majority");
        }

        console.log('Conectado a la base de datos de MongoDB');
    } catch (error) {
        console.log(`ERROR => ${error}`);
    }
};

