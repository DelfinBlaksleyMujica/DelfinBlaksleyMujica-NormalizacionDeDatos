import express,{ json } from 'express';
import { engine } from 'express-handlebars';


import ProductosRouter from "./router/productosRouter.js";
import ContenedorArchivo from "./contenedores/ContenedorArchivo.js"

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'


/*
import config from './config.js'
*/

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);
app.engine('handlebars', engine());



const productosApi = new ProductosRouter()
app.use("/api/productos" , productosApi )


import ProductosDeBase from "../DB/productos.json" assert { type: "json" };
import MensajesArchivo from "../DB/mensajes.json" assert { type: "json" };

const productos = ProductosDeBase;
const mensajesEnDB = MensajesArchivo[0].mensajes;



/*
const productosApi = new ContenedorArchivo( `${config.fileSystem.path}/productos.json` )*/
const mensajesApi = new ContenedorArchivo( "../DB/mensajes.json" )

//--------------------------------------------
// NORMALIZACIÓN DE MENSAJES

const originalData = MensajesArchivo;



// Definimos un esquema de autor


// Definimos un esquema de mensaje


// Definimos un esquema de posts






//--------------------------------------------
// configuro el socket

const messages = mensajesEnDB



io.on("connection", async socket => {
    console.log('Nuevo cliente conectado!' + socket.id );
    // carga inicial de productos
    socket.emit( "productos" , productos );

    // actualizacion de productos
    socket.on("new-product" , (data) => {
        productos.push( data );
        io.sockets.emit( "products" , productos );
    });

    // carga inicial de mensajes
    socket.emit( "messages" , messages );

    // actualizacion de mensajes
    socket.on("new-message" , (data) => {
        messages.push( data );
        mensajesApi.guardarMensaje( data );
        io.sockets.emit("messages" , messages);
    })
});

/*async function listarMensajesNormalizados() {
    
}*/





//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('../public'))


//-------------------------------------------
//Defino motor de plantilla

app.engine( "handlebars" , engine() );
app.set('view engine', 'handlebars');
app.set('views', '../public/views');


//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))