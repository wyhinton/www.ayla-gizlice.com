<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount, tick } from "svelte";
  import { appState } from "$lib/stores/projectStore";
  import { isMobile } from "$lib/stores/uiStore";
  import ScrollToEndButton from "./ScrollToEndButton.svelte";

  export let height: string = "200px";
  export let scrollbarHeight: string = "8px";
  export let scrollbarColor: string = "#888";
  export let scrollbarHoverColor: string = "#555";
  export let scrollbarTrackColor: string = "#f0f0f0";
  export let padding: string = "0";

  let scrollContainer: HTMLDivElement;
  let showScrollEndBtn = true;
  let isTrackpad = false;
  let trackpadTimer: number;
  $: scrollToEnd = () => {
    if (!scrollContainer) return;

    if ($isMobile) {
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
  };

  $: checkScroll = () => {
    if (!scrollContainer) return;

    if ($isMobile) {
      showScrollEndBtn =
        scrollContainer.scrollTop + scrollContainer.clientHeight <
        scrollContainer.scrollHeight - 1;
    } else {
      showScrollEndBtn =
        scrollContainer.scrollLeft + scrollContainer.clientWidth <
        scrollContainer.scrollWidth - 1;
    }
  };

  const smoothScroll = () => {
    if (!scrollContainer) return;

    const current = scrollContainer.scrollLeft;
    const diff = targetScrollLeft - current;

    if (Math.abs(diff) < 0.5) {
      scrollContainer.scrollLeft = targetScrollLeft;
      isAnimating = false;
      return;
    }

    // Move 20% toward target per frame
    scrollContainer.scrollLeft = current + diff * 0.2;

    requestAnimationFrame(smoothScroll);
  };

  let targetScrollLeft = 0;
  let isAnimating = false;
  onMount(() => {
    // async work inside a nested function
    const init = async () => {
      await tick(); // wait for DOM to render
      checkScroll(); // your scroll check
    };

    init(); // call it, but onMount itself stays sync

    scrollContainer.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    // --- horizontal wheel scrolling on desktop ---
    const onWheel = (e: WheelEvent) => {
      if ($isMobile) return;

      // Prevent default scrolling (both vertical and horizontal)
      e.preventDefault();

      // Add both deltaX and deltaY to the horizontal target
      targetScrollLeft += e.deltaY + e.deltaX;

      // Clamp within scroll bounds
      targetScrollLeft = Math.max(
        0,
        Math.min(
          targetScrollLeft,
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        )
      );

      // Start the animation if not already running
      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(smoothScroll);
      }
    };
    scrollContainer.addEventListener("wheel", onWheel, { passive: false });

    // synchronous cleanup
    return () => {
      scrollContainer.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      window.removeEventListener("wheel", checkScroll);
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
    <div class="content-wrapper ar-column ar-row gap-4">
      <slot />
    </div>
  </div>
  <ScrollToEndButton
    show={showScrollEndBtn && $appState.selectedCategory !== null}
    onClick={() => {
      scrollToEnd();
    }}
  />
</div>

<style>
  /* Wrapper */
  .scroll-wrapper {
    position: relative;
  }

  /* Scroll container: default horizontal (desktop) */
  .scroll-container {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    height: var(--scroll-height);
    padding: var(--scroll-padding);
    /* scrollbar-width: thin; */
    scrollbar-color: var(--scrollbar-color) var(--scrollbar-track-color);
  }

  /* Scroll container: vertical scrolling on mobile */
  @media (max-width: 768px) {
    .scroll-container {
      flex-direction: column;
      overflow-x: hidden;
      overflow-y: auto;
      height: auto;
      max-height: var(--scroll-height);
      margin-left: 0;
    }
  }

  /* Content wrapper */
  .content-wrapper {
    display: flex;
    gap: 1rem; /* matches gap-4 */
  }

  /* Mobile: column layout */
  @media (max-width: 768px) {
    .content-wrapper {
      flex-direction: column !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }

  /* Aspect ratio adjustments */
  @media (min-aspect-ratio: 1/1) {
    .scroll-container {
      margin-left: var(--page-margin);
    }

    .content-wrapper {
      margin-right: 20px;
    }
  }

  @media (max-aspect-ratio: 1/1) {
    .content-wrapper {
      margin-left: 0;
    }

    .content-wrapper {
      margin-right: 0;
    }
  }

  /* Webkit scrollbars */
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
</style>
