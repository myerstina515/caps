'use strict';

const uuid = require('uuid').v4;
const port = process.env.PORT || 3000;
const io = require('socket.io')(port);
const caps = io.of('/queue-server');

let queue = {
    // storeName,
    // eventName,
    messages: {},
};

caps.on('connection', (socket) => {
  console.log('connected to socket');
  socket.on('join', room => {
    socket.join(room);
  });
  socket.on('received', () => {
    delete queue.messages[id];
    });
  socket.on('getAll', (payload) => {
    Object.keys(queue.messages).forEach(() => {
      socket.emit('messages', { payload: queue.messages[payload.client]});
    });
  });
  socket.on('delivered', (payload) => {
    let id = uuid();
    queue.messages[id] = payload;
    console.log('EVENT', {events: 'delivered', time: new Date().toString(), payload});
    socket.to(payload.store).emit('delivered', { id, payload });
  });
  socket.on('pickup', (payload) => {
    console.log('EVENT', {events: 'pickup', time: new Date().toString(), payload} );
    socket.emit('pickup', payload);
  });
  socket.on('inTransit', (payload) => {
    socket.to(payload.store).emit('inTransit', payload);
    console.log('EVENT', {events: 'inTransit', time: new Date().toString(), payload});
  });
});


