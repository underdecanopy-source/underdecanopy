import { c as createServerRpc, g as getCanvassRecords, a as addCanvassRecord, b as addActivity } from "./db.server-DaH0MpGA.js";
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
const fetchCanvassRecords_createServerFn_handler = createServerRpc({
  id: "54a1bf143e0079e8c4047956c36b65ffe3bb83295cc85d06ad0bbce3ca2b0a49",
  name: "fetchCanvassRecords",
  filename: "src/server/canvass.functions.ts"
}, (opts) => fetchCanvassRecords.__executeServer(opts));
const fetchCanvassRecords = createServerFn({
  method: "GET"
}).handler(fetchCanvassRecords_createServerFn_handler, async () => {
  return getCanvassRecords();
});
const createCanvassRecord_createServerFn_handler = createServerRpc({
  id: "4b480d90d9c01ee56c30edb5cfab356a70bed7e035fa0ba68b88f106471500e7",
  name: "createCanvassRecord",
  filename: "src/server/canvass.functions.ts"
}, (opts) => createCanvassRecord.__executeServer(opts));
const createCanvassRecord = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createCanvassRecord_createServerFn_handler, async ({
  data
}) => {
  const {
    generateId,
    nowISO
  } = await import("./utils-kivnevXq.js");
  const record = {
    ...data,
    id: generateId(),
    created_at: nowISO()
  };
  await addCanvassRecord(record);
  await addActivity({
    id: generateId(),
    person_id: data.person_id,
    person_name: data.person_name,
    type: "canvass",
    metadata: {
      polling_unit: data.polling_unit_name,
      support_level: data.support_level
    },
    source: data.sync_status === "pending" ? "mobile" : "web",
    sync_status: data.sync_status,
    created_at: nowISO()
  });
  return record;
});
export {
  createCanvassRecord_createServerFn_handler,
  fetchCanvassRecords_createServerFn_handler
};
