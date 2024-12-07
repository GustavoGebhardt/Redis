import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/cors'
import redis from "./config/redis"
import routes from './routes/routes'

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.use(routes)

app.get("/", (req, res) => {
    //redis.set('user:1:name', 'Bob', 'EX', 60)
    redis.get('user:1:name', (err, valor) => {
        if (err) {
            console.error('Erro ao obter o valor:', err)
        } else {
            if (valor == null) {
                return res.send('Valor não encontrado');
            }
            res.send(`Valor obtido: ${valor}`)
        }
    });

    //res.send('Hello World!')
})

export default app
