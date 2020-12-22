'use strict';

const events = require('./events');

require('./vendor');
require('./driver');


events.on('pickup', (payload) => {
  console.log('EVENT', {events: 'pickup', time: new Date(),payload} );
});

events.on('delivered', (payload) => {
    console.log('EVENT', {events: 'delivered', time: new Date(), payload});
});

events.on('inTransit', (payload) => {
    console.log('EVENT', {events: 'inTransit', time: new Date(), payload});
});
