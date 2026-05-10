const mongoose = require("mongoose")
const ContentSchema = new mongoose.Schema(
  {
    page: { type: String, required: true },
    header: { type: String },
    text: { type: String },
    image: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Content", ContentSchema)
