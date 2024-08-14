import app from '@adonisjs/core/services/app'
import { Server } from 'socket.io'
import server from '@adonisjs/core/services/server'

app.ready(() => {
  const io = new Server(server.getNodeServer(), {
    cors: {
      origin: '*',
    },
  })
  io?.on('connection', (socket) => {
    console.log('A new connection', socket.id)
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setTimeout(() => {
        io.emit('welcome',{ message: 'Welcome'});
    }, 1000);
    socket.on('a-user-consulted-list-post', (data) => {
        console.log('a-user-consulted-list-post', data)
    })
    socket.on('a-user-leaved-list-post', (data) => {
        console.log('a-user-leaved-list-post', data)
    })
  })
})