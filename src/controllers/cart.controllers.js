import * as service from "../services/cart.services.js";

export const getAll = async (req, res, next) => {
    try {
        let { limit = 8, page = 1, sort, query } = req.query;

        console.log("limit", limit);
        console.log("page", page);
        console.log("sort", sort);
        console.log("query", query);

        const response = await service.getAll();
        res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await service.getById(id);
        if (!response) res.status(404).json({ msg: "Cart Not found!" });
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const create = async (req, res, next) => {
    try {
        const newProd = await service.create(req.body);
        if (!newProd) res.status(404).json({ msg: "Error create Cart!" });
        else res.status(200).json(newProd);
    } catch (error) {
        next(error.message);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;

        console.log(req.body)
        const prodUpd = await service.update(id, req.body);
        if (!prodUpd) res.status(404).json({ msg: "Error update Cart!" });
        else res.status(200).json(prodUpd);
    } catch (error) {
        next(error.message);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDel = await service.remove(id);
        if (!prodDel) res.status(404).json({ msg: "Error delete Cart!" });
        else res.status(200).json({ msg: `Cart id: ${id} deleted` });
    } catch (error) {
        next(error.message);
    }
};
