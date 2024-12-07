import express from 'express'
import cors from 'cors'
import corsOptions from './config/cors'
import routes from './routes/routes'

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.use(routes)

export default app
