/**
 * @description This function checks if the request is authenticated using Passport.js.
 * If the user is authenticated, it proceeds to the next middleware or route handler.
 * Otherwise, it responds with a 400 status code and a message indicating that the user is not authenticated.
 * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function in the stack.
 * @returns {void} - Calls `next()` if authenticated, otherwise responds with a 400 status and JSON message.
 *
 */
export default function isAuthenticated(req, res, next) {
  console.log(req)
  if (req.isAuthenticated()) {
    return next()
  }
  return res.status(400).json({ message: 'Not authenticated' })
}
