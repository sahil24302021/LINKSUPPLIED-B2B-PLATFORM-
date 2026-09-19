// Central event dispatcher for Pre-Launch Coming Soon Modal

export function openComingSoonModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("linksupplied_open_coming_soon"));
  }
}

export function openDemoModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("linksupplied_open_demo_eval"));
  }
}
