import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
    async getAll(limit, page, sort, query) {
        try {
            console.log("limit", limit);
            console.log("page", page);
            console.log("sort", sort);
            console.log("query", query);

            //Así era antes de agregar paginate()
            // const response = await ProductModel.find({});

            //Primer parámetro es la query, le pasamos vacío para que traiga todos
            console.log(sort === "true")
            const response = await ProductModel.paginate({}, {
                page,
                limit,
                sort: sort ? sort === 'true' ? { price: 1 } : { price: -1 } : null,
                query,
            });

            //Sort puede tener tres estados:
            // undefined: no hace sort (pasa null)
            //true: orden ascendente de precio (pasa 1)
            //false: orden descendente de precio (pasa -1)

            const respuestaPersonalizada = {
                status: response ? true : false,
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
