import { c as createServerRpc, d as getPeople, e as addPerson, u as updatePerson } from "./db.server-DaH0MpGA.js";
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
const fetchPeople_createServerFn_handler = createServerRpc({
  id: "bd25e73cf40bae7b7766887862ff195d4eb30ab810b367a3177cb07520774dc7",
  name: "fetchPeople",
  filename: "src/server/people.functions.ts"
}, (opts) => fetchPeople.__executeServer(opts));
const fetchPeople = createServerFn({
  method: "GET"
}).handler(fetchPeople_createServerFn_handler, async () => {
  return getPeople();
});
const createPerson_createServerFn_handler = createServerRpc({
  id: "f769b2ef7fd7c5828f7f8bda88930cb4a3473005b68c01fbb558bc65ebaaad6a",
  name: "createPerson",
  filename: "src/server/people.functions.ts"
}, (opts) => createPerson.__executeServer(opts));
const createPerson = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createPerson_createServerFn_handler, async ({
  data
}) => {
  const {
    generateId,
    nowISO
  } = await import("./utils-kivnevXq.js");
  const person = {
    ...data,
    id: generateId(),
    created_at: nowISO()
  };
  await addPerson(person);
  return person;
});
const editPerson_createServerFn_handler = createServerRpc({
  id: "f86da34afe7d52dbe838d69c6b064a79c3abe8d39f5ffd9b685ea6c065c14149",
  name: "editPerson",
  filename: "src/server/people.functions.ts"
}, (opts) => editPerson.__executeServer(opts));
const editPerson = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(editPerson_createServerFn_handler, async ({
  data
}) => {
  await updatePerson(data);
  return data;
});
export {
  createPerson_createServerFn_handler,
  editPerson_createServerFn_handler,
  fetchPeople_createServerFn_handler
};
