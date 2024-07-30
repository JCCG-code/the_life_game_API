// Packages
import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'

// Config files
import corsOptions from './config/cors.js'
import passport from './config/passport.js'
import session from './config/session.js'
import { initializeSocket } from './config/socket.js'

// Config
dotenv.config()

// Routes
import authRouter from './routers/auth.router.js'

// Initializations
const app = express()
const port = process.env.PORT
const server = http.createServer(app)

// Middewares
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

// Sessions
app.use(session)
app.use(passport.initialize())
app.use(passport.session())

// Using routes
app.use('/api/auth', authRouter)

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
