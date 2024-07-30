// Packages
import { Schema, model } from 'mongoose'
import bcryptjs from 'bcryptjs'

// Schema creation
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    picture: {
      type: String
    },

    // Client or superadmin role
    role: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

/**
 * @description Pre-save middleware to hash the password before saving the user document.
 * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
 * @param {Function} next - Callback to proceed to the next middleware.
 */
userSchema.pre('save', async function (next) {
  const user = this
  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next()
  }
  try {
    // Hash the password using the salt
    user.password = await bcryptjs.hash(
      user.password,
      await bcryptjs.genSalt(10)
    )
    next()
  } catch (err) {
    next(err)
  }
})

/**
 * @description Method to compare a given password with the hashed password stored in the database.
 * @author Juan Carlos Cuadrado Gracia <jccuadradogracia@gmail.com>
 * @param {string} candidatePassword - The password to compare.
 * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, otherwise false.
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password)
}

// Export user schema
export default model('User', userSchema)
