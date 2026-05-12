const express = require("express")
const router = express.Router()
const middleware = require("../middleware")
const authController = require("../controllers/authController")

router.post("/sign-up", authController.registerUser)
router.post("/sign-in", authController.signIn)

router.put(
  "/update-password/:id",
  middleware.stripToken,
  middleware.verifyToken,
  authController.updatePassword
)
router.get(
  "/session",
  middleware.stripToken,
  middleware.verifyToken,
  authController.checkSession
)
router.get("/:id", authController.getUserById)

module.exports = router
