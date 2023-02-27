import express, { json } from 'express';
import { engine } from 'express-handlebars';


import ProductosRouter from "./router/productosRouter.js";
import ContenedorArchivo from "./contenedores/ContenedorArchivo.js"

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'


//--------------------------------------------
//Instancio normalizr
import { normalize, schema, denormalize } from "normalizr";

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);
app.engine('handlebars', engine());



const productosApi = new ProductosRouter()
app.use("/api/productos", productosApi)


import ProductosDeBase from "../DB/productos.json" assert { type: "json" };
import MensajesEnDB from "../DB/mensajes.json" assert { type: "json" };

const productos = ProductosDeBase;

const mensajesApi = new ContenedorArchivo("../DB/mensajes.json")


//--------------------------------------------
// NORMALIZACIÓN DE MENSAJES
let messages = [];
messages = MensajesEnDB;

console.log("Mensajes traidos de la base de datos: ", messages);


const originalData = {
    IdPosts: "999",
    posts: MensajesEnDB
}

//Definimos un esquema de usuarios(Autores y comentaristas)
const user = new schema.Entity("users");

//Definimos un esquema de comentaristas
const article = new schema.Entity( "articles" , {
    author:user,
});

//Definimos un esquema de posts (arreglo de articulos)
const posts = new schema.Entity( "posts", {
    posts: [ article ]
}, { idAttribute: "IdPosts" } )
import util from "util"
function print(objeto) {
    console.log( util.inspect( objeto , false , 12 , true ) );
}


//-----------------------------------------------------------
//Normalizo la Data

const normalizeData = normalize( originalData , posts );
print(normalizeData)

console.log("Longitud objeto original:" , JSON.stringify(originalData).length );
console.log("Longitud de objeto normalizado:" , JSON.stringify( normalizeData ).length );

function compressionPercentage(originalData, compressedData) {
    const resultado = Math.round((JSON.stringify(compressedData).length / JSON.stringify(originalData).length) * 100)
    return parseInt(resultado)
}

const porcentajeDeNormalizacion = compressionPercentage(originalData, normalizeData);

console.log("Porcentaje de normalizacion:" ,porcentajeDeNormalizacion);

//--------------------------------------------------------------------
//Desnormalizacion

const denormalizeData = denormalize( normalizeData.result , posts , normalizeData.entities )
print( denormalizeData )

console.log( JSON.stringify(denormalizeData).length ) ;

//---------------------------------------------------
//Mensajes al front a traves de Array normalizado
function listarMensajesNormalizados() {
    const articulosEnDataNorm = normalizeData.entities.articles;
    const mensajesParaElFront = []
    for (const numero in articulosEnDataNorm) {
        mensajesParaElFront.push(articulosEnDataNorm[numero])
        }
    return mensajesParaElFront;
}

const mensajesParaElFront = listarMensajesNormalizados();

console.log("Mensajes para el front:" , mensajesParaElFront);

//--------------------------------------------
// configuro el socket

io.on("connection", async socket => {
    console.log('Nuevo cliente conectado!' + socket.id);
    // carga inicial de productos
    socket.emit("productos", productos);

    // actualizacion de productos
    socket.on("new-product", (data) => {
        productos.push(data);
        io.sockets.emit("products", productos);
    });

    // carga inicial de mensajes
    socket.emit("messages", mensajesParaElFront);
    socket.emit("porcentajeDeCompresion" , porcentajeDeNormalizacion)

    // actualizacion de mensajes
    socket.on("new-message", (data) => {
        messages.push(data);
        mensajesApi.guardarMensaje(data);
        io.sockets.emit("messages", mensajesParaElFront);
    })
});




//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('../public'))


//-------------------------------------------
//Defino motor de plantilla

app.engine("handlebars", engine());
app.set('view engine', 'handlebars');
app.set('views', '../public/views');


//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
