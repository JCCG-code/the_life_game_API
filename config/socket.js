// Packages
import { Server } from 'socket.io'
import dotenv from 'dotenv'

// Local files
import corsOptions from './cors.js'

// Env variables
dotenv.config()

// Initializations
let io
let usersCount = 0

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: corsOptions
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
