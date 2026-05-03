import { useRouterState, Link, createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, createRouter } from "@tanstack/react-router";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { X, Menu, Flag, Activity, Users, DollarSign, Calendar, Target, Map, Megaphone, Settings, CheckCircle, Plus, Search, Phone, Mail, Clock, TrendingUp, AlertCircle, MapPin, MessageSquare, Filter, Heart, UserPlus } from "lucide-react";
import { useState } from "react";
import { cn, formatDate, formatCurrency, formatRelative } from "./utils-kivnevXq.js";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
const navItems = [
  { to: "/", label: "Activity Feed", icon: Activity, exact: true },
  { to: "/people", label: "People", icon: Users },
  { to: "/finance", label: "Finance", icon: DollarSign },
  { to: "/events", label: "Events", icon: Calendar },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/canvassing", label: "Canvassing", icon: Map },
  { to: "/advocacy", label: "Advocacy", icon: Megaphone },
  { to: "/settings", label: "Settings", icon: Settings }
];
function NavLink({ item, onClick }) {
  const { location } = useRouterState();
  const isActive = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: item.to,
      onClick,
      className: cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
        isActive ? "bg-green-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
      ),
      children: [
        /* @__PURE__ */ jsx(item.icon, { className: "w-4 h-4 flex-shrink-0" }),
        item.label
      ]
    }
  );
}
function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen bg-gray-100 overflow-hidden", children: [
    /* @__PURE__ */ jsx("aside", { className: "hidden lg:flex flex-col w-60 bg-gray-900 flex-shrink-0", children: /* @__PURE__ */ jsx(SidebarContent, {}) }),
    mobileOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-40 lg:hidden", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-black/60",
          onClick: () => setMobileOpen(false)
        }
      ),
      /* @__PURE__ */ jsxs("aside", { className: "relative flex flex-col w-60 h-full bg-gray-900 z-50", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setMobileOpen(false),
            className: "absolute top-4 right-4 text-gray-400 hover:text-white",
            children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx(SidebarContent, { onNavClick: () => setMobileOpen(false) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("header", { className: "lg:hidden flex items-center gap-3 px-4 py-3 bg-gray-900 text-white flex-shrink-0", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setMobileOpen(true), children: /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-green-400", children: "PoliForge OS" })
      ] }),
      /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-y-auto", children })
    ] })
  ] });
}
function SidebarContent({ onNavClick }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-4 py-5 border-b border-gray-700", children: [
      /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Flag, { className: "w-4 h-4 text-white" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-bold text-white text-sm", children: "PoliForge OS" }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Campaign Platform" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "flex-1 px-3 py-4 space-y-1 overflow-y-auto", children: navItems.map((item) => /* @__PURE__ */ jsx(NavLink, { item, onClick: onNavClick }, item.to)) }),
    /* @__PURE__ */ jsx("div", { className: "px-4 py-3 border-t border-gray-700", children: /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "🇳🇬 Built for Nigeria" }) })
  ] });
}
const Route$8 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NaijaPolis Campaign Platform for Nigeria" }
    ]
  }),
  shellComponent: RootDocument,
  component: RootComponent
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const fetchSettings = createServerFn({
  method: "GET"
}).handler(createSsrRpc("853a2918d78d9717ebe66955d14d2620a0538ea2ce868204ea909546afde13e1"));
const updateSettings = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("778a68837382a39ca4ed674c5b0220a2a81d2904c04c178e7a9d7312ddcc8a2e"));
const Route$7 = createFileRoute("/settings")({
  loader: async () => fetchSettings(),
  component: SettingsPage
});
const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara"
];
function SettingsPage() {
  const initial = Route$7.useLoaderData();
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  function field(key) {
    return {
      value: form[key],
      onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
    };
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await updateSettings({ data: form });
      setSaved(true);
      setTimeout(() => setSaved(false), 3e3);
    } catch {
      setError("Failed to save settings. Try again.");
    } finally {
      setSaving(false);
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Settings" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-0.5", children: "Campaign configuration and defaults" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-5", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Settings, { className: "w-4 h-4" }),
          " Campaign Information"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Campaign Name" }),
            /* @__PURE__ */ jsx("input", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500", ...field("campaign_name"), placeholder: "e.g. Okonkwo 2027 Campaign" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Candidate Name" }),
            /* @__PURE__ */ jsx("input", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500", ...field("candidate_name"), placeholder: "e.g. Hon. Emeka Okonkwo" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Political Party" }),
            /* @__PURE__ */ jsx("input", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500", ...field("party"), placeholder: "e.g. APC, PDP, Labour" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4", children: "Location" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "State" }),
            /* @__PURE__ */ jsx("select", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500", ...field("state"), children: NIGERIAN_STATES.map((s) => /* @__PURE__ */ jsx("option", { value: s, children: s }, s)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "LGA" }),
            /* @__PURE__ */ jsx("input", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500", ...field("lga"), placeholder: "e.g. Surulere" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4", children: "Payment & Localization" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Payment Provider" }),
            /* @__PURE__ */ jsxs("select", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500", ...field("payment_provider"), children: [
              /* @__PURE__ */ jsx("option", { value: "paystack", children: "Paystack" }),
              /* @__PURE__ */ jsx("option", { value: "flutterwave", children: "Flutterwave" }),
              /* @__PURE__ */ jsx("option", { value: "both", children: "Both" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Currency" }),
            /* @__PURE__ */ jsxs("select", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500", ...field("currency"), children: [
              /* @__PURE__ */ jsx("option", { value: "NGN", children: "NGN (Nigerian Naira ₦)" }),
              /* @__PURE__ */ jsx("option", { value: "USD", children: "USD (US Dollar $)" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Timezone" }),
            /* @__PURE__ */ jsxs("select", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500", ...field("timezone"), children: [
              /* @__PURE__ */ jsx("option", { value: "Africa/Lagos", children: "Africa/Lagos (WAT, UTC+1)" }),
              /* @__PURE__ */ jsx("option", { value: "UTC", children: "UTC" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 border border-gray-200 rounded-xl p-5", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3", children: "USSD Fallback" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-2", children: "USSD support via Africa's Talking enables field agents to log visits and support data with basic mobile phones — no smartphone or internet required." }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 text-green-400 font-mono text-xs rounded-lg p-3 space-y-1", children: [
          /* @__PURE__ */ jsx("p", { children: "*123# → PoliForge Menu" }),
          /* @__PURE__ */ jsx("p", { children: "1. Log Visit" }),
          /* @__PURE__ */ jsx("p", { children: "2. Add Supporter" }),
          /* @__PURE__ */ jsx("p", { children: "3. Report Issue" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Configure your Africa's Talking USSD shortcode in your Netlify environment variables." })
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: saving,
            className: "px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50 transition-colors",
            children: saving ? "Saving..." : "Save Settings"
          }
        ),
        saved && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-sm text-green-700 font-medium", children: [
          /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4" }),
          " Settings saved!"
        ] })
      ] })
    ] })
  ] });
}
const fetchPeople = createServerFn({
  method: "GET"
}).handler(createSsrRpc("bd25e73cf40bae7b7766887862ff195d4eb30ab810b367a3177cb07520774dc7"));
const createPerson = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("f769b2ef7fd7c5828f7f8bda88930cb4a3473005b68c01fbb558bc65ebaaad6a"));
createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("f86da34afe7d52dbe838d69c6b064a79c3abe8d39f5ffd9b685ea6c065c14149"));
const POLLING_UNITS = [
  { id: "pu-1", pu_code: "04/05/001/001", name: "Surulere Ward 1 PU A", ward: "Surulere", lga: "Surulere", state: "Lagos" },
  { id: "pu-2", pu_code: "04/05/001/002", name: "Surulere Ward 1 PU B", ward: "Surulere", lga: "Surulere", state: "Lagos" },
  { id: "pu-3", pu_code: "01/01/001/001", name: "Garki Area 1 PU A", ward: "Garki", lga: "Municipal Area Council", state: "FCT Abuja" },
  { id: "pu-4", pu_code: "19/01/001/001", name: "Kano Central PU A", ward: "Kano Central", lga: "Kano Municipal", state: "Kano" },
  { id: "pu-5", pu_code: "17/01/001/001", name: "Ibadan North PU A", ward: "Ibadan North", lga: "Ibadan North", state: "Oyo" },
  { id: "pu-6", pu_code: "32/01/001/001", name: "Port Harcourt City PU A", ward: "Central", lga: "Port Harcourt", state: "Rivers" }
];
const Route$6 = createFileRoute("/people")({
  loader: async () => fetchPeople(),
  component: PeoplePage
});
const TAG_COLORS = {
  volunteer: "bg-teal-100 text-teal-700",
  donor: "bg-green-100 text-green-700",
  supporter: "bg-blue-100 text-blue-700",
  canvasser: "bg-purple-100 text-purple-700",
  ward_coordinator: "bg-amber-100 text-amber-700"
};
function AddPersonModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    polling_unit_id: "",
    tags: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.full_name || !form.phone) {
      setError("Name and phone are required");
      return;
    }
    setLoading(true);
    try {
      const person = await createPerson({
        data: {
          full_name: form.full_name,
          phone: form.phone,
          email: form.email || void 0,
          polling_unit_id: form.polling_unit_id || void 0,
          tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
          custom_fields: {}
        }
      });
      onSuccess(person);
      onClose();
    } catch {
      setError("Failed to add person. Try again.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-xl w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-5 border-b", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Add Person" }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Full Name *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500",
            value: form.full_name,
            onChange: (e) => setForm((f) => ({ ...f, full_name: e.target.value })),
            placeholder: "e.g. Emeka Okonkwo",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Phone Number *" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500",
            value: form.phone,
            onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
            placeholder: "+2348012345678",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500",
            value: form.email,
            onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
            placeholder: "optional"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Polling Unit" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500",
            value: form.polling_unit_id,
            onChange: (e) => setForm((f) => ({ ...f, polling_unit_id: e.target.value })),
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select polling unit..." }),
              POLLING_UNITS.map((pu) => /* @__PURE__ */ jsxs("option", { value: pu.id, children: [
                pu.pu_code,
                " — ",
                pu.name
              ] }, pu.id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Tags" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500",
            value: form.tags,
            onChange: (e) => setForm((f) => ({ ...f, tags: e.target.value })),
            placeholder: "volunteer, donor (comma separated)"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50", children: loading ? "Saving..." : "Add Person" })
      ] })
    ] })
  ] }) });
}
function PeoplePage() {
  const initial = Route$6.useLoaderData();
  const [people, setPeople] = useState(initial);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const filtered = people.filter(
    (p) => p.full_name.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search) || (p.email ?? "").toLowerCase().includes(search.toLowerCase())
  );
  function getPuName(id) {
    return POLLING_UNITS.find((pu) => pu.id === id)?.name ?? "—";
  }
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "People" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 mt-0.5", children: [
          people.length,
          " supporters in database"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setShowAdd(true),
          className: "flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            "Add Person"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative mb-4", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500",
          placeholder: "Search by name, phone, or email...",
          value: search,
          onChange: (e) => setSearch(e.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-xl shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b bg-gray-50", children: [
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600", children: "Name" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell", children: "Contact" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell", children: "Polling Unit" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell", children: "Tags" }),
        /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell", children: "Added" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: filtered.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsxs("td", { colSpan: 5, className: "text-center py-12 text-gray-400", children: [
        /* @__PURE__ */ jsx(Users, { className: "w-8 h-8 mx-auto mb-2 opacity-30" }),
        "No people found"
      ] }) }) : filtered.map((person) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50 transition-colors", children: [
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-semibold text-xs flex-shrink-0", children: person.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2) }),
          /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: person.full_name })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-gray-600", children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-3 h-3" }),
            person.phone
          ] }),
          person.email && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 text-gray-500 text-xs", children: [
            /* @__PURE__ */ jsx(Mail, { className: "w-3 h-3" }),
            person.email
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 hidden md:table-cell text-gray-600", children: getPuName(person.polling_unit_id) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 hidden lg:table-cell", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: person.tags.map((tag) => /* @__PURE__ */ jsx(
          "span",
          {
            className: cn("px-2 py-0.5 rounded text-xs font-medium", TAG_COLORS[tag] ?? "bg-gray-100 text-gray-600"),
            children: tag.replace("_", " ")
          },
          tag
        )) }) }),
        /* @__PURE__ */ jsx("td", { className: "px-4 py-3 hidden lg:table-cell text-gray-500", children: formatDate(person.created_at) })
      ] }, person.id)) })
    ] }) }),
    showAdd && /* @__PURE__ */ jsx(
      AddPersonModal,
      {
        onClose: () => setShowAdd(false),
        onSuccess: (p) => setPeople((prev) => [...prev, p])
      }
    )
  ] });
}
const fetchGoals = createServerFn({
  method: "GET"
}).handler(createSsrRpc("2607e4ba2e4d005f7d0647f5f5c8d6ec6869eee1fec1a912ceff2b98e4f47040"));
createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("0d8e00e52405997e9ea155fed38b8b9115ffd7c92520b5a2306e82a30768c1bd"));
const Route$5 = createFileRoute("/goals")({
  loader: async () => fetchGoals(),
  component: GoalsPage
});
const GOAL_CONFIG = {
  donation: { icon: DollarSign, color: "text-green-700", bg: "bg-green-600", unit: "₦" },
  volunteers: { icon: Users, color: "text-blue-700", bg: "bg-blue-600", unit: "" },
  canvass: { icon: Map, color: "text-purple-700", bg: "bg-purple-600", unit: "" },
  rsvp: { icon: Calendar, color: "text-amber-700", bg: "bg-amber-600", unit: "" }
};
function GoalCard({ goal }) {
  const cfg = GOAL_CONFIG[goal.type];
  const pct = Math.min(100, Math.round(goal.current_value / goal.target * 100));
  const displayValue = goal.type === "donation" ? formatCurrency(goal.current_value) : goal.current_value.toLocaleString();
  const displayTarget = goal.type === "donation" ? formatCurrency(goal.target) : goal.target.toLocaleString();
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: cn("w-10 h-10 rounded-lg flex items-center justify-center", cfg.bg), children: /* @__PURE__ */ jsx(cfg.icon, { className: "w-5 h-5 text-white" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900", children: goal.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: goal.description })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: cn("text-2xl font-bold", cfg.color), children: [
        pct,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-100 rounded-full h-3 mb-2", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: cn("h-3 rounded-full transition-all duration-500", cfg.bg),
        style: { width: `${pct}%` }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-700", children: displayValue }),
      /* @__PURE__ */ jsxs("span", { className: "text-gray-400", children: [
        "of ",
        displayTarget
      ] })
    ] }),
    pct >= 100 && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-1.5 text-sm text-green-700 font-medium", children: [
      /* @__PURE__ */ jsx("span", { children: "🎉" }),
      " Goal achieved!"
    ] }),
    pct >= 75 && pct < 100 && /* @__PURE__ */ jsxs("div", { className: "mt-3 text-xs text-amber-600 font-medium", children: [
      "Almost there — ",
      100 - pct,
      "% to go!"
    ] })
  ] });
}
function GoalsPage() {
  const goals = Route$5.useLoaderData();
  const totalGoals = goals.length;
  const achieved = goals.filter((g) => g.current_value >= g.target).length;
  const inProgress = goals.filter((g) => g.current_value > 0 && g.current_value < g.target).length;
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Goals" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-0.5", children: "Track campaign targets and progress" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-4 mb-6", children: [
      { label: "Total Goals", value: totalGoals, color: "text-gray-700" },
      { label: "Achieved", value: achieved, color: "text-green-700" },
      { label: "In Progress", value: inProgress, color: "text-amber-700" }
    ].map((s) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-4 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: cn("text-2xl font-bold", s.color), children: s.value }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: s.label })
    ] }, s.label)) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: goals.map((goal) => /* @__PURE__ */ jsx(GoalCard, { goal }, goal.id)) }),
    goals.length === 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-12 text-center", children: [
      /* @__PURE__ */ jsx(Target, { className: "w-12 h-12 mx-auto mb-3 text-gray-200" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "No goals set. Create your first campaign target." })
    ] })
  ] });
}
const fetchFinanceData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("f3a373cf8f49aa9bca4a5c2f47228a9f08d0ffb1e1343654b9a3060e372669bc"));
const createDonation = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("b6d57d20754b73f809e9b213d91f52cf080cec115b890d9822bd6ebfc6cb1d84"));
createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("ce0acc116cb9a7d2918b72b1dc8c72deae1aefafbe04894b2b97d9a45ee28199"));
const finance_functions = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createDonation,
  fetchFinanceData
}, Symbol.toStringTag, { value: "Module" }));
const Route$4 = createFileRoute("/finance")({
  loader: async () => {
    const [finance, people] = await Promise.all([fetchFinanceData(), fetchPeople()]);
    return { ...finance, people };
  },
  component: FinancePage
});
function StatCard({ label, value, sub, icon: Icon, color }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-5 flex items-center gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: cn("w-12 h-12 rounded-xl flex items-center justify-center", color), children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-white" }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: label }),
      /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-gray-900", children: value }),
      sub && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: sub })
    ] })
  ] });
}
function DonationModal$1({ people, onClose, onSuccess }) {
  const [form, setForm] = useState({ person_id: "", amount: "", channel: "paystack" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const person = people.find((p) => p.id === form.person_id);
    if (!person || !form.amount) {
      setError("All fields required");
      return;
    }
    setLoading(true);
    try {
      await createDonation({ data: { person_id: person.id, person_name: person.full_name, amount: parseInt(form.amount, 10), channel: form.channel } });
      onSuccess();
      onClose();
    } catch {
      setError("Failed. Try again.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-xl w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-5 border-b", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "New Donation" }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-gray-400" }) })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Donor" }),
        /* @__PURE__ */ jsxs("select", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm", value: form.person_id, onChange: (e) => setForm((f) => ({ ...f, person_id: e.target.value })), required: true, children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Select donor..." }),
          people.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.full_name }, p.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Amount (₦)" }),
        /* @__PURE__ */ jsx("input", { type: "number", min: "1", className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm", placeholder: "e.g. 50000", value: form.amount, onChange: (e) => setForm((f) => ({ ...f, amount: e.target.value })), required: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Channel" }),
        /* @__PURE__ */ jsxs("select", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm", value: form.channel, onChange: (e) => setForm((f) => ({ ...f, channel: e.target.value })), children: [
          /* @__PURE__ */ jsx("option", { value: "paystack", children: "Paystack" }),
          /* @__PURE__ */ jsx("option", { value: "flutterwave", children: "Flutterwave" }),
          /* @__PURE__ */ jsx("option", { value: "bank_transfer", children: "Bank Transfer" }),
          /* @__PURE__ */ jsx("option", { value: "cash", children: "Cash" })
        ] })
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50", children: loading ? "Saving..." : "Record Donation" })
      ] })
    ] })
  ] }) });
}
function FinancePage() {
  const { transactions: initTx, pledges: initPl, fundraisers, people } = Route$4.useLoaderData();
  const [transactions, setTransactions] = useState(initTx);
  const [pledges] = useState(initPl);
  const [activeTab, setActiveTab] = useState("transactions");
  const [showDonation, setShowDonation] = useState(false);
  const totalRaised = transactions.filter((t) => t.status === "success").reduce((s, t) => s + t.amount, 0);
  const pendingAmount = transactions.filter((t) => t.status === "pending").reduce((s, t) => s + t.amount, 0);
  const pledgeTotal = pledges.filter((p) => !p.fulfilled).reduce((s, p) => s + p.amount, 0);
  async function refresh() {
    const { fetchFinanceData: ff } = await Promise.resolve().then(() => finance_functions);
    const data = await ff();
    setTransactions(data.transactions);
  }
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Finance" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-0.5", children: "Donations, pledges, and fundraisers" })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setShowDonation(true), className: "flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
        " New Donation"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Total Raised", value: formatCurrency(totalRaised), sub: `${transactions.filter((t) => t.status === "success").length} transactions`, icon: DollarSign, color: "bg-green-600" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Pending", value: formatCurrency(pendingAmount), sub: "awaiting confirmation", icon: Clock, color: "bg-amber-500" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Pledged", value: formatCurrency(pledgeTotal), sub: `${pledges.filter((p) => !p.fulfilled).length} unfulfilled`, icon: TrendingUp, color: "bg-blue-500" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "flex border-b", children: ["transactions", "pledges", "fundraisers"].map((tab) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveTab(tab),
          className: cn("px-5 py-3 text-sm font-medium capitalize transition-colors", activeTab === tab ? "border-b-2 border-green-600 text-green-700" : "text-gray-500 hover:text-gray-700"),
          children: tab
        },
        tab
      )) }),
      activeTab === "transactions" && /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b bg-gray-50", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600", children: "Donor" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600", children: "Amount" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell", children: "Channel" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600", children: "Status" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell", children: "Date" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: transactions.map((tx) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-gray-900", children: tx.person_name }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-semibold text-green-700", children: formatCurrency(tx.amount) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-gray-500 capitalize hidden sm:table-cell", children: tx.channel.replace("_", " ") }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxs("span", { className: cn("flex items-center gap-1 text-xs font-medium", tx.status === "success" ? "text-green-700" : tx.status === "pending" ? "text-amber-600" : "text-red-600"), children: [
            tx.status === "success" ? /* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3" }),
            tx.status
          ] }) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-gray-500 hidden md:table-cell", children: formatDate(tx.created_at) })
        ] }, tx.id)) })
      ] }),
      activeTab === "pledges" && /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b bg-gray-50", children: [
          /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600", children: "Person" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600", children: "Amount" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell", children: "Due Date" }),
          /* @__PURE__ */ jsx("th", { className: "text-left px-4 py-3 font-semibold text-gray-600", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: pledges.map((pledge) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50", children: [
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-gray-900", children: pledge.person_name }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-semibold text-indigo-700", children: formatCurrency(pledge.amount) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-gray-500 hidden sm:table-cell", children: formatDate(pledge.due_date) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsx("span", { className: cn("text-xs font-medium px-2 py-1 rounded", pledge.fulfilled ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"), children: pledge.fulfilled ? "Fulfilled" : "Pending" }) })
        ] }, pledge.id)) })
      ] }),
      activeTab === "fundraisers" && /* @__PURE__ */ jsx("div", { className: "p-4 grid gap-4", children: fundraisers.map((f) => {
        const raised = transactions.filter((t) => t.fundraiser_id === f.id && t.status === "success").reduce((s, t) => s + t.amount, 0);
        const pct = Math.min(100, Math.round(raised / f.goal_amount * 100));
        return /* @__PURE__ */ jsxs("div", { className: "border border-gray-200 rounded-lg p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900", children: f.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: f.description })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold text-green-700", children: [
              pct,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-200 rounded-full h-2 mb-1", children: /* @__PURE__ */ jsx("div", { className: "bg-green-600 h-2 rounded-full transition-all", style: { width: `${pct}%` } }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-gray-500", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              formatCurrency(raised),
              " raised"
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Goal: ",
              formatCurrency(f.goal_amount)
            ] })
          ] })
        ] }, f.id);
      }) })
    ] }),
    showDonation && /* @__PURE__ */ jsx(DonationModal$1, { people, onClose: () => setShowDonation(false), onSuccess: refresh })
  ] });
}
const fetchEvents = createServerFn({
  method: "GET"
}).handler(createSsrRpc("7381a9e2fc9322d9a0f21a365ef1d5f9e13f947719740dc9f8e5bf2367a3eba8"));
const createEvent = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("4f9442a0042b93450f91ec6be484b106e71f8eae9011de4a86abca0e2dc86e5e"));
const rsvpToEvent = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("bb65f8cf80750e757215d07a0fe0407db03cb288c25d4af0ae0bfec61688582e"));
const Route$3 = createFileRoute("/events")({
  loader: async () => {
    const [events, people] = await Promise.all([fetchEvents(), fetchPeople()]);
    return { events, people };
  },
  component: EventsPage
});
function CreateEventModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ title: "", description: "", location: "", date: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!form.title || !form.date || !form.location) {
      setError("Title, location and date required");
      return;
    }
    setLoading(true);
    try {
      const event = await createEvent({ data: { ...form, date: new Date(form.date).toISOString() } });
      onSuccess(event);
      onClose();
    } catch {
      setError("Failed. Try again.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-xl w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-5 border-b", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Create Event" }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-gray-400" }) })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Event Title *" }),
        /* @__PURE__ */ jsx("input", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm", value: form.title, onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })), placeholder: "e.g. Campaign Rally - Lagos", required: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Description" }),
        /* @__PURE__ */ jsx("textarea", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm", rows: 2, value: form.description, onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })), placeholder: "Brief description..." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Location *" }),
        /* @__PURE__ */ jsx("input", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm", value: form.location, onChange: (e) => setForm((f) => ({ ...f, location: e.target.value })), placeholder: "e.g. Tafawa Balewa Square, Lagos", required: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Date & Time *" }),
        /* @__PURE__ */ jsx("input", { type: "datetime-local", className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm", value: form.date, onChange: (e) => setForm((f) => ({ ...f, date: e.target.value })), required: true })
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-50", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50", children: loading ? "Creating..." : "Create Event" })
      ] })
    ] })
  ] }) });
}
function RsvpModal({ event, people, onClose, onSuccess }) {
  const [personId, setPersonId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const person = people.find((p) => p.id === personId);
    if (!person) {
      setError("Select a person");
      return;
    }
    setLoading(true);
    try {
      await rsvpToEvent({ data: { event_id: event.id, event_title: event.title, person_id: person.id, person_name: person.full_name } });
      onSuccess();
      onClose();
    } catch {
      setError("Failed. Try again.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-xl w-full max-w-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-5 border-b", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold", children: [
        "RSVP: ",
        event.title
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-gray-400" }) })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxs("select", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm", value: personId, onChange: (e) => setPersonId(e.target.value), required: true, children: [
        /* @__PURE__ */ jsx("option", { value: "", children: "Select person..." }),
        people.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.full_name }, p.id))
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "flex-1 bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50", children: loading ? "Saving..." : "RSVP" })
      ] })
    ] })
  ] }) });
}
function EventsPage() {
  const { events: initial, people } = Route$3.useLoaderData();
  const [events, setEvents] = useState(initial);
  const [showCreate, setShowCreate] = useState(false);
  const [rsvpEvent, setRsvpEvent] = useState(null);
  function isUpcoming(e) {
    return new Date(e.date) >= /* @__PURE__ */ new Date();
  }
  async function refreshEvents() {
    const updated = await fetchEvents();
    setEvents(updated);
  }
  const upcoming = events.filter(isUpcoming);
  const past = events.filter((e) => !isUpcoming(e));
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Events" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
          upcoming.length,
          " upcoming, ",
          past.length,
          " past"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setShowCreate(true), className: "flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
        " Create Event"
      ] })
    ] }),
    upcoming.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3", children: "Upcoming" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: upcoming.map((event) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-5 flex items-start gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-12 h-12 bg-purple-100 rounded-lg flex flex-col items-center justify-center flex-shrink-0", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-purple-700", children: new Date(event.date).toLocaleDateString("en-NG", { month: "short" }).toUpperCase() }),
          /* @__PURE__ */ jsx("span", { className: "text-lg font-bold text-purple-700 leading-none", children: new Date(event.date).getDate() })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-gray-900", children: event.title }),
          event.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-0.5", children: event.description }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3 mt-2 text-xs text-gray-500", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(MapPin, { className: "w-3 h-3" }),
              event.location
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Users, { className: "w-3 h-3" }),
              event.rsvp_count,
              " RSVPs"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3" }),
              formatDate(event.date)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setRsvpEvent(event), className: "flex-shrink-0 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700", children: "RSVP" })
      ] }, event.id)) })
    ] }),
    past.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3", children: "Past Events" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: past.map((event) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 opacity-70", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(Calendar, { className: "w-5 h-5 text-gray-400" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium text-gray-700", children: event.title }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-400", children: [
            event.location,
            " · ",
            event.rsvp_count,
            " attended"
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: formatDate(event.date) })
      ] }, event.id)) })
    ] }),
    events.length === 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-12 text-center", children: [
      /* @__PURE__ */ jsx(Calendar, { className: "w-12 h-12 mx-auto mb-3 text-gray-200" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "No events yet. Create your first campaign event." })
    ] }),
    showCreate && /* @__PURE__ */ jsx(CreateEventModal, { onClose: () => setShowCreate(false), onSuccess: (e) => {
      setEvents((prev) => [...prev, e]);
      setShowCreate(false);
    } }),
    rsvpEvent && /* @__PURE__ */ jsx(RsvpModal, { event: rsvpEvent, people, onClose: () => setRsvpEvent(null), onSuccess: refreshEvents })
  ] });
}
const fetchCanvassRecords = createServerFn({
  method: "GET"
}).handler(createSsrRpc("54a1bf143e0079e8c4047956c36b65ffe3bb83295cc85d06ad0bbce3ca2b0a49"));
const createCanvassRecord = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("4b480d90d9c01ee56c30edb5cfab356a70bed7e035fa0ba68b88f106471500e7"));
const Route$2 = createFileRoute("/canvassing")({
  loader: async () => {
    const [records, people] = await Promise.all([fetchCanvassRecords(), fetchPeople()]);
    return { records, people };
  },
  component: CanvassingPage
});
const SUPPORT_CONFIG = {
  strong: { label: "Strong Support", color: "text-green-700", bg: "bg-green-100" },
  lean: { label: "Leaning", color: "text-teal-700", bg: "bg-teal-100" },
  neutral: { label: "Neutral", color: "text-amber-700", bg: "bg-amber-100" },
  opposed: { label: "Opposed", color: "text-red-700", bg: "bg-red-100" }
};
function LogCanvassModal({ people, onClose, onSuccess }) {
  const [form, setForm] = useState({
    person_id: "",
    polling_unit_id: "",
    agent_name: "",
    support_level: "strong",
    notes: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const person = people.find((p) => p.id === form.person_id);
    const pu = POLLING_UNITS.find((u) => u.id === form.polling_unit_id);
    if (!person || !pu) {
      setError("Person and polling unit required");
      return;
    }
    setLoading(true);
    try {
      const record = await createCanvassRecord({
        data: {
          person_id: person.id,
          person_name: person.full_name,
          agent_name: form.agent_name || person.full_name,
          polling_unit_id: pu.id,
          polling_unit_name: pu.name,
          support_level: form.support_level,
          notes: form.notes,
          sync_status: "synced"
        }
      });
      onSuccess(record);
      onClose();
    } catch {
      setError("Failed. Try again.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-xl w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-5 border-b", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Log Door-Knock" }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-gray-400" }) })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Person Visited" }),
        /* @__PURE__ */ jsxs("select", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm", value: form.person_id, onChange: (e) => setForm((f) => ({ ...f, person_id: e.target.value })), required: true, children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Select person..." }),
          people.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.full_name }, p.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Polling Unit" }),
        /* @__PURE__ */ jsxs("select", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm", value: form.polling_unit_id, onChange: (e) => setForm((f) => ({ ...f, polling_unit_id: e.target.value })), required: true, children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Select polling unit..." }),
          POLLING_UNITS.map((pu) => /* @__PURE__ */ jsxs("option", { value: pu.id, children: [
            pu.pu_code,
            " — ",
            pu.name
          ] }, pu.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Canvasser Name" }),
        /* @__PURE__ */ jsx("input", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm", value: form.agent_name, onChange: (e) => setForm((f) => ({ ...f, agent_name: e.target.value })), placeholder: "Agent who did the knock" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Support Level" }),
        /* @__PURE__ */ jsxs("select", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm", value: form.support_level, onChange: (e) => setForm((f) => ({ ...f, support_level: e.target.value })), children: [
          /* @__PURE__ */ jsx("option", { value: "strong", children: "Strong Support" }),
          /* @__PURE__ */ jsx("option", { value: "lean", children: "Leaning Our Way" }),
          /* @__PURE__ */ jsx("option", { value: "neutral", children: "Neutral / Undecided" }),
          /* @__PURE__ */ jsx("option", { value: "opposed", children: "Opposed" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Notes" }),
        /* @__PURE__ */ jsx("textarea", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm", rows: 2, value: form.notes, onChange: (e) => setForm((f) => ({ ...f, notes: e.target.value })), placeholder: "Any relevant observations..." })
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50", children: loading ? "Saving..." : "Log Visit" })
      ] })
    ] })
  ] }) });
}
function CanvassingPage() {
  const { records: initial, people } = Route$2.useLoaderData();
  const [records, setRecords] = useState(initial);
  const [showModal, setShowModal] = useState(false);
  const breakdown = {
    strong: records.filter((r) => r.support_level === "strong").length,
    lean: records.filter((r) => r.support_level === "lean").length,
    neutral: records.filter((r) => r.support_level === "neutral").length,
    opposed: records.filter((r) => r.support_level === "opposed").length,
    pending: records.filter((r) => r.sync_status === "pending").length
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Canvassing" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
          records.length,
          " door-knocks logged"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setShowModal(true), className: "flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
        " Log Visit"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6", children: ["strong", "lean", "neutral", "opposed"].map((level) => {
      const cfg = SUPPORT_CONFIG[level];
      return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-4 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: cn("text-2xl font-bold", cfg.color), children: breakdown[level] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: cfg.label })
      ] }, level);
    }) }),
    breakdown.pending > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4 flex items-center gap-2 text-sm text-amber-700", children: [
      /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
      /* @__PURE__ */ jsx("strong", { children: breakdown.pending }),
      " record",
      breakdown.pending > 1 ? "s" : "",
      " pending sync from field agents (USSD/offline)"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "px-4 py-3 border-b bg-gray-50", children: /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-600", children: "Recent Visits" }) }),
      records.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-12 text-center", children: [
        /* @__PURE__ */ jsx(Map, { className: "w-12 h-12 mx-auto mb-3 text-gray-200" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "No canvass records yet. Start logging door-knocks." })
      ] }) : /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-100", children: records.map((record) => {
        const cfg = SUPPORT_CONFIG[record.support_level];
        return /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 flex items-start gap-3 hover:bg-gray-50", children: [
          /* @__PURE__ */ jsx("div", { className: cn("w-2 h-2 rounded-full mt-2 flex-shrink-0", cfg.bg.replace("bg-", "bg-").replace("-100", "-400")) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 text-sm", children: record.person_name }),
              /* @__PURE__ */ jsx("span", { className: cn("text-xs px-2 py-0.5 rounded font-medium", cfg.bg, cfg.color), children: cfg.label }),
              record.sync_status === "pending" && /* @__PURE__ */ jsx("span", { className: "text-xs text-amber-600", children: "⏳ pending" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: record.polling_unit_name }),
            record.notes && /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-600 mt-0.5 italic", children: [
              '"',
              record.notes,
              '"'
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end gap-1 flex-shrink-0", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: formatRelative(record.created_at) }),
            record.sync_status === "synced" ? /* @__PURE__ */ jsx(CheckCircle, { className: "w-3.5 h-3.5 text-green-500" }) : /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-amber-400" })
          ] })
        ] }, record.id);
      }) })
    ] }),
    showModal && /* @__PURE__ */ jsx(
      LogCanvassModal,
      {
        people,
        onClose: () => setShowModal(false),
        onSuccess: (r) => setRecords((prev) => [r, ...prev])
      }
    )
  ] });
}
const fetchAdvocacyContacts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("892ec7cb03bbb1ff97d69e62b76ba49f3b1cbb57fb51e321ae0eda1c989d0509"));
const submitAdvocacyContact = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("d9bb86f5977d93171d2a40cda8e4707c67de9c8e0ff12a611cf8d339ba81769e"));
const Route$1 = createFileRoute("/advocacy")({
  loader: async () => {
    const [contacts, people] = await Promise.all([fetchAdvocacyContacts(), fetchPeople()]);
    return { contacts, people };
  },
  component: AdvocacyPage
});
const ISSUES = [
  "Infrastructure",
  "Education",
  "Healthcare",
  "Security",
  "Unemployment",
  "Agriculture",
  "Power Supply",
  "Water Supply",
  "Housing",
  "Other"
];
function ContactModal({ people, onClose, onSuccess }) {
  const [form, setForm] = useState({ person_id: "", issue: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const person = people.find((p) => p.id === form.person_id);
    if (!person || !form.issue || !form.message) {
      setError("All fields required");
      return;
    }
    setLoading(true);
    try {
      const contact = await submitAdvocacyContact({
        data: { person_id: person.id, person_name: person.full_name, issue: form.issue, message: form.message }
      });
      onSuccess(contact);
      onClose();
    } catch {
      setError("Failed. Try again.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-xl w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-5 border-b", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Contact Your Candidate" }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5 text-gray-400" }) })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Constituent" }),
        /* @__PURE__ */ jsxs("select", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm", value: form.person_id, onChange: (e) => setForm((f) => ({ ...f, person_id: e.target.value })), required: true, children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Select person..." }),
          people.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.full_name }, p.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Issue" }),
        /* @__PURE__ */ jsxs("select", { className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm", value: form.issue, onChange: (e) => setForm((f) => ({ ...f, issue: e.target.value })), required: true, children: [
          /* @__PURE__ */ jsx("option", { value: "", children: "Select issue..." }),
          ISSUES.map((i) => /* @__PURE__ */ jsx("option", { value: i, children: i }, i))
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Message" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm",
            rows: 4,
            value: form.message,
            onChange: (e) => setForm((f) => ({ ...f, message: e.target.value })),
            placeholder: "Describe the issue and what you'd like the candidate to address...",
            required: true
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm", children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "flex-1 bg-amber-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-amber-700 disabled:opacity-50", children: loading ? "Sending..." : "Send Message" })
      ] })
    ] })
  ] }) });
}
function AdvocacyPage() {
  const { contacts: initial, people } = Route$1.useLoaderData();
  const [contacts, setContacts] = useState(initial);
  const [showModal, setShowModal] = useState(false);
  const issueBreakdown = contacts.reduce((acc, c) => {
    acc[c.issue] = (acc[c.issue] ?? 0) + 1;
    return acc;
  }, {});
  const topIssues = Object.entries(issueBreakdown).sort((a, b) => b[1] - a[1]).slice(0, 5);
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Advocacy" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
          contacts.length,
          " constituent messages"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => setShowModal(true), className: "flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
        " New Message"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "px-4 py-3 border-b bg-gray-50", children: /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-600", children: "Constituent Messages" }) }),
        contacts.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-12 text-center", children: [
          /* @__PURE__ */ jsx(MessageSquare, { className: "w-12 h-12 mx-auto mb-3 text-gray-200" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-400", children: "No messages yet." })
        ] }) : /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-100", children: contacts.map((contact) => /* @__PURE__ */ jsx("div", { className: "p-4 hover:bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900 text-sm", children: contact.person_name }),
              /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded font-medium", children: contact.issue })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: contact.message })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 flex-shrink-0", children: formatRelative(contact.created_at) })
        ] }) }, contact.id)) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm p-5", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-gray-600 mb-4", children: "Top Issues" }),
          topIssues.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: "No data yet" }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: topIssues.map(([issue, count]) => {
            const maxCount = topIssues[0][1];
            const pct = Math.round(count / maxCount * 100);
            return /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
                /* @__PURE__ */ jsx("span", { className: "text-gray-700", children: issue }),
                /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-900", children: count })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full bg-gray-100 rounded-full h-1.5", children: /* @__PURE__ */ jsx("div", { className: "bg-amber-500 h-1.5 rounded-full", style: { width: `${pct}%` } }) })
            ] }, issue);
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsx(Megaphone, { className: "w-4 h-4 text-amber-700" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-amber-800", children: "ActionButton" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-amber-700", children: "Constituents can directly contact your candidate on issues that matter to them. Every message is logged and tracked in the activity stream." })
        ] })
      ] })
    ] }),
    showModal && /* @__PURE__ */ jsx(ContactModal, { people, onClose: () => setShowModal(false), onSuccess: (c) => setContacts((prev) => [c, ...prev]) })
  ] });
}
const fetchActivities = createServerFn({
  method: "GET"
}).handler(createSsrRpc("5316327dcd77e1824e8784cbc0e86c53e9dfc9d9dda416c55bb21ef66020bf2d"));
createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("1346adc0ded71b819894ef56a8b933c7b197057cfa6d611bc4b86f266500e6a9"));
const Route = createFileRoute("/")({
  loader: async () => {
    const [activities, people] = await Promise.all([
      fetchActivities(),
      fetchPeople()
    ]);
    return { activities, people };
  },
  component: ActivityFeedPage
});
const ACTIVITY_CONFIG = {
  donation: { label: "Donation", color: "text-green-700", bgColor: "bg-green-100", icon: DollarSign },
  canvass: { label: "Canvass", color: "text-blue-700", bgColor: "bg-blue-100", icon: Map },
  rsvp: { label: "RSVP", color: "text-purple-700", bgColor: "bg-purple-100", icon: Calendar },
  contact_candidate: { label: "Contacted Candidate", color: "text-amber-700", bgColor: "bg-amber-100", icon: Megaphone },
  volunteer_signup: { label: "Volunteer Signup", color: "text-teal-700", bgColor: "bg-teal-100", icon: UserPlus },
  incident: { label: "Incident", color: "text-red-700", bgColor: "bg-red-100", icon: AlertCircle },
  pledge: { label: "Pledge", color: "text-indigo-700", bgColor: "bg-indigo-100", icon: Heart }
};
function ActivityItem({ activity }) {
  const cfg = ACTIVITY_CONFIG[activity.type];
  const Icon = cfg.icon;
  function getSummary() {
    const m = activity.metadata;
    switch (activity.type) {
      case "donation":
        return `donated ${formatCurrency(m.amount)} via ${m.channel}`;
      case "canvass":
        return `canvassed at ${m.polling_unit} — ${m.support_level} supporter`;
      case "rsvp":
        return `RSVPed to ${m.event}`;
      case "contact_candidate":
        return `sent message about "${m.issue}"`;
      case "volunteer_signup":
        return `signed up as volunteer (${m.role ?? "General"})`;
      case "incident":
        return `reported incident: ${m.description ?? "details logged"}`;
      case "pledge":
        return `pledged ${formatCurrency(m.amount)}`;
      default:
        return "performed an action";
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-3 py-3", children: [
    /* @__PURE__ */ jsx("div", { className: cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", cfg.bgColor), children: /* @__PURE__ */ jsx(Icon, { className: cn("w-4 h-4", cfg.color) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-900", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold", children: activity.person_name }),
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-gray-600", children: getSummary() })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
        /* @__PURE__ */ jsx("span", { className: cn("text-xs font-medium px-1.5 py-0.5 rounded", cfg.bgColor, cfg.color), children: cfg.label }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: formatRelative(activity.created_at) }),
        activity.sync_status === "pending" && /* @__PURE__ */ jsx("span", { className: "text-xs text-amber-600 font-medium", children: "⏳ pending sync" }),
        activity.source === "ussd" && /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 uppercase tracking-wide", children: "USSD" })
      ] })
    ] })
  ] });
}
function DonationModal({
  people,
  onClose,
  onSuccess
}) {
  const [form, setForm] = useState({
    person_id: "",
    amount: "",
    channel: "paystack"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const person = people.find((p) => p.id === form.person_id);
    if (!person) {
      setError("Please select a person");
      return;
    }
    const amount = parseInt(form.amount, 10);
    if (!amount || amount <= 0) {
      setError("Enter a valid amount");
      return;
    }
    setLoading(true);
    try {
      await createDonation({
        data: {
          person_id: person.id,
          person_name: person.full_name,
          amount,
          channel: form.channel
        }
      });
      onSuccess();
      onClose();
    } catch (err) {
      setError("Failed to record donation. Try again.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-xl w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-5 border-b", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold", children: "Record Donation" }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Donor" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500",
            value: form.person_id,
            onChange: (e) => setForm((f) => ({ ...f, person_id: e.target.value })),
            required: true,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Select person..." }),
              people.map((p) => /* @__PURE__ */ jsx("option", { value: p.id, children: p.full_name }, p.id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Amount (₦)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "number",
            min: "1",
            className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500",
            placeholder: "e.g. 50000",
            value: form.amount,
            onChange: (e) => setForm((f) => ({ ...f, amount: e.target.value })),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Payment Channel" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            className: "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500",
            value: form.channel,
            onChange: (e) => setForm((f) => ({ ...f, channel: e.target.value })),
            children: [
              /* @__PURE__ */ jsx("option", { value: "paystack", children: "Paystack" }),
              /* @__PURE__ */ jsx("option", { value: "flutterwave", children: "Flutterwave" }),
              /* @__PURE__ */ jsx("option", { value: "bank_transfer", children: "Bank Transfer" }),
              /* @__PURE__ */ jsx("option", { value: "cash", children: "Cash" })
            ]
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 pt-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50",
            children: loading ? "Saving..." : "Record Donation"
          }
        )
      ] })
    ] })
  ] }) });
}
function ActivityFeedPage() {
  const { activities: initial, people } = Route.useLoaderData();
  const [activities, setActivities] = useState(initial);
  const [filter, setFilter] = useState("all");
  const [showDonation, setShowDonation] = useState(false);
  const filtered = filter === "all" ? activities : activities.filter((a) => a.type === filter);
  async function refresh() {
    const updated = await fetchActivities();
    setActivities(updated);
  }
  const stats = {
    totalDonations: activities.filter((a) => a.type === "donation").reduce((s, a) => s + (a.metadata.amount || 0), 0),
    volunteers: activities.filter((a) => a.type === "volunteer_signup").length,
    canvasses: activities.filter((a) => a.type === "canvass").length,
    rsvps: activities.filter((a) => a.type === "rsvp").length
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Activity Feed" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-0.5", children: "Real-time campaign activity stream" })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setShowDonation(true),
          className: "flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            "New Donation"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: [
      { label: "Total Raised", value: formatCurrency(stats.totalDonations), icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
      { label: "Volunteers", value: String(stats.volunteers), icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
      { label: "Canvasses", value: String(stats.canvasses), icon: Map, color: "text-purple-600", bg: "bg-purple-50" },
      { label: "RSVPs", value: String(stats.rsvps), icon: Calendar, color: "text-amber-600", bg: "bg-amber-50" }
    ].map((stat) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-4 shadow-sm flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: cn("w-10 h-10 rounded-lg flex items-center justify-center", stat.bg), children: /* @__PURE__ */ jsx(stat.icon, { className: cn("w-5 h-5", stat.color) }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: stat.label }),
        /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-gray-900", children: stat.value })
      ] })
    ] }, stat.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-4 border-b overflow-x-auto", children: [
        /* @__PURE__ */ jsx(Filter, { className: "w-4 h-4 text-gray-400 flex-shrink-0" }),
        ["all", "donation", "canvass", "rsvp", "volunteer_signup", "contact_candidate", "pledge"].map((type) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setFilter(type),
            className: cn(
              "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
              filter === type ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            ),
            children: type === "all" ? "All" : ACTIVITY_CONFIG[type].label
          },
          type
        ))
      ] }),
      /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-50 px-4", children: filtered.length === 0 ? /* @__PURE__ */ jsx("p", { className: "py-8 text-center text-gray-400 text-sm", children: "No activities yet" }) : filtered.map((activity) => /* @__PURE__ */ jsx(ActivityItem, { activity }, activity.id)) })
    ] }),
    showDonation && /* @__PURE__ */ jsx(
      DonationModal,
      {
        people,
        onClose: () => setShowDonation(false),
        onSuccess: refresh
      }
    )
  ] });
}
const SettingsRoute = Route$7.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$8
});
const PeopleRoute = Route$6.update({
  id: "/people",
  path: "/people",
  getParentRoute: () => Route$8
});
const GoalsRoute = Route$5.update({
  id: "/goals",
  path: "/goals",
  getParentRoute: () => Route$8
});
const FinanceRoute = Route$4.update({
  id: "/finance",
  path: "/finance",
  getParentRoute: () => Route$8
});
const EventsRoute = Route$3.update({
  id: "/events",
  path: "/events",
  getParentRoute: () => Route$8
});
const CanvassingRoute = Route$2.update({
  id: "/canvassing",
  path: "/canvassing",
  getParentRoute: () => Route$8
});
const AdvocacyRoute = Route$1.update({
  id: "/advocacy",
  path: "/advocacy",
  getParentRoute: () => Route$8
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const rootRouteChildren = {
  IndexRoute,
  AdvocacyRoute,
  CanvassingRoute,
  EventsRoute,
  FinanceRoute,
  GoalsRoute,
  PeopleRoute,
  SettingsRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
