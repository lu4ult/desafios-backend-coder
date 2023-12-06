import mongoose from 'mongoose';


export const connectionString = "mongodb+srv://lu4ult:Im96t9zOOm9xUBp0@cluster0.srh3w77.mongodb.net/ecommerce?retryWrites=true&w=majority";
//TODO: mover env cuando lo veamos
export const initMongoDB = async () => {
    try {
        console.log("Conectando Atlas...")
        await mongoose.connect(connectionString);
        console.log('Conectado a la base de datos de MongoDB');
    } catch (error) {
        console.log(`ERROR => ${error}`);
    }
};

