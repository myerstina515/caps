'use strict';

// require('./vendor/vendor');
// require('./driver/driver');
const port = process.env.PORT || 3000;
const io = require('socket.io')(port);
const caps = io.of('/caps');

io.on('connection', (socket) => {
  console.log('You are connected on socket ', socket.id);
})

caps.on('connection', (socket) => {
  socket.on('join', room => {
    socket.join(room);
  });
  socket.on('pickup', (payload) => {
    console.log('EVENT', {events: 'pickup', time: new Date().toString(), payload} );
    caps.emit('pickup', payload);
  });
  socket.on('inTransit', (payload) => {
    console.log('EVENT', {events: 'inTransit', time: new Date().toString(), payload});
    caps.to(payload.store).emit('inTransit', payload);
  });
  socket.on('delivered', (payload) => {
    console.log('EVENT', {events: 'delivered', time: new Date().toString(), payload});
    caps.to(payload.store).emit('delivered', payload);
  });
});


