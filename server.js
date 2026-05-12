const express = require("express")
const logger = require("morgan")
const cors = require("cors")

const PORT = process.env.PORT || 3000

const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

// DB connection
require("./db")

// Routers
const authRouter = require("./routes/authRouter")
const contentRouter = require("./routes/contentRouter")
const contactRouter = require("./routes/contactRouter")

const app = express()

// Middlewares
app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use("/auth", authRouter)
app.use("/content", contentRouter)
app.use("/contact", contactRouter)
// Test route (اختياري)
app.get("/", (req, res) => {
  res.send("Server is running...")
})

// Start server
app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT}...`)
})
