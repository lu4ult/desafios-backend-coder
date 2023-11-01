import express from "express";
import handlebars from 'express-handlebars';
import { dirname } from 'path';
import { fileURLToPath } from "url";
import { Server } from "socket.io";

const __dirname = dirname(fileURLToPath(import.meta.url));
import { ProductManager } from './src/ProductManager.js';


const productManager = new ProductManager();
productManager.init();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views');

app.use(express.static(__dirname + '/src/public'));




app.get('/', async (req, res) => {
    const productos = await productManager.getProducts();
    // res.render(__dirname + '/src/views/index', {});
    res.render('home', { productos });
});

app.get('/realtimeproducts', (req, res) => {
    // res.render(__dirname + '/src/views/index', {});
    res.render('realTimeProducts');
});



app.post('/', async (req, res) => {
    const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;

    try {
        let response = await productManager.addProduct(title, description, code, price, status, stock, category, thumbnails);

        if (response.error) {
            res.status(400).json(response);
        }

        //Acá la parte de socket:
        let productosTodos = await productManager.getProducts();
        socketServer.emit('productosTodos', productosTodos);

        res.status(200).json(response);

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error, message: 'Ups! Algo salió mal' });
    }
});


const PORT = 8080;
const httpServer = app.listen(PORT, () => { console.log("server iniciado") });
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    socket.on('disconnect', () => {
        console.log(`Usuario desconectado`);
    });
});


