import { useEffect, useLayoutEffect } from "react";

/**
 * SSR-safe version of useLayoutEffect.
 * Falls back to useEffect during server-side rendering to avoid
 * React's "useLayoutEffect does nothing on the server" warning.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export { useIsomorphicLayoutEffect };
