// Require the framework and instantiate it

// ESM
import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient()

const fastify = Fastify({
    logger: true
})

// Declare a route
fastify.get('/post', async function (request, reply) {
    const user = await prisma.user.create({
        data: {
            name: faker.internet.userName(),
            email: faker.internet.email(),
        },
    })
    console.log(user)

    reply.send(user)
})

// Declare a route
fastify.get('/', async function (request, reply) {
    const users = await prisma.user.findMany()
    console.log(users)

    reply.send(users)
    // reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // Server is now listening on ${address}
})