import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
    async getAll(limit, page, sort, query) {
        try {
            //Así era antes de agregar paginate()
            // const response = await ProductModel.find({});

            //Primer parámetro es el filtro, si le paso un objeto vacío me busca todo
            const filtro = query ? { category: query } : {};
            const response = await ProductModel.paginate(filtro, {
                page,
                limit,
                sort: sort ? sort === 'true' ? { price: 1 } : { price: -1 } : null,
            });

            //Sort puede tener tres estados:
            // undefined: no hace sort (pasa null)
            //true: orden ascendente de precio (pasa 1)
            //false: orden descendente de precio (pasa -1)

            const respuestaPersonalizada = {
                status: response.docs.length > 0 ? 'success' : 'error',
                payload: response.docs,
                totalPages: response.totalPage,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink: response.hasPrevPage ? `midireccion.com/?page=${response.prevPage}` : null,
                nextLink: response.hasNextPage ? `midireccion.com/?page=${response.nextPage}` : null,
            };
            return respuestaPersonalizada;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const response = await ProductModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            const response = await ProductModel.findByIdAndUpdate(id, obj, {
                new: true,
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const response = await ProductModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
