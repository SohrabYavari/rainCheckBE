// In your routes file
import { FastifyInstance } from "fastify";
import {
  getAllUsers,
  getAllEvents,
  markInviteeFlaked,
  markHostFlaked,
  getEvent,
  getEventByUser,
  postAnEvent
} from "../controllers/controllers";

export function getRoutes(fastify: FastifyInstance) {
  fastify.get("/api/users", getAllUsers);
  fastify.get("/api/events", getAllEvents);
  fastify.get("/api/events/:eventId", getEvent);
  fastify.get("/api/users/:created_by/events", getEventByUser);
}

export function patchRoutes(fastify: FastifyInstance) {
  fastify.patch("/api/events/:eventId", markInviteeFlaked || markHostFlaked);
}

export function postRoutes(fastify: FastifyInstance){
  fastify.post("/api/users/:username/events",postAnEvent);
}
