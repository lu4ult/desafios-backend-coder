import Services from "./class.services.js";
import CartDaoMongoDB from "../daos/mongodb/carts/cart.dao.js";
const cartDao = new CartDaoMongoDB();

export default class CartService extends Services {
    constructor() {
        super(cartDao);
    }
}
