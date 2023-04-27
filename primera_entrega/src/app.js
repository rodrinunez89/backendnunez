import express from "express";
import productsRouter from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';
import { __dirname } from "./utils.js";
import { engine } from 'express-handlebars';
import { Server } from 'socket.io'; // Se creará a partir del server HTTP



const puerto = parseInt(process.env.puerto || 3000);
const ws_puerto = parseInt(process.env.ws_puerto || 3050);

const server = express();
const httpServer = server.listen(ws_puerto, () => {
    console.log(`Servidor socketio iniciado en puerto ${ws_puerto}`);
});
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
        credentials: false
    }
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api/products',productsRouter);
server.use('/api/carts',cartRouter);


// Motor de plantillas
server.engine('handlebars', engine());
server.set('views', './views');
server.set('view engine', 'handlebars');


// Contenidos estáticos
server.use('/public', express.static(`${__dirname}/public`));

server.listen (puerto, () => {

    console.log(`Servidor base API / estatico iniciado en puerto ${puerto}`)
}
);

// Eventos socket.io
io.on('connection', (socket) => { // Escuchamos el evento connection por nuevas conexiones de clientes
    console.log(`Cliente conectado (${socket.id})`);
    
    // Emitimos el evento server_confirm
    socket.emit('server_confirm', 'Conexión recibida');
    
    socket.on('new_message', (data) => {;
        io.emit('msg_received', data); // io.emit realiza un broadcast (redistribución) a TODOS los clientes, incluyendo el que lo generó
    });
    
    socket.on("disconnect", (reason) => {
        console.log(`Cliente desconectado (${socket.id}): ${reason}`);
    });
});






