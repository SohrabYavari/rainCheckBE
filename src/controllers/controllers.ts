import { FastifyReply, FastifyRequest } from "fastify";
import {
  fetchUsers,
  fetchEvents,
  inviteeFlaked,
  hostFlaked,
  fetchSpecificEvent,
  fetchEventByUser,
} from "../models/models";
import { TEventsData, TUsersData } from "../types/TData";
import { addEvent } from "../models/models";


//! GET ENDPOINTS 
export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users = await fetchUsers();

    if (!users) {
      return reply.status(404).send({ message: "No users found" });
    }

    return reply.send({ users });
  } catch (err) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}

export async function getAllEvents(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const events = await fetchEvents();

    if (!events) {
      return reply.status(404).send({ message: "No events found" });
    }

    return reply.send({ events });
  } catch (err) {
    return reply.status(500).send({ message: "Internal Server Error" });
  }
}

export async function getEvent(
  request: FastifyRequest<{ Params: TEventsData }>,
  reply: FastifyReply
) {
  const { event_id } = request.params;
  const event = await fetchSpecificEvent(event_id);
  return reply.send({ event });
}

export async function getEventByUser(
  request: FastifyRequest<{ Params: TEventsData }>,
  reply: FastifyReply
) {
  const { created_by } = request.params;
  const events_by_user = await fetchEventByUser(created_by);
  return reply.send({ events_by_user });
}

export async function markInviteeFlaked(
  request: FastifyRequest<{ Params: TEventsData }>,
  reply: FastifyReply
) {
  const { event_id } = request.params;
  const result = await inviteeFlaked(event_id);
  return reply.code(201).send({ success: true, data: result });
}

export async function markHostFlaked(
  request: FastifyRequest<{ Params: TEventsData }>,
  reply: FastifyReply
) {
  const { event_id } = request.params;
  const result = await hostFlaked(event_id);
  return reply.code(201).send({ success: true, data: result });
}

export async function postAnEvent(
  request: FastifyRequest<{ Body: TEventsData }>,
  reply: FastifyReply
) {
  const {
    title,
    description,
    date,
    location,
    created_by,
    invited,
    host_flaked,
    invitee_flaked,
  } = request.body;

  const event = await addEvent(
    title,
    description,
    date,
    location,
    created_by,
    invited,
    host_flaked,
    invitee_flaked
  );
  return reply.code(201).send({ event });
}
