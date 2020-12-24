'use strict';

const io = require('socket.io-client');
const host = "http://localhost:3000/queue-server";
const socket = io.connect(host);

socket.on('pickup', pickup);
console.log('made it to driver page')


function pickup (payload){
    setTimeout(() => {
        socket.emit('inTransit', payload);
    }, 1000);
    setTimeout(() => {
        socket.emit('delivered', payload)
    }, 3000);
}
// socket.on('inTransit', consoleLog);

// function consoleLog (payload){
//     console.log(`DRIVER: in-transit with order num ${payload.orderId}!`);
// }

// socket.on('delivered', logInTransit);

// function logInTransit(payload){
//     console.log(`delivered order num ${payload.orderId}`);
// }

// module.exports = {consoleLog, logInTransit};
