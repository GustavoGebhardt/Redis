import Redis from 'ioredis'
import dotenv from 'dotenv'

dotenv.config()

const redis: Redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

redis.on('connect', () => {
    console.log('Conectado ao Redis!')
});

redis.on('error', (err) => {
    console.error('Erro ao conectar ao Redis:', err)
});

export default redis