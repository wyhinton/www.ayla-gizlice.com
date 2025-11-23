import { writable } from "svelte/store";

// Default check
const initialIsMobile =
  typeof window !== "undefined" ? window.innerWidth < 768 : false;

export const isMobile = writable(initialIsMobile);

// Update store on window resize
if (typeof window !== "undefined") {
  const handleResize = () => {
    isMobile.set(window.innerWidth < 768);
  };

  window.addEventListener("resize", handleResize);

  // Optional: remove listener on module cleanup if using HMR
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      window.removeEventListener("resize", handleResize);
    });
  }
}
