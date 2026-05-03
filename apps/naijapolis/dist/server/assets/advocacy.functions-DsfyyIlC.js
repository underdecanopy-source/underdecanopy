import { c as createServerRpc, t as getAdvocacyContacts, v as addAdvocacyContact, b as addActivity } from "./db.server-DaH0MpGA.js";
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
const fetchAdvocacyContacts_createServerFn_handler = createServerRpc({
  id: "892ec7cb03bbb1ff97d69e62b76ba49f3b1cbb57fb51e321ae0eda1c989d0509",
  name: "fetchAdvocacyContacts",
  filename: "src/server/advocacy.functions.ts"
}, (opts) => fetchAdvocacyContacts.__executeServer(opts));
const fetchAdvocacyContacts = createServerFn({
  method: "GET"
}).handler(fetchAdvocacyContacts_createServerFn_handler, async () => {
  return getAdvocacyContacts();
});
const submitAdvocacyContact_createServerFn_handler = createServerRpc({
  id: "d9bb86f5977d93171d2a40cda8e4707c67de9c8e0ff12a611cf8d339ba81769e",
  name: "submitAdvocacyContact",
  filename: "src/server/advocacy.functions.ts"
}, (opts) => submitAdvocacyContact.__executeServer(opts));
const submitAdvocacyContact = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(submitAdvocacyContact_createServerFn_handler, async ({
  data
}) => {
  const {
    generateId,
    nowISO
  } = await import("./utils-kivnevXq.js");
  const contact = {
    ...data,
    id: generateId(),
    created_at: nowISO()
  };
  await addAdvocacyContact(contact);
  await addActivity({
    id: generateId(),
    person_id: data.person_id,
    person_name: data.person_name,
    type: "contact_candidate",
    metadata: {
      issue: data.issue,
      message: data.message
    },
    source: "web",
    sync_status: "synced",
    created_at: nowISO()
  });
  return contact;
});
export {
  fetchAdvocacyContacts_createServerFn_handler,
  submitAdvocacyContact_createServerFn_handler
};
