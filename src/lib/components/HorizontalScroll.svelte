<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { appState } from "$lib/stores/projectStore";

  export let height: string = "200px";
  export let scrollbarHeight: string = "8px";
  export let scrollbarColor: string = "#888";
  export let scrollbarHoverColor: string = "#555";
  export let scrollbarTrackColor: string = "#f0f0f0";
  export let padding: string = "0";

  let scrollContainer: HTMLDivElement;
  let showScrollEndBtn = true;

  function isMobile() {
    return window.innerWidth <= 567;
  }

  function scrollToEnd() {
    if (!scrollContainer) return;

    if (isMobile()) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth",
      });
    } else {
      scrollContainer.scrollTo({
        left: scrollContainer.scrollWidth,
        behavior: "smooth",
      });
    }
  }

  function checkScroll() {
    if (!scrollContainer) return;

    if (isMobile()) {
      showScrollEndBtn =
        scrollContainer.scrollTop + scrollContainer.clientHeight <
        scrollContainer.scrollHeight - 1;
    } else {
      showScrollEndBtn =
        scrollContainer.scrollLeft + scrollContainer.clientWidth <
        scrollContainer.scrollWidth - 1;
    }
  }

  onMount(() => {
    checkScroll();
    scrollContainer.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  });
</script>

<div class="scroll-wrapper" style="--scroll-height: {height};">
  <div
    bind:this={scrollContainer}
    class="scroll-container"
    style="
      --scrollbar-height: {scrollbarHeight};
      --scrollbar-color: {scrollbarColor};
      --scrollbar-hover-color: {scrollbarHoverColor};
      --scrollbar-track-color: {scrollbarTrackColor};
      --scroll-padding: {padding};
    "
  >
    <div class="content-wrapper flex-column flex-md-row gap-4">
      <slot />
    </div>
  </div>

  {#if showScrollEndBtn && $appState.selectedCategory !== null}
    <div
      in:fade={{ duration: 100 }}
      out:fade={{ duration: 100 }}
      class="scroll-end-gradient"
    >
      <button class="scroll-end-btn" on:click={scrollToEnd}>
        <svg
          class="btn-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"
          />
        </svg>
      </button>
    </div>
  {/if}
</div>

<style>
  .scroll-wrapper {
    position: relative;
  }

  .content-wrapper {
    display: flex;
  }

  @media (min-width: 567px) {
    .content-wrapper {
      margin-right: 60px;
    }

    .scroll-wrapper {
      /* padding-right: 20px; */
    }
  }

  /* Default: horizontal scrolling (desktop) */
  .scroll-container {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    margin-left: 56px;
    height: var(--scroll-height);
    padding: var(--scroll-padding);
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-color) var(--scrollbar-track-color);
  }

  /* Mobile: vertical scrolling */
  @media (max-width: 567px) {
    .scroll-container {
      overflow-x: hidden;
      overflow-y: auto;
      margin-left: 0;
      height: auto;
      max-height: var(--scroll-height);
    }

    .content-wrapper {
      flex-direction: column !important;
      margin-right: 0 !important;
    }
  }

  /* Scrollbar (Webkit) */
  .scroll-container::-webkit-scrollbar {
    height: var(--scrollbar-height);
    width: var(--scrollbar-height);
  }

  .scroll-container::-webkit-scrollbar-track {
    background: var(--scrollbar-track-color);
    border-radius: 4px;
  }

  .scroll-container::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-color);
    border-radius: 4px;
  }

  .scroll-container::-webkit-scrollbar-thumb:hover {
    background-color: var(--scrollbar-hover-color);
  }

  /* Scroll-to-end button */
  .scroll-end-btn {
    outline: 2px solid white;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.9);
    border: none;
    color: white;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    z-index: 10;
    transition: background 0.2s;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  }

  .scroll-end-btn:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  /* fade gradient */
  .scroll-end-gradient {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(62, 60, 74, 0) 50%,
      rgba(211, 211, 211, 0.4)
    );
    width: 50px;
    z-index: 9;
  }

  /* Hide scroll-to-end button entirely on mobile */
  @media (max-width: 567px) {
    .scroll-end-btn,
    .scroll-end-gradient {
      display: none !important;
    }
  }
</style>
