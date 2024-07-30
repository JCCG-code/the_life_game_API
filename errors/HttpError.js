/**
 * Custom HTTP Error class.
 * This class extends the built-in Error class to include an HTTP status code.
 */
export default class HttpError extends Error {
  /**
   * @description A custom http error
   * @constructor
   * @param {number} status Status error code
   * @param {message} message Error message
   */
  constructor({ status, message }) {
    super(message)
    this.status = status
  }
}
