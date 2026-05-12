const ContactMessage = require("../models/ContactMessage")

const sendMessage = async (req, res) => {
  try {
    const newMessage = await ContactMessage.create(req.body)

    res.status(201).json(newMessage)
  } catch (error) {
    res.status(500).send(`error: ${error}`)
  }
}

const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({
      createdAt: -1,
    })

    res.status(200).json(messages)
  } catch (error) {
    res.status(500).send(`error: ${error}`)
  }
}

const deleteMessage = async (req, res) => {
  try {
    const deletedMessage = await ContactMessage.findByIdAndDelete(req.params.id)

    if (!deletedMessage) {
      return res.status(404).send({
        message: "Message not found",
      })
    }

    res.send({
      message: "Deleted successfully",
    })
  } catch (error) {
    res.status(500).send(`error: ${error}`)
  }
}

module.exports = {
  sendMessage,
  getMessages,
  deleteMessage,
}
