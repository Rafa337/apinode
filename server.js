import "dotenv/config";

import { DatabasePostgres } from "./database-postgres.js";

import { fastify } from "fastify";
import {pool} from "./plugins/db.js";

const server = fastify();
server.decorate("db", pool);

const databasePostgres = new DatabasePostgres();

server.post("/videos", async(request, reply) => {
  const {title, description, duration} = request.body;

  await databasePostgres.create({
    title,
    description,
    duration,
  })

  return reply.status(201).send()
});

server.get("/videos", async(request) => {
  const search = request.query.search
  const videos = await databasePostgres.list(search);
  return videos;
});

server.put("/videos/:id", (request, reply) => {
  const videoId = request.params.id
  const {title, description, duration} = request.body;

  databasePostgres.update(videoId, {
    title,
    description,
    duration,
  })

  return reply.status(204).send()
});

server.delete("/videos/:id", (request, reply) => {
  const videoId = request.params.id

  databasePostgres.delete(videoId)

  return reply.status(204).send()
});


server.listen({
  port: process.env.PORT ?? 3000
});