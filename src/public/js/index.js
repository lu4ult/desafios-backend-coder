const socket = io();

let colores = ['tomato', 'green', 'blue', 'blueviolet'];
let usuariosActivos = {};
let chatBox = document.getElementById('chatBox');
let usuario = "usuario";

Swal.fire({
    title: 'Identificacion',
    input: 'text',
    text: 'Ingresa tu nombre',
    inputValidator: (value) => {
        return !value && 'Ingresa tu nombre!!';
    },
    allowOutsideClick: false
}).then(rtta => {
    usuario = rtta.value;
    socket.emit('nuevoUsuario', usuario)
});



chatBox.addEventListener("input", (e) => {
    socket.emit('message', {
        user: usuario,
        tipo: 'typing',
        message: e.target.value
    });

});

chatBox.addEventListener("change", (e) => {
    socket.emit('message', {
        user: usuario,
        tipo: 'send',
        message: e.target.value
    });
});

socket.on('saludosDesdeElback', msg => {
    console.log(msg)

    socket.emit('respuestaDesdeFront', 'Muchas gracias!')
});


socket.on('messageLogs', (mensajes) => {
    let msgsContainer = document.getElementById("messageLogs");

    let ultimoMensaje = mensajes[mensajes.length - 1];
    console.log(ultimoMensaje)

    if (usuariosActivos[ultimoMensaje.id] === undefined) {
        usuariosActivos[ultimoMensaje.id] = colores[parseInt(Math.random() * colores.length)]
    }

    let htmlContent = mensajes.map(msg => {

        return `<li style="color:${usuariosActivos[msg.id]};"> ${new Date(msg.timestamp).toLocaleTimeString()} ${msg.user}:<br>${msg.message}</li>`;
    });

    msgsContainer.innerHTML = htmlContent;

    // let contentHtml = '';
    // products.forEach(pr => {
    //     console.log(pr)
    //     contentHtml += `<p>${pr.price}</p>`;
    // })

    // document.getElementById("products").innerHTML = contentHtml;
    // console.log(contentHtml)
})

socket.on('typing', (mensaje) => {
    let typingContainer = document.getElementById("typing");

    typingContainer.innerHTML = `${mensaje.user} esta escribiendo...<br>${mensaje.message}`

    // let contentHtml = '';
    // products.forEach(pr => {
    //     console.log(pr)
    //     contentHtml += `<p>${pr.price}</p>`;
    // })

    // document.getElementById("products").innerHTML = contentHtml;
    // console.log(contentHtml)
})




