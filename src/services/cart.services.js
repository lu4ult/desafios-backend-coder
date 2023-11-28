import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();


// import ProductDaoFS from "../daos/filesystem/product.dao.js";
// import { __dirname } from "../utils.js";
// const prodDao = new ProductDaoFS(
//   __dirname + "/daos/filesystem/data/products.json"
// );

export const getAll = async () => {
    try {
        return await cartDao.getAll();
    } catch (error) {
        console.log(error);
    }
};

export const getById = async (id) => {
    try {
        const cart = await cartDao.getById(id);
        if (!cart) return false;
        else return cart;
    } catch (error) {
        console.log(error);
    }
};

export const create = async (obj) => {
    try {
        const newCart = await cartDao.create(obj);
        if (!newCart) return false;
        else return newCart;
    } catch (error) {
        console.log(error);
    }
};

export const update = async (id, obj) => {
    try {
        const cartUpdated = await cartDao.update(id, obj);

        if (!cartUpdated) return false;
        else return cartUpdated;
    } catch (error) {
        console.log(error);
    }
};

export const remove = async (id) => {
    try {
        const cartDeleted = await cartDao.delete(id);
        if (!cartDeleted) return false;
        else return cartDeleted;
    } catch (error) {
        console.log(error);
    }
};
