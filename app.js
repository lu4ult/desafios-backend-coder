import express from 'express';
// import { ProductManager } from './src/ProductManager.js';
import { __dirname } from './src/utils.js'

import productRouter from './src/routes/products.router.js';



// productManager.addProduct("Televisor", "Samsung 43 Neo", 549999, "foto_tv.jpg", "MLA19787254", 10);
// productManager.addProduct("Lavarropas", "Lavarropas Horizontal Whirlpool", 534699, "foto2.jpg", "MLA26951442", 50);
// productManager.addProduct("Microondas", "Microondas Atma", 72999, "foto3.jpg", "MLA8376814", 5);
// productManager.addProduct("Aire Acondicioando", "Split frio/calor", 459999, "split.jpg", "MLA16212559", 15);


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/productos', productRouter);

app.get('/', (req, res) => {
    res.status(200).send('Hola!');
});


// console.log(__dirname)
const PORT = 8080;
app.listen(PORT, () => { console.log("server iniciado") });




