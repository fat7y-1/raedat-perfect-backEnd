const express = require("express")
const logger = require("morgan")
const cors = require("cors")

const PORT = process.env.PORT || 3000

const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

const db = require("./db")

// Routers here
const authRouter = require("./routes/authRouter")
const contentRouter = require("./routes/contentRouter")

const app = express()
app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use("/", (req, res) => {
//   res.send(`Connected!`)
// })

//  use Router here
app.use("/auth", authRouter)
app.use("/content", contentRouter)

app.listen(PORT, () => {
  console.log(`Running Express server on Port ${PORT} . . .`)
})
