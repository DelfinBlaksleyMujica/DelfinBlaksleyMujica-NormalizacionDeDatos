const socket = io.connect();


const render = ( data ) => {
    const html = data.map(( element , index ) => {
        return`
                <div>
                <strong style="color:blue">${element.author.username}</strong>
                <em style="color:brown">[${element.timestamp}]:</em>
                <em style="color:green">${element.text}</em>
                <img src="${element.author.avatar}" alt="Avatar de usuario" width="50" height="50" >
                </div>`;
    });
    document.getElementById("messages").innerHTML = html;
};

const renderProduct = ( data )=> {
    const html = data.map(( product , index ) => {
        return`
        <tr>
        <td>${product.nombre}</td>
        <td>$${product.precio}</td>
        <td><img src="${product.thumbnail}" width="100" height="100" alt="Imagen de producto"></td>
    </tr>`
    });
    document.getElementById("products").innerHTML = html;
};


function addMessage(e) {
    const mensaje= {
        author:
        {
            username: document.getElementById("username").value,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            age: document.getElementById("age").value,
            alias: document.getElementById("alias").value,
            avatar: document.getElementById("avatar").value,
        },
        timestamp: Date(),
        text: document.getElementById("mensaje").value
    };
    socket.emit("new-message" , mensaje );
    document.getElementById("username").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("age").value = "";
    document.getElementById("alias").value = "";
    document.getElementById("avatar").value = "";
    document.getElementById("mensaje").value = "";
    /*Hacemos un return false para que no se nos recargue la pagina cuando clickeamos el button*/
    return false;
}


function addProduct(e) {
    const product= {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    };
    socket.emit("new-product" , product );
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("thumbnail").value = "";
    /*Hacemos un return false para que no se nos recargue la pagina cuando clickeamos el button*/
    return false;
}

socket.on("products" , ( data ) => renderProduct( data ) );
socket.on("messages" , (data) => render(data));








//------------------------------------------------------------------------------------

/*const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: formAgregarProducto[0].value,
        price: formAgregarProducto[1].value,
        thumbnail: formAgregarProducto[2].value
    }
    socket.emit('update', producto);
    formAgregarProducto.reset()
})

socket.on('productos', productos => {
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

function makeHtmlTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}
*/
//-------------------------------------------------------------------------------------

// MENSAJES

/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// Definimos un esquema de autor


// Definimos un esquema de mensaje


// Definimos un esquema de posts

/* ----------------------------------------------------------------------------- */
/*
const inputUsername = document.getElementById('username')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = {
        author: {
            email: inputUsername.value,
            nombre: document.getElementById('firstname').value,
            apellido: document.getElementById('lastname').value,
            edad: document.getElementById('age').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: inputMensaje.value
    }

    socket.emit('nuevoMensaje', mensaje);
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('mensajes', mensajesN => {

    console.log(`Porcentaje de compresión ${porcentajeC}%`)
    document.getElementById('compresion-info').innerText = porcentajeC

    console.log(mensajesD.mensajes);
    const html = makeHtmlList(mensajesD.mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    return mensajes.map(mensaje => {
        return (`
        <div>
            <b style="color:blue;">${mensaje.author.email}</b>
            [<span style="color:brown;">${mensaje.fyh}</span>] :
            <i style="color:green;">${mensaje.text}</i>
            <img width="50" src="${mensaje.author.avatar}" alt=" ">
        </div>
    `)
    }).join(" ");
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})*/