"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
const app = (0, fastify_1.default)(); // Create a fastify instance
app.get('/post', function (request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: {
                name: faker_1.faker.internet.userName(),
                email: faker_1.faker.internet.email(),
            },
        });
        // console.log(user);
        reply.send(user);
    });
});
app.get('/', function (request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma.user.findMany();
        // console.log(users);
        reply.send(users);
    });
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield app.listen(3000);
        console.log('Server is listening on port 3000');
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
});
start();
