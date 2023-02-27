import { promises as fs } from 'fs'

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async listar(id) {
        
    }

    async listarAll() {
        try {
            const leer = await fs.readFile( this.ruta , "utf-8" );
            console.log("Se muestran todos los productos correctamente");
            return JSON.parse( leer )
        } catch (error) {
            console.log(error.message);
        }
    }

    async guardar(obj) {
        try {
            const leer = await fs.readFile( this.ruta , "utf-8" );
            const data = JSON.parse( leer );
            console.log(data);
            let id;
            data.length === 0
            ?
            (id = 1)
            :
            (id = data[ data.length -1 ].id + 1);
            const newElement = {...obj , id , timestamp: Date() };
            data.push(newElement);
            await fs.writeFile( this.ruta , JSON.stringify( data , null , 2 ) , "utf-8");
            console.log("Se agrego el item correctamente");
            return newElement.id;
        }catch (e){
            console.log(e);
            return e.message;
        }
    }

    async guardarMensaje( obj ) {
        try {
            const leer = await fs.readFile( this.ruta , "utf-8");
            const data = JSON.parse( leer );
            const mensajesEnDB = data
            let id;
            mensajesEnDB.length === 0
            ?
            (id = 1)
            :
            (id = mensajesEnDB[ mensajesEnDB.length -1 ].id + 1);
            const newElement = {id , ...obj ,  timestamp: Date() };
            mensajesEnDB.push(newElement)
            await fs.writeFile( this.ruta , JSON.stringify( data , null , 2 ) , "utf-8");
            console.log("Se agrego el item correctamente");
            return newElement.id;
        } catch (error) {
            console.log(error);
            return  error.message             
        }
    }
    

    async actualizar(elem) {
        
    }

    async borrar(id) {
        
    }

    async borrarAll() {
        
    }
}

export default ContenedorArchivo