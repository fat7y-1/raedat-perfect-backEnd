const express = require("express")
const router = express.Router()
const middleware = require("../middleware")
const contentController = require("../controllers/contentController")

router.get("/", contentController.getAllContent)
router.get("/page/:page", contentController.getAllContent)
router.get("/:id", contentController.getOneContent)

// Admin protected routes

// NEW: Reorder route MUST go above the /:id routes
router.put(
  "/reorder",
  middleware.stripToken,
  middleware.verifyToken,
  contentController.reorderContent
)

router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  contentController.addContent
)

router.put(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  contentController.updateContent
)

router.delete(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  contentController.deleteContent
)

module.exports = router
