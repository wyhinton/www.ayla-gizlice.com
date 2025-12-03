import { writable } from "svelte/store";

// Default check
const initialIsMobile =
  typeof window !== "undefined" ? window.innerWidth < 768 : false;

const initialIsPortrait =
  typeof window !== "undefined" ? window.innerHeight > window.innerWidth : false;

export const isMobile = writable(initialIsMobile);
export const isPortrait = writable(initialIsPortrait);

// Update store on window resize
if (typeof window !== "undefined") {
  const handleResize = () => {
    isMobile.set(window.innerWidth < 768);
    isPortrait.set(window.innerHeight > window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  // Optional: remove listener on module cleanup if using HMR
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      window.removeEventListener("resize", handleResize);
    });
  }
}
