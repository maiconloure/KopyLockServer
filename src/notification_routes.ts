import { FastifyInstance } from "fastify"
import { prisma } from "./lib/prisma"
import { z } from "zod"
import dayjs from "dayjs"
import WebPush from "web-push"

const publicKey = process.env.PUBLIC_KEY || 'abc'
const privateKey = process.env.PRIVATE_KEY || 'abc'

WebPush.setVapidDetails(
  'http://localhost:3333',
  publicKey,
  privateKey
)

export async function notificationRoutes(app: FastifyInstance) {
  app.get('/push/public_key', () => {
    return {
      publicKey
    }
  })

  app.post('/push/register', (request, reply) => {
    console.log(request.body)
    return reply.status(201).send()
  })

  app.post('/push/send', async (request, reply) => {
    console.log(request.body)
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string()
        })
      })
    })

    const  { subscription } = sendPushBody.parse(request.body)

    setTimeout(() => {
      WebPush.sendNotification(subscription, 'HELLO FROM BACK-END')
    }, 5000)

    return reply.status(201).send()
  })
}

