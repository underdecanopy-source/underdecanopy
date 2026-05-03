import { c as createServerRpc, l as getTransactions, m as getPledges, n as getFundraisers, o as addTransaction, b as addActivity, p as addPledge } from "./db.server-DaH0MpGA.js";
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
const fetchFinanceData_createServerFn_handler = createServerRpc({
  id: "f3a373cf8f49aa9bca4a5c2f47228a9f08d0ffb1e1343654b9a3060e372669bc",
  name: "fetchFinanceData",
  filename: "src/server/finance.functions.ts"
}, (opts) => fetchFinanceData.__executeServer(opts));
const fetchFinanceData = createServerFn({
  method: "GET"
}).handler(fetchFinanceData_createServerFn_handler, async () => {
  const [transactions, pledges, fundraisers] = await Promise.all([getTransactions(), getPledges(), getFundraisers()]);
  return {
    transactions,
    pledges,
    fundraisers
  };
});
const createDonation_createServerFn_handler = createServerRpc({
  id: "b6d57d20754b73f809e9b213d91f52cf080cec115b890d9822bd6ebfc6cb1d84",
  name: "createDonation",
  filename: "src/server/finance.functions.ts"
}, (opts) => createDonation.__executeServer(opts));
const createDonation = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createDonation_createServerFn_handler, async ({
  data
}) => {
  const {
    generateId,
    nowISO
  } = await import("./utils-kivnevXq.js");
  const tx = {
    id: generateId(),
    ...data,
    status: "success",
    reference: `REF-${Date.now()}`,
    created_at: nowISO()
  };
  await addTransaction(tx);
  await addActivity({
    id: generateId(),
    person_id: data.person_id,
    person_name: data.person_name,
    type: "donation",
    metadata: {
      amount: data.amount,
      channel: data.channel
    },
    source: "web",
    sync_status: "synced",
    created_at: nowISO()
  });
  return tx;
});
const createPledge_createServerFn_handler = createServerRpc({
  id: "ce0acc116cb9a7d2918b72b1dc8c72deae1aefafbe04894b2b97d9a45ee28199",
  name: "createPledge",
  filename: "src/server/finance.functions.ts"
}, (opts) => createPledge.__executeServer(opts));
const createPledge = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createPledge_createServerFn_handler, async ({
  data
}) => {
  const {
    generateId,
    nowISO
  } = await import("./utils-kivnevXq.js");
  const pledge = {
    ...data,
    id: generateId(),
    fulfilled: false,
    created_at: nowISO()
  };
  await addPledge(pledge);
  await addActivity({
    id: generateId(),
    person_id: data.person_id,
    person_name: data.person_name,
    type: "pledge",
    metadata: {
      amount: data.amount,
      due_date: data.due_date
    },
    source: "web",
    sync_status: "synced",
    created_at: nowISO()
  });
  return pledge;
});
export {
  createDonation_createServerFn_handler,
  createPledge_createServerFn_handler,
  fetchFinanceData_createServerFn_handler
};
