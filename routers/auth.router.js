// Packages
import express from 'express'

// Local files
import corsOptions from '../config/cors.js'
import passport from '../config/passport.js'

// Initializations
const router = express.Router()

/**
 * @apiGroup Auth
 * @api {GET} /api/auth/google Google page authentication
 * @apiDescription
 * This endpoint redirects the user to the Google authentication page.
 * Once the user authenticates with their Google credentials,
 * Google redirects back to the application with an authentication token.
 *
 * The authentication flow includes:
 * 1. Redirecting the user to Google's login page.
 * 2. Requesting permissions to access the user's profile and email.
 * 3. Handling the callback from Google with the authentication token.
 */
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

/**
 * @apiGroup Auth
 * @api {GET} /api/auth/google/callback Google callback route
 * @apiDescription
 * This endpoint handles the callback from Google after the user has authenticated.
 *
 * The flow includes:
 * 1. Receiving the callback from Google with an authentication token.
 * 2. Authenticating the user using Passport.js.
 * 3. Redirecting the user to the home page if authentication is successful.
 * 4. Redirecting the user to the home page with a failure message if authentication fails.
 */
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: corsOptions.origin + '/'
  }),
  (_req, res) => {
    // If authentication is successful
    res.redirect(corsOptions.origin + '/')
  },
  (err, _req, res, _next) => {
    // Error handling middleware
    console.error('Authentication error:', err)
    res.redirect(corsOptions.origin + '/error') // Redirect to an error page or handle error
  }
)

/**
 * @route GET /user/session-status
 * @description Checks if the user is authenticated and returns session status.
 * @access Public
 * @returns {Object} Status of authentication and user information if authenticated.
 */
router.get('/session-status', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ status: 'OK', data: req.user })
  } else {
    res.status(400).json({
      status: 'FAILURE',
      data: { message: 'Any session has been created' }
    })
  }
})

export default router
 