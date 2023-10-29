import { Router } from "express";
import { ProductManager } from "../ProductManager.js";


const productManager = new ProductManager();
const router = Router();

router.get('/', (req, res) => {
    console.log("va");

    const productosTodos = productManager.getProducts();
    res.status(200).json(productosTodos);
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const idAsInt = parseInt(id);

    const productById = productManager.getProductById(idAsInt);
    console.log(productById);


    res.status(200).json(productById);
});

router.post('/', async (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;

    try {
        let response = await productManager.addProduct(title, description, code, price, status, stock, category, thumbnails);

        if (response.error) {
            res.status(400).json(response);
        }
        res.status(200).json(response);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error, message: 'Ups! Algo salió mal' });
    }


})

export default router;