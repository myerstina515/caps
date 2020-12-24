'use strict';

const io = require('socket.io-client');
const host = "http://localhost:3000/caps";
const socket = io.connect(host);

require('dotenv').config();
const faker = require('faker');
const storeName = '1-206-flowers';
console.log('made it to vendor page');

// const capsConnection = io.connect(`${host}`);

// capsConnection.on('pickup', handlePickup);

// function handlePickup(payload){
//     console.log(`this is the pickup handler: ${payload.orderId}`);
// }

// emitting the join event so the caps page can hear it when it listens
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

socket.on('pickup', thankYou)
function thankYou (payload){
    console.log(`VENDOR: Thank you for delivering order num ${payload.orderId}!`);
}

module.exports = thankYou;