const socket = io();

// socket.emit('message', 'soy un mensajes desde el cliente');

socket.on('productosTodos', (productosTodos) => {
    let contentHtml = '';
    productosTodos.forEach(pr => {
        console.log(pr)
        contentHtml += `<li>${pr.title}, ${pr.price} $ ${pr.stock}</li>`;
    })

    document.getElementById("products").innerHTML = contentHtml;
});