import Controllers from "./class.controller.js";
import CartService from "../services/cart.services.js";
const cartService = new CartService();

export default class CartController extends Controllers {
    constructor() {
        super(cartService);
    }
}
