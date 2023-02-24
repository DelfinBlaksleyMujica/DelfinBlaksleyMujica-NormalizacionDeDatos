import ContenedorArchivo from "../contenedores/ContenedorArchivo.js"
import { generarProducto } from "../utils/generadorDeProductos.js"

class ApiProductosMock extends ContenedorArchivo {
    constructor() {
        super("../DB/productos.json")
    }
    async popular( cant=6 ){
        const nuevos = []
        for (let i = 1; i < cant; i++) {
            const nuevoProducto = generarProducto()
            const guardado =await this.guardar(nuevoProducto)
            nuevos.push(guardado)
        }
        return nuevos;
    }
}

export default ApiProductosMock