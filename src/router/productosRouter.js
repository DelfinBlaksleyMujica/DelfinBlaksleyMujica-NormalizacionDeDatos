import express from "express";
import ApiProductosMock from "../api/productos.js";
import ProductosDeBase from "../../DB/productos.json" assert { type: "json" };
const productos = ProductosDeBase;
let arrayLength = productos.length > 0 ? true : false;

class ProductosRouter extends express.Router {
    constructor() {
        super()

        const apiProductos = new ApiProductosMock();

        this.post( "/popular" , async ( req , res , next ) => {
            try {
                const productos = await apiProductos.popular( req.query.cant )
                res.status(200).send({ productos: productos })
            } catch (error) {
                next( error )
            }
        })
        this.get("/" , async ( req , res , next ) => {
            try {
                const productos = await apiProductos.listarAll()
                res.status(200).send( { productos: productos } )
            } catch (error) {
                next( error )
            }
        })
        this.get("/list" , async ( req , res , next ) => {
            try {
                res.render("productsList" , { productos: productos , listExists: arrayLength })
            } catch (error) {
                next( error )
            }
            
        })
    }
}

export default ProductosRouter