import faker from "faker";
faker.locale = "es";

function generarProducto() {
    return {
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        precio: faker.commerce.price(5500, 20500 , 2 , "$" ),
        codigoDeProducto: faker.datatype.number({ min: 1000000 }),
        stock: faker.datatype.number({ max: 100 }),
        thumbnail: faker.image.imageUrl(),
        timestamp: faker.date.past()
    }
};

export { generarProducto };