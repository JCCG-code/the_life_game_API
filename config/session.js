// Packages
import session from 'express-session'

// Initializations
const sessionConfig = {
  secret: 'TChildrenOnTheTop',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV !== 'dev' }
}

// Create session
const expressSession = session(sessionConfig)

// Export session
export default expressSession
