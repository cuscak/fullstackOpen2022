const config = require('./utils/config')
const logger = require('./utils/logger')


const express = require('express')
const app = express()

const cors = require('cors')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const blogRouter = require('./controllers/blog')

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

