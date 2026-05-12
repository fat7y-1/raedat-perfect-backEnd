const Content = require("../models/Content")

const getAllContent = async (req, res) => {
  try {
    // UPDATED: Added .sort({ position: 1 }) to load items in the correct order
    const contents = await Content.find({ page: req.params.page }).sort({
      position: 1,
    })
    res.send(contents)
  } catch (error) {
    res.send(`error: ${error}`)
  }
}

const getOneContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id)
    if (!content) {
      return res.status(404).json({ message: "not found" })
    }
    res.status(200).json(content)
  } catch (error) {
    console.error(`Error: ${error}`)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

const addContent = async (req, res) => {
  try {
    // Optional: Auto-assign position to the end of the list when creating a new section
    const count = await Content.countDocuments({ page: req.body.page })
    const newContentData = { ...req.body, position: count }

    const newContent = await Content.create(newContentData)
    res.status(201).send(newContent)
  } catch (error) {
    res.status(500).send(`error: ${error}`)
  }
}

const updateContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    if (!content) {
      return res.status(404).json({ message: "Content not found" })
    }

    res.status(200).json(content)
  } catch (error) {
    console.error(`Error: ${error}`)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

const deleteContent = async (req, res) => {
  try {
    const deletedContent = await Content.findByIdAndDelete(req.params.id)
    if (!deletedContent) {
      return res.status(404).send({ message: "Content not found" })
    }

    res.send({ message: "Deleted successfully", id: req.params.id })
  } catch (error) {
    res.send(`Error: ${error}`)
  }
}

// NEW: Function to handle batch updating positions
const reorderContent = async (req, res) => {
  try {
    const { orderedSections } = req.body

    const updatePromises = orderedSections.map((section, index) => {
      return Content.findByIdAndUpdate(section._id, { position: index })
    })

    await Promise.all(updatePromises)
    res.status(200).json({ message: "Order updated successfully" })
  } catch (error) {
    console.error(`Error: ${error}`)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

module.exports = {
  getAllContent,
  addContent,
  getOneContent,
  updateContent,
  deleteContent,
  reorderContent, // Export the new function
}
