'use strict';

const client = require('socket.io-client');
const socket = client.connect('http://localhost:3000/queue-server');
const faker = require('faker');
const storeName = '1-206-flowers';
console.log('made it to flowers page');

socket.emit('getAll');

socket.on('connection', () => {
    console.log('connected to flowers client');
});
socket.on('delivered', messages => {
    console.log('inside client delivered route', messages.payload);
    socket.emit('recieved', messages);
});

socket.emit('join', storeName);

socket.on('delivered', (payload) => {
    console.log(`Thank you for delivering ${payload.orderId}`);
});

setInterval(() => {
    let newOrder = {
        store: storeName,
        orderId: faker.random.uuid(),
        customerName: faker.name.findName(),
        address: `${faker.address.city()}, ${faker.address.state()}`,
    }
    socket.emit('pickup', newOrder);
}, 5000);



