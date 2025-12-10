<script lang="ts">
  import { fade } from "svelte/transition";

  export let loading = true;
  export let fadeDuration = 200;

  export let radius = "16px";

  // Single earthy tone
  export let color = "#bba98a"; // warm dry grass
</script>

<div class="ghost-wrapper">
  <!-- REAL CONTENT (always mounted) -->
  <div class="content" aria-hidden={loading} class:hidden={loading}>
    <slot />
  </div>

  <!-- MINIMAL GHOST OVERLAY -->
  {#if loading}
    <div
      class="ghost"
      style="
        --r:{radius};
        --ghost-color:{color};
      "
      transition:fade={{ duration: fadeDuration }}
    />
  {/if}
</div>

<style>
  .ghost-wrapper {
    position: relative;
  }

  /* ---------------------------
     Content layer
  --------------------------- */
  .content {
    transition:
      opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      filter 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .content.hidden {
    opacity: 0;
    filter: blur(1.5px);
    pointer-events: none;
  }

  /* ---------------------------
     Minimal Pulse Ghost
  --------------------------- */
  .ghost {
    position: absolute;
    inset: 0;
    pointer-events: none;

    border-radius: var(--r);
    background: #b3aca1;

    animation: ghostPulse 2.6s ease-in-out infinite;
  }

  /* extremely subtle breathing */
  @keyframes ghostPulse {
    0% {
      opacity: 0.8;
      filter: brightness(1);
    }

    50% {
      opacity: 0.95;
      filter: brightness(1.08);
    }

    100% {
      opacity: 0.85;
      filter: brightness(1);
    }
  }
</style>
