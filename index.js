import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()

connectDB()
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/tasks', taskRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})