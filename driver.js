'use strict';


const events = require('./events');

events.on('pickup', pickup);
events.on('inTransit', inTransit);
// console.log('made it to driver page')


function pickup (payload){
    setTimeout(() => {
        events.emit('inTransit', payload);
    }, 1000);
}

events.on('pickup', consoleLog);

function consoleLog (payload){
    console.log(`DRIVER: Picked up ${payload.orderId}!`);
}

function inTransit (payload){
    setTimeout(() => {
        console.log('delivered');
        events.emit('delivered', payload)
    }, 3000);
}

events.on('inTransit', logInTransit);

function logInTransit(payload){
    console.log(`Delivered ${payload.orderId}`);
}

module.exports = {consoleLog, logInTransit};
