import { c as createServerRpc, q as getGoals, r as updateGoalValue } from "./db.server-DaH0MpGA.js";
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
const fetchGoals_createServerFn_handler = createServerRpc({
  id: "2607e4ba2e4d005f7d0647f5f5c8d6ec6869eee1fec1a912ceff2b98e4f47040",
  name: "fetchGoals",
  filename: "src/server/goals.functions.ts"
}, (opts) => fetchGoals.__executeServer(opts));
const fetchGoals = createServerFn({
  method: "GET"
}).handler(fetchGoals_createServerFn_handler, async () => {
  return getGoals();
});
const updateGoal_createServerFn_handler = createServerRpc({
  id: "0d8e00e52405997e9ea155fed38b8b9115ffd7c92520b5a2306e82a30768c1bd",
  name: "updateGoal",
  filename: "src/server/goals.functions.ts"
}, (opts) => updateGoal.__executeServer(opts));
const updateGoal = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(updateGoal_createServerFn_handler, async ({
  data
}) => {
  await updateGoalValue(data.id, data.current_value);
  return {
    success: true
  };
});
export {
  fetchGoals_createServerFn_handler,
  updateGoal_createServerFn_handler
};
