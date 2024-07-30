// Packages
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'

// Local files
import User from '../models/User.js'
import { UserHelperClass } from '../helpers/user.helper.js'

// Env variables
dotenv.config()

/**
 * Google strategy creation
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Saves into database
        const resUser = await UserHelperClass.saveUser(profile)
        // resUser has value
        if (resUser) {
          return done(null, resUser)
        }
      } catch (error) {
        console.log('[error]: ', error.message)
        // Handle known errors such as user already exists
        return done(null, false, error)
      }
    }
  )
)

/**
 * User serialization
 */
passport.serializeUser((user, done) => {
  done(null, user._id)
})

/**
 * User deserialization
 */
passport.deserializeUser(async (id, done) => {
  try {
    // Search by id
    const user = await User.findById(id)
    // Check if user exists
    if (user) {
      // Attach user to req.user
      done(null, user)
    }
  } catch (error) {
    done(error)
  }
})

export default passport
