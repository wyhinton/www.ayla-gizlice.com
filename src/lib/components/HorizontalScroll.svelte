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
  let currentSectionIndex = 0;
  let totalSections = 0;

  $: scrollToEnd = () => {
    console.log(`%cHERE LINE :23 %c`, "color: blue; font-weight: bold", "");

    if (!scrollContainer) return;

    // Get all direct children (sections) of the content wrapper
    const contentWrapper = scrollContainer.querySelector(".content-wrapper");
    if (!contentWrapper) return;

    const sections = Array.from(contentWrapper.children) as HTMLElement[];
    totalSections = sections.length;
    console.log(`%cHERE LINE :33 %c`, "color: lime; font-weight: bold", "");

    if (totalSections === 0) return;
    console.log(
      `%cHERE LINE :36 %c`,
      "color: white; font-weight: bold; background-color: black",
      ""
    );

    // Calculate next section index
    const nextSectionIndex = Math.min(
      currentSectionIndex + 1,
      totalSections - 1
    );
    console.log(nextSectionIndex);
    const nextSection = sections[nextSectionIndex];
    console.log(nextSection);
    if (!nextSection) return;
    console.log(`%cHERE LINE :46 %c`, "color: pink; font-weight: bold", "");

    if ($isMobile) {
      // Mobile: scroll vertically to next section
      const sectionTop = nextSection.offsetTop;
      scrollContainer.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    } else {
      const sectionLeft = nextSection.offsetLeft;

      const SCROLL_PADDING = 75; // 🔧 tune this (8–20 feels good)
      const start = targetScrollLeft;
      const end = sectionLeft - SCROLL_PADDING;

      const distance = Math.abs(end - start);
      const speed = 3.0; // px per ms
      const minDuration = 180;
      const maxDuration = 800;

      const duration = Math.min(
        maxDuration,
        Math.max(minDuration, distance / speed)
      );

      const startTime = performance.now();

      const ease = (t: number) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

      const animateTarget = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);

        targetScrollLeft = start + (end - start) * ease(t);

        if (!isAnimating) {
          isAnimating = true;
          requestAnimationFrame(smoothScroll);
        }

        if (t < 1) requestAnimationFrame(animateTarget);
      };

      requestAnimationFrame(animateTarget);
      9;
    }
  };

  $: checkScroll = () => {
    if (!scrollContainer) return;

    // Get all sections to determine which one is in view
    const contentWrapper = scrollContainer.querySelector(".content-wrapper");
    if (contentWrapper) {
      const sections = Array.from(contentWrapper.children) as HTMLElement[];
      totalSections = sections.length;

      if ($isMobile) {
        // Find which section is currently most visible (vertically)
        const scrollTop = scrollContainer.scrollTop;
        const containerHeight = scrollContainer.clientHeight;
        const scrollCenter = scrollTop + containerHeight / 2;

        currentSectionIndex = sections.findIndex((section, index) => {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          return scrollCenter >= sectionTop && scrollCenter < sectionBottom;
        });

        if (currentSectionIndex === -1) currentSectionIndex = 0;

        showScrollEndBtn =
          scrollContainer.scrollTop + scrollContainer.clientHeight <
          scrollContainer.scrollHeight - 1;
      } else {
        // Find which section is currently most visible (horizontally)
        const scrollLeft = scrollContainer.scrollLeft;
        const containerWidth = scrollContainer.clientWidth;
        const scrollCenter = scrollLeft + containerWidth / 2;

        currentSectionIndex = sections.findIndex((section, index) => {
          const sectionLeft = section.offsetLeft;
          const sectionRight = sectionLeft + section.offsetWidth;
          return scrollCenter >= sectionLeft && scrollCenter < sectionRight;
        });

        if (currentSectionIndex === -1) currentSectionIndex = 0;
        let isNotScrolledToEnd =
          scrollContainer.scrollLeft + scrollContainer.clientWidth <
          scrollContainer.scrollWidth - 100;
        // Show button if not at the last section
        showScrollEndBtn =
          currentSectionIndex < totalSections - 1 && isNotScrolledToEnd;

        // Detect manual scrolling: if scroll changed but we're not animating it
        if (isAnimating && !isManualScroll) {
          const scrollDiff = Math.abs(
            scrollContainer.scrollLeft - lastScrollLeft
          );
          const expectedDiff = Math.abs(
            (targetScrollLeft - lastScrollLeft) * 0.2
          );

          // If scroll changed significantly different from our animation, user is dragging
          // Use a wider tolerance to avoid false positives during smooth scrolling
          if (
            scrollDiff > expectedDiff * 5 ||
            (expectedDiff > 1 && scrollDiff < expectedDiff * 0.1)
          ) {
            isAnimating = false;
            isManualScroll = true;
          }
        }

        lastScrollLeft = scrollContainer.scrollLeft;

        // Sync targetScrollLeft to prevent flickering when manually scrolling
        if (!isAnimating) {
          targetScrollLeft = scrollContainer.scrollLeft;
          isManualScroll = false;
        }
      }
    }
    console.log(currentSectionIndex);
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
  let lastScrollLeft = 0;
  let isManualScroll = false;

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
        isManualScroll = false;
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
