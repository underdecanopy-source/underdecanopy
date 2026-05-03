import { c as createServerRpc, k as getActivities, b as addActivity } from "./db.server-DaH0MpGA.js";
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
const fetchActivities_createServerFn_handler = createServerRpc({
  id: "5316327dcd77e1824e8784cbc0e86c53e9dfc9d9dda416c55bb21ef66020bf2d",
  name: "fetchActivities",
  filename: "src/server/activity.functions.ts"
}, (opts) => fetchActivities.__executeServer(opts));
const fetchActivities = createServerFn({
  method: "GET"
}).handler(fetchActivities_createServerFn_handler, async () => {
  return getActivities();
});
const createActivity_createServerFn_handler = createServerRpc({
  id: "1346adc0ded71b819894ef56a8b933c7b197057cfa6d611bc4b86f266500e6a9",
  name: "createActivity",
  filename: "src/server/activity.functions.ts"
}, (opts) => createActivity.__executeServer(opts));
const createActivity = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createActivity_createServerFn_handler, async ({
  data
}) => {
  const {
    generateId,
    nowISO
  } = await import("./utils-kivnevXq.js");
  const activity = {
    ...data,
    id: generateId(),
    created_at: nowISO()
  };
  await addActivity(activity);
  return activity;
});
export {
  createActivity_createServerFn_handler,
  fetchActivities_createServerFn_handler
};
