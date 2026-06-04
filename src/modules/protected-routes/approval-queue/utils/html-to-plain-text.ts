/** Safe for client; naive strip on server for SSR. */
export function htmlToPlainText(html: string): string {
  if (!html.trim()) return "";
  if (typeof document === "undefined") {
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }
  const el = document.createElement("div");
  el.innerHTML = html;
  return (el.textContent ?? el.innerText ?? "").trim();
}
