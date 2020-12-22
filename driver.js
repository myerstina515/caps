'use strict';


const event = require('./events');

event.on('pickup', pickup);
event.on('in-transit', inTransit);
console.log('made it to driver page')

function pickup (payload){
    setTimeout(() => {
        console.log(`DRIVER: picked up ${payload.orderId}`);
        event.emit('in-transit', payload);
    }, 1000);
}

function inTransit (payload){
    setTimeout(() => {
        console.log('delivered');
        event.emit('delivered', payload)
    }, 3000);
}

