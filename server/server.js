import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import authRoute from './routes/auth.js'
import historyRoute from './routes/history.js'
import promptsRoute from './routes/prompts.js'
import dalleRoute from './routes/dalle.js'

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(cors())
app.use(cookieParser())
app.use('/api/auth', authRoute)
app.use('/api/history', historyRoute)
app.use('/api/prompts', promptsRoute)
app.use('/api/dalle', dalleRoute)

mongoose.set('strictQuery', true)

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('connected to database')

		app.listen(process.env.PORT, () => {
			console.log(`Server running on port ${process.env.PORT}`)
		})
	})
	.catch((error) => {
		console.log(error)
	})
