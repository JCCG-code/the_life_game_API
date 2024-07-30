// Packages
import dotenv from 'dotenv'

// Env variables
dotenv.config()

// Initilizations
const corsOptions = {
  origin:
    process.env.NODE_ENV === 'dev'
      ? 'http://localhost:5173'
      : 'https://jccg-code.github.io',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}

// Export cors
export default corsOptions
