'use strict';

const io = require('socket.io-client');
const host = "http://localhost:3000/caps";
const socket = io.connect(host);

require('dotenv').config();
const faker = require('faker');
const storeName = process.env.STORE;
console.log('made it to vendor page');

// const capsConnection = io.connect(`${host}`);

// capsConnection.on('pickup', handlePickup);

// function handlePickup(payload){
//     console.log(`this is the pickup handler: ${payload.orderId}`);
// }

socket.emit('join', storeName);

setInterval(() => {
    let fakeOrder = {
        store: storeName,
        orderId: faker.random.uuid(),
        customerName: faker.name.findName(),
        address: `${faker.address.city()}, ${faker.address.state()}`,
    }
    socket.emit('pickup', fakeOrder);
}, 5000);

socket.on('pickup', consoleLog);

function consoleLog (payload){
    console.log(`DRIVER: in-transit with order num ${payload.orderId}!`);
}

socket.on('pickup', logInTransit);

function logInTransit(payload){
    console.log(`delivered order num ${payload.orderId}`);
}

module.exports = {consoleLog, logInTransit};
