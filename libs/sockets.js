// Packages
import { Server } from 'socket.io'
import dotenv from 'dotenv'

// Config
dotenv.config()

// Initializations
let io
let usersCount = 0

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin:
        process.env.NODE_ENV === 'dev'
          ? 'http://localhost:5173'
          : 'https://jccg-code.github.io',
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  })

  io.on('connection', (socket) => {
    // console.log('[socketIO] User ' + socket.id + ' connected')

    // Logic users online
    usersCount++
    io.emit('users_count', usersCount)

    socket.on('disconnect', () => {
      // console.log('[socketIO] User ' + socket.id + ' disconnected')

      // Logic users online
      usersCount--
      io.emit('users_count', usersCount)
    })
  })
}

export const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!')
  }
  return io
}
