const User = require("../models/User")
const middleware = require("../middleware")

const registerUser = async (req, res) => {
  try {
    const userInDB = await User.exists({ username: req.body.username })
    if (userInDB) {
      return res.send("email already taken!")
    } else {
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).send("Password and Confirm Password must match ")
      }
      // const hashedPassword = await bcrypt.hash(req.body.password, 12)

      // JWT auth don't forget to put SALT AND APP_SECRET ON ENV
      let passwordDigest = await middleware.hashPassword(req.body.password)

      let boolAdmin
      if (req.body.admin === true) {
        boolAdmin = req.body.admin
      } else {
        boolAdmin = false
      }

      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: passwordDigest,
        admin: boolAdmin,
      })
      res.send(`user successfully registered! ${newUser}`)
    }
  } catch (error) {
    res.send(`error: ${error}`)
  }
}

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res
        .status(401)
        .send({ status: "Error", msg: "Invalid Email or Password" })
    }

    let matched = await middleware.comparePassword(
      req.body.password,
      user.password
    )

    if (matched) {
      let payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        admin: user.admin,
      }
      let token = middleware.createToken(payload)
      let userData = {
        username: user.username,
        email: user.email,
        id: user._id,
        admin: user.admin,
      }
      return res.send({ user: userData, token })
    } else {
      res
        .status(401)
        .send({ status: "Error", msg: "Invalid Email or Password" })
    }
    // console.log("signed in!")
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: "Error", msg: "An error has occurred!" })
  }
}
const checkSession = async (req, res) => {
  const { payload } = res.locals
  res.status(200).send(payload)
}
const getUserById = async (req, res) => {
  try {
    console.log(req.params.id)
    const user = await User.findOne({ _id: req.params.id })
    // console.log(user)
    res.send(user)
  } catch (error) {
    res.send(`error: ${error}`)
  }
}
module.exports = {
  registerUser,
  signIn,
  checkSession,
  getUserById,
}
