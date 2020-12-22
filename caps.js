'use strict';

const events = require('./events');

require('./vendor');
require('./driver');

events.on('pickup', (payload) => {
  console.log('EVENT', {events: 'pickup', time: new Date(), payload} );
});

events.on('delivered', (payload) => {
    console.log('VENDOR: Thank you for delivering!');
    console.log('EVENT', {events: 'delivered', time: new Date(), payload});
});

events.on('in-transit', (payload) => {
    console.log('EVENT', {events: 'in-transit', time: new Date(), payload});
});
