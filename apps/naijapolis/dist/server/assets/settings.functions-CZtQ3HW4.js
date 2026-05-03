import { c as createServerRpc, f as getSettings, s as saveSettings } from "./db.server-DaH0MpGA.js";
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
const fetchSettings_createServerFn_handler = createServerRpc({
  id: "853a2918d78d9717ebe66955d14d2620a0538ea2ce868204ea909546afde13e1",
  name: "fetchSettings",
  filename: "src/server/settings.functions.ts"
}, (opts) => fetchSettings.__executeServer(opts));
const fetchSettings = createServerFn({
  method: "GET"
}).handler(fetchSettings_createServerFn_handler, async () => {
  return getSettings();
});
const updateSettings_createServerFn_handler = createServerRpc({
  id: "778a68837382a39ca4ed674c5b0220a2a81d2904c04c178e7a9d7312ddcc8a2e",
  name: "updateSettings",
  filename: "src/server/settings.functions.ts"
}, (opts) => updateSettings.__executeServer(opts));
const updateSettings = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(updateSettings_createServerFn_handler, async ({
  data
}) => {
  await saveSettings(data);
  return data;
});
export {
  fetchSettings_createServerFn_handler,
  updateSettings_createServerFn_handler
};
