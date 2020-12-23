'use strict';

const io = require('socket.io-client');
const host = "http://localhost:3000/caps";
const socket = io.connect(host);
socket.on('pickup', pickup);
console.log('made it to driver page')


function pickup (payload){
    setTimeout(() => {
        socket.emit('inTransit', payload);
    }, 1000);
    setTimeout(() => {
        socket.emit('delivered', payload)
        console.log(`VENDOR: Thank you for delivering order num ${payload.orderId}!`);
    }, 3000);
}

