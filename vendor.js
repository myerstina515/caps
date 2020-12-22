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

events.on('delivered', thankYou);

function thankYou (payload){
    console.log(`VENDOR: Thank you for ordering ${payload.orderId}!`);
}

module.exports = thankYou;
