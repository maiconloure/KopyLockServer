import fastify from "fastify"
import cors from "@fastify/cors"
import { appRoutes } from "./routes"
import { notificationRoutes } from "./notification_routes"

const app = fastify()

// app.register(cors, {
//   origin: ['http://localhost:5173']
// })

app.register(cors)

app.register(appRoutes)
app.register(notificationRoutes)

app.listen({
  port: 3333,
  host: '0.0.0.0'
}).then(() => {
  console.log('HTTP Server running . . .')
})
