const Content = require("../models/Content")

// const getPageContent = async (req, res) => {
//   try {
//     const content = await Content.find({ page: req.params.pageName })
//     ;(res, send(content))
//   } catch (error) {
//     res.send(`error: ${error}`)
//   }
// }

const getAllContent = async (req, res) => {
  try {
    const contents = await Content.find({ page: req.params.page })
    res.send(contents)
  } catch (error) {
    res.send(`error: ${error}`)
  }
}

const addContent = async (req, res) => {
  try {
    const contentInDB = await Content.exists({ name: req.body.name })
    if (contentInDB) {
      return res.send("This menu item already exists!")
    } else {
      const newContent = await Content.create({
        page: req.body.page,
        header: req.body.header,
        text: req.body.text,
        image: req.body.image,
      })
      res.send(newContent)
    }
  } catch (error) {
    res.send(`error: ${error}`)
  }
}

const updateContent = async (req, res) => {
  try {
    const { id } = req.params
    const updateData = req.body

    const updatedContent = await Content.findByIdAndUpdate(id, updateData, {
      new: true,
    })

    if (!updatedContent) {
      return res.status(404).json({ message: "Restaurant not found" })
    }

    res.status(200).json(updatedContent)
  } catch (error) {
    console.error(`Error: ${error}`)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

const getOneContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id)
    if (!content) {
      return res.status(404).json({ message: "Restaurant not found" })
    }
    res.status(200).json(content)
  } catch (error) {
    console.error(`Error: ${error}`)
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

const deleteContent = async (req, res) => {
  try {
    const deletedContent = await Content.findByIdAndDelete({
      _id: req.params.id,
    })
    res.send(`deletedContent: ${deletedContent}`)
  } catch (error) {
    res.send(`Error: ${error}`)
  }
}

module.exports = {
  // getPageContent,
  addContent,
  getAllContent,
  updateContent,
  getOneContent,
  deleteContent,
}
