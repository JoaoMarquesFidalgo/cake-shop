import mongoose from 'mongoose'
import bluebird from 'bluebird'

const config: {
    environment?: string,
    port?: number,
    mongooseUrl?: string,
    url?: string,
    requireUrl?: string
} = { environment: process.env.NODE_ENV }

switch (config.environment) {
  case 'production':
    // to do
    break
  default:
    config.port = 3333
    config.mongooseUrl = 'mongodb://127.0.0.1:27017/cake-shop'
    config.url = 'http://localhost:3333/'
    config.requireUrl = './'
    break
}

const connectWithMongoose = (): void => {
  const connect = () => {
    mongoose.connect(config.mongooseUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
      .then(() => {
        return console.log(`Successfully connected to ${config.mongooseUrl}`)
      })
      .catch(error => {
        console.log('Error connecting to database: ', error)
        return process.exit(1)
      })
  }
  connect()
  mongoose.Promise = bluebird
  mongoose.connection.on('disconnected', connect)
}

export { config, mongoose, connectWithMongoose }
