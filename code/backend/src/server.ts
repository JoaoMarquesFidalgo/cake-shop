import express from 'express'
import routes from './routes'
import cors from 'cors'
import { connectWithMongoose } from '@config/config'

const app = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(routes)
connectWithMongoose()

app.listen(3333, () => {
  console.log('Listening on port 3333')
})
