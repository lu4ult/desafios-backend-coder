import MongoDao from "../mongo.dao.js";
import { ProductModel } from "./product.model.js";


//extends: hereda los métodos de la clase MongoDao,
//super: llama al constructor de la clase superior, es decir MongoDao
export default class ProductMongoDao extends MongoDao {
  constructor() {
    super(ProductModel);    //this.model en MongoDao
  }
}
