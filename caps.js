'use strict';

// require('./vendor/vendor');
// require('./driver/driver');
const port = process.env.PORT || 3000;
const io = require('socket.io')(port);

io.on('connection', (socket) => {
  console.log('You are connected on socket ', socket.id);
})

// make a name space
const caps = io.of('/caps');

caps.on('connection', (socket) => {
  socket.on('join', room => {
    socket.join(room);
  });
  socket.on('pickup', (payload) => {
    console.log('EVENT', {events: 'pickup', time: new Date().toString(), payload} );
    // emits to the entire name space
    caps.emit('pickup', payload);
  });
  socket.on('inTransit', (payload) => {
    console.log('EVENT', {events: 'inTransit', time: new Date().toString(), payload});
    // payload.store is the same as the room name of the store, so we are only emitting to that specific room.
    caps.to(payload.store).emit('inTransit', payload);
  });
  socket.on('delivered', (payload) => {
    console.log('EVENT', {events: 'delivered', time: new Date().toString(), payload});
    caps.to(payload.store).emit('delivered', payload);
  });
});


