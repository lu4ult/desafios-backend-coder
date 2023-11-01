import express from 'express';
import { ProductManager } from './src/ProductManager.js';


const productManager = new ProductManager();
productManager.init();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hola!');
});

app.get('/productos', async (req, res) => {
    const { limit } = req.query;

    if (limit === undefined) {
        res.status(200).json(await productManager.getProducts());
    }
    else {
        let productos = productManager.getProducts();

        while (productos.length > parseInt(limit)) {
            productos.pop();
        }

        res.status(200).json(productos);
    }
});



app.get('/productos/:pid', (req, res) => {
    const { pid } = req.params;
    const productIdDeseado = parseInt(pid);

    let producto = productManager.getProductById(productIdDeseado);
    if (producto) {
        res.status(200).json(producto);
    }
    else {
        res.status(404).send(`El producto con ID ${productIdDeseado} no existe.`);
    }
});

app.post('/productos', async (req, res) => {
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


const PORT = 8080;
app.listen(PORT, () => { console.log("server iniciado") });




