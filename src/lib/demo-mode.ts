// LINKSUPPLIED — Demo Mode State Utilities
// Manages the separation between "Instant Evaluation Mode" and real production flows.

export type DemoRole = "buyer" | "supplier";

export const DEMO_STORAGE_KEY = "linksupplied_demo_mode";
export const DEMO_SPEC_LOADED_KEY = "linksupplied_demo_spec_loaded";

/**
 * Checks if demo mode is currently active in browser storage.
 */
export function getDemoMode(): DemoRole | null {
  if (typeof window === "undefined") return null;
  try {
    const val = sessionStorage.getItem(DEMO_STORAGE_KEY) || localStorage.getItem(DEMO_STORAGE_KEY);
    if (val === "buyer" || val === "supplier") {
      return val;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Enables Instant Evaluation Mode for the specified role.
 * Persists to both sessionStorage and localStorage for resilience across navigations.
 */
export function setDemoMode(role: DemoRole): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(DEMO_STORAGE_KEY, role);
    localStorage.setItem(DEMO_STORAGE_KEY, role);
    // Dispatch custom event so listeners in the current tab update immediately
    window.dispatchEvent(new Event("linksupplied_demo_mode_change"));
  } catch {
    // Storage quota or privacy restriction
  }
}

/**
 * Exits Instant Evaluation Mode and clears all demo markers.
 */
export function clearDemoMode(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(DEMO_STORAGE_KEY);
    localStorage.removeItem(DEMO_STORAGE_KEY);
    sessionStorage.removeItem(DEMO_SPEC_LOADED_KEY);
    localStorage.removeItem(DEMO_SPEC_LOADED_KEY);
    window.dispatchEvent(new Event("linksupplied_demo_mode_change"));
  } catch {
    // Storage quota or privacy restriction
  }
}
