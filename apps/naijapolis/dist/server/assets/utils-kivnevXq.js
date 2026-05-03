function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
function formatCurrency(amount, currency = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 0
  }).format(amount);
}
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function formatRelative(dateStr) {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const minutes = Math.floor(diff / 6e4);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(dateStr);
}
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function nowISO() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
export {
  cn,
  formatCurrency,
  formatDate,
  formatRelative,
  generateId,
  nowISO
};
