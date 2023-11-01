const socket = io();
console.log("holaaaa")


// const socket = io.connect('http://localhost:8080', { 'forceNew': true });

socket.emit('message', 'soy un mensajes desde el cliente');

socket.on('saludosDesdeElback', msg => {
    console.log(msg)

    socket.emit('respuestaDesdeFront', 'Muchas gracias!')
});


const form = document.getElementById("form");
form.onsubmit = (e) => {
    e.preventDefault();
    const nombre = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    console.log(price)



    const producto = { nombre, price };
    console.log(producto)

    socket.emit('newProduct', producto);
}

socket.on('products', (products) => {
    console.log(products)

    let contentHtml = '';
    products.forEach(pr => {
        console.log(pr)
        contentHtml += `<p>${pr.price}</p>`;
    })

    document.getElementById("products").innerHTML = contentHtml;
    // console.log(contentHtml)
})


socket.on('messageFromPost', (msg) => {
    console.log(msg);
})
