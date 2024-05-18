import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

const app = express()
const port = process.env.PORT 

async function main() {
  app.use(express.json())

  app.post('/', async (req, res) => {
    try {
      const data = await prisma.user.create({
        data: req.body
      })
      res.status(200).json({ message: `Data Created successfully ${data.id}`})
    } catch (error) {
      res.status(500).json({ error_message: error})
    }
  })

  app.listen(port, () =>
    console.log(`
  🚀 Server ready at: http://localhost:${port} ⭐️`),
  )
}

main()
  .then(async () => {
    await prisma.$connect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })