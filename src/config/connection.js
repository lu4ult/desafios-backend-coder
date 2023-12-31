import { connect } from "mongoose";
import 'dotenv/config'

export const connectionString = process.env.MONGO_URL;

export const initMongoDB = async () => {
  try {
    console.log("Iniciando Atlas...");
    await connect(connectionString);
    console.log("Conectado a la base de datos de MongoDB");
  } catch (error) {
    console.log(error);
  }
};
