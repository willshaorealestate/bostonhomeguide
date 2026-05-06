declare function gtag(...args: unknown[]): void;

export function trackLead(source: string) {
  if (typeof gtag !== "undefined") {
    gtag("event", "generate_lead", { event_category: "lead", event_label: source });
  }
}
