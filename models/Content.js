const mongoose = require("mongoose")
const ContentSchema = new mongoose.Schema(
  {
    page: { type: String, required: true },
    header: { type: String },
    text: { type: String },
    image: { type: String },
    layoutType: {
      type: String,
      default: "standard",
      enum: ["standard", "grid-text", "grid-header"],
    },
    buttonText: { type: String },
    buttonLink: { type: String },
    textColor: { type: String },
    fontFamily: { type: String },
    imageStyle: { type: String },
    imageSize: { type: String, default: "medium" },

    items: [
      {
        image: String,
        title: String,
        desc: String,
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Content", ContentSchema)
