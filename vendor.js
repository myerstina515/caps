'use strict';

const events = require('./events');
require('dotenv').config();
const storeName = process.env.STORE;
const faker = require('faker');

setInterval(() => {
    let fakeOrder = {
        storeName,
        orderId: faker.random.uuid(),
        customerName: faker.name.findName(),
        address: `${faker.address.city()}, ${faker.address.state()}`,
    }
    events.emit('pickup', fakeOrder);
}, 5000);

