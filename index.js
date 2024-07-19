// Packages
import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'

// Config
dotenv.config()

// Routes

// Socket
import { initializeSocket } from './libs/sockets.js'

// Initializations
const app = express()
const port = process.env.PORT
const server = http.createServer(app)

// Middewares
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'dev'
        ? 'http://localhost:5173'
        : 'https://jccg-code.github.io',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
)

// Using routes

// Static files

// Initialize Socket.IO
initializeSocket(server)

// Server and database are listening
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('[server] Mongoose connection has been done successfully')
    server.listen(port, () => {
      console.log(`[server] Server is running at http://localhost:${port}`)
    })
  })
  .catch((err) => console.log(err))
