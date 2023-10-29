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
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const idAsInt = parseInt(id);

    if (isNaN(idAsInt)) {
        return res.status(400).json({ error: 'ID debe ser un número.' });
    }

    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    //TODO: ver qué hacer cuando no se especifica algún campo
    let response = await productManager.updateProductById(idAsInt, title, description, price, thumbnails, code, stock);

    if (response.error) {
        res.status(400).json(response);
    }
    else {
        res.status(200).send('Actualizado');
    }

});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const idAsInt = parseInt(id);

    if (isNaN(idAsInt)) {
        return res.status(400).json({ error: 'ID debe ser un número.' });
    }

    let response = await productManager.deleteProduct(idAsInt);

    if (response.error) {
        res.status(400).json(response);
    }
    else {
        res.status(200).send('Eliminado');
    }

});
export default router;