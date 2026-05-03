import { c as createServerRpc, h as getEvents, i as addEvent, j as addEventRsvp, b as addActivity } from "./db.server-DaH0MpGA.js";
import { c as createServerFn } from "../server.js";
import "@netlify/blobs";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const fetchEvents_createServerFn_handler = createServerRpc({
  id: "7381a9e2fc9322d9a0f21a365ef1d5f9e13f947719740dc9f8e5bf2367a3eba8",
  name: "fetchEvents",
  filename: "src/server/events.functions.ts"
}, (opts) => fetchEvents.__executeServer(opts));
const fetchEvents = createServerFn({
  method: "GET"
}).handler(fetchEvents_createServerFn_handler, async () => {
  return getEvents();
});
const createEvent_createServerFn_handler = createServerRpc({
  id: "4f9442a0042b93450f91ec6be484b106e71f8eae9011de4a86abca0e2dc86e5e",
  name: "createEvent",
  filename: "src/server/events.functions.ts"
}, (opts) => createEvent.__executeServer(opts));
const createEvent = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createEvent_createServerFn_handler, async ({
  data
}) => {
  const {
    generateId,
    nowISO
  } = await import("./utils-kivnevXq.js");
  const event = {
    ...data,
    id: generateId(),
    rsvp_count: 0,
    created_at: nowISO()
  };
  await addEvent(event);
  return event;
});
const rsvpToEvent_createServerFn_handler = createServerRpc({
  id: "bb65f8cf80750e757215d07a0fe0407db03cb288c25d4af0ae0bfec61688582e",
  name: "rsvpToEvent",
  filename: "src/server/events.functions.ts"
}, (opts) => rsvpToEvent.__executeServer(opts));
const rsvpToEvent = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(rsvpToEvent_createServerFn_handler, async ({
  data
}) => {
  const {
    generateId,
    nowISO
  } = await import("./utils-kivnevXq.js");
  const rsvp = {
    id: generateId(),
    event_id: data.event_id,
    person_id: data.person_id,
    person_name: data.person_name,
    created_at: nowISO()
  };
  await addEventRsvp(rsvp);
  await addActivity({
    id: generateId(),
    person_id: data.person_id,
    person_name: data.person_name,
    type: "rsvp",
    metadata: {
      event: data.event_title,
      event_id: data.event_id
    },
    source: "web",
    sync_status: "synced",
    created_at: nowISO()
  });
  return rsvp;
});
export {
  createEvent_createServerFn_handler,
  fetchEvents_createServerFn_handler,
  rsvpToEvent_createServerFn_handler
};
