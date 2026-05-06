const mongoose = require("mongoose")
require("dotenv").config({ quiet: true })

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`Successfully connected to MongoDB database . . .`)
})

module.exports = mongoose
