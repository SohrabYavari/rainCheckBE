import Fastify from "fastify";
import { getRoutes, patchRoutes } from "../routes/routes";
import cors from "@fastify/cors";

const server = Fastify({ logger: true });

server.register(cors, {
  origin: true,
});

// Register Routes
//? Potentially have differrent registers for different routes
//? eg. GET, POST, PATCH, DELETE
server.register(getRoutes);
server.register(patchRoutes);

export default server;
