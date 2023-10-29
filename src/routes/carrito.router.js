import { Router } from "express";
import { CarritoManager } from "../CarritoManager.js";


const router = Router();
const carritoManager = new CarritoManager();
carritoManager.init();



/* Crear Carrito */
router.post('/', async (req, res) => {
    let response = carritoManager.create();
    if (response.error) {
        res.status(response.status).json(response);
    }

    res.status(200).json(response);
})

/* Leer por ID */
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    let carrito = carritoManager.get(cid);

    if (carrito === undefined) {
        res.status(400).json({ error: `Carrito con ID: ${cid} no encontrado` });
    }

    res.status(200).json(carrito['products']);

});


/* Update */
router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    let response = carritoManager.update(cid, pid);

    console.log(response)
    res.status(response.status).json(response);
});


export default router;