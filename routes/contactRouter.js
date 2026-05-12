const express = require("express")
const router = express.Router()

const middleware = require("../middleware")
const contactController = require("../controllers/contactController")

router.post("/", contactController.sendMessage)

router.get(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  contactController.getMessages
)

router.delete(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  contactController.deleteMessage
)

module.exports = router
