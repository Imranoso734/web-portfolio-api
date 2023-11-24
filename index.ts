import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
const app = fastify(); // Create a fastify instance

app.get('/post', async function (request: any, reply: any) {
    const user = await prisma.user.create({
        data: {
            name: faker.internet.userName(),
            email: faker.internet.email(),
        },
    });

    // console.log(user);
    reply.send(user);
});

app.get('/', async function (request: any, reply: any) {
    const users = await prisma.user.findMany();
    // console.log(users);

    reply.send(users);
});

const start = async () => {
    try {
        await app.listen(3000);
        console.log('Server is listening on port 3000');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
