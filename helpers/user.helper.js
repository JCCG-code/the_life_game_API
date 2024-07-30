// Local imports
import User from '../models/User.js'
import HttpError from '../errors/HttpError.js'

/**
 * Helper class for user-related operations.
 */
export class UserHelperClass {
  /**
   * Saves a new user profile to the database.
   *
   * @param {Object} profile - The user profile object containing user details.
   * @param {string} profile._json.name - The username from the user profile.
   * @param {string} profile._json.email - The email from the user profile.
   * @param {string} profile._json.picture - The profile picture URL from the user profile.
   * @returns {Promise<Object>} The saved user object.
   * @throws {HttpError} If the user already exists or another error occurs during the process.
   */
  static async saveUser(profile) {
    try {
      // Creates user instance
      const newUser = {
        username: profile._json.name,
        email: profile._json.email,
        password: 'test',
        picture: profile._json.picture,
        role: ['client']
      }
      // Request user to database
      const resUser = await User.find({
        username: newUser.username,
        email: newUser.email
      })
      if (resUser._id) {
        throw new HttpError({
          status: 400,
          message: `This username ${newUser.username} or this email ${newUser.email} already exists`
        })
      }
      // Saves into database
      const res = await new User(newUser).save()
      return res
    } catch (error) {
      throw new HttpError({
        status: error?.status || 500,
        message: error?.message || error
      })
    }
  }
}
