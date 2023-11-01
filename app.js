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



// app.get('/', (req, res) => {
//     // res.render(__dirname + '/src/views/index', {});
//     res.render('index', {});
// })

app.get('/', async (req, res) => {
    const productos = await productManager.getProducts();
    console.log(productos)
    // res.render(__dirname + '/src/views/index', {});
    res.render('home', { productos });
})

app.get('/realtimeproducts', (req, res) => {
    // res.render(__dirname + '/src/views/index', {});
    res.render('realTimeProducts', {});
})

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

// app.post('/productos', async (req, res) => {
//     const { title, description, code, price, status = true, stock, category, thumbnails = [] } = req.body;

//     try {
//         let response = await productManager.addProduct(title, description, code, price, status, stock, category, thumbnails);

//         if (response.error) {
//             res.status(400).json(response);
//         }
//         res.status(200).json(response);

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ error: error, message: 'Ups! Algo salió mal' });
//     }
// });

app.post('/', (req, res) => {
    const { msg } = req.body;

    console.log(msg)
    socketServer.emit('messageFromPost', msg);

    res.status(200).send('msg enviado por socket');
});


const PORT = 8080;
const httpServer = app.listen(PORT, () => { console.log("server iniciado") });
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    // console.log("nuevo cliente socket!", socket.id)
    // console.log(socket.clientCount)
    socket.on('message', data => {
        console.log(`${socket.id}: ${data}`)
        // console.log("nuevo mensaje por socket")
        console.log(data)
    });

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado`)
    });

    socket.emit('saludosDesdeElback', 'Bienvenidos a wesocket!');

    socket.on('respuestaDesdeFront', data => {
        console.log(`${socket.id}: ${data}`)
    })

    socket.on('newProduct', producto => {
        console.log(producto)
        productos.push(producto);

        socket.emit('products', productos);
    })
});


