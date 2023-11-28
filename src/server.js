import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import { __dirname } from './utils.js'

import productsRouter from './routes/products.router.js';
import chatsRouter from './routes/chat.router.js';
import carritoRouter from './routes/carrito.router.js'

import { initMongoDB } from './daos/mongodb/connection.js';
import { errorHandler } from './middleWares/errorHandler.js';
import MessagesDaoMongo from './daos/mongodb/messages.dao.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/****/
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


/****/
app.use('/api/products', productsRouter);
app.use('/api/carts', carritoRouter);
app.use('/chat', chatsRouter);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).send('Hola!');
});


await initMongoDB(false);           //True para local, false para Atlas

// console.log(__dirname)
const PORT = 8080;
const httpServer = app.listen(PORT, () => { console.log("Server iniciado") });


const io = new Server(httpServer);
const messagesDao = new MessagesDaoMongo();
let usuarios = {};
let mensajes = [];

io.on('connection', socket => {
    console.log("nuevo cliente socket!", socket.id);

    socket.on('nuevoUsuario', (user) => {
        usuarios[socket.id] = { user: user };

        const datos = {
            user: 'server',
            message: `${user} acaba de conectarse!`,
            id: socket.id,
            tipo: 'send',
            timestamp: new Date().toISOString()
        };
        mensajes.push(datos);

        io.emit('messageLogs', mensajes);
    });

    socket.on('message', data => {
        const datos = {
            ...data,
            id: socket.id,
            timestamp: new Date().toISOString()
        };


        if (datos.tipo === 'send') {
            //Cuando envían un nuevo chat lo logueamos en Mongo
            messagesDao.create(datos);
            mensajes.push(datos)
            io.emit('messageLogs', mensajes);
        }

        if (datos.tipo === 'typing') {
            //En lugar de io.emit usamos socket.broadcast para que llegue a todos menos a este.
            // io.emit('typing', datos);
            socket.broadcast.emit('typing', datos);
        }

    });

    // socket.on('disconnect', () => {
    //     const datos = {
    //         user: 'server',
    //         message: `${usuarios[socket.id] ?? usuarios[socket.id]['user']} abandonó el chat.`,
    //         id: socket.id,
    //         tipo: 'send',
    //         timestamp: new Date().toISOString()
    //     };
    //     mensajes.push(datos);

    //     io.emit('messageLogs', mensajes);
    // });

});



