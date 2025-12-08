<!-- @ts-nocheck -->
<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { crossfade, fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import {
    projectsInSelectedCategory,
    selectCategory,
    appState,
    closeGallery,
    isGalleryOpen,
  } from "$lib/stores/projectStore";
  import type { Project } from "../../types.js";
  import { get } from "svelte/store";
  import { isMobile } from "$lib/stores/uiStore.js";
  import ProjectNav from "./ProjectNav.svelte";

  let categoryElement: HTMLElement;
  let titleElement: HTMLElement;
  let scrollContainer: HTMLElement;
  let viewport: HTMLElement;
  let contents: HTMLElement;
  // Create crossfade for shared element transitions
  let send: any;
  let receive: any;

  $: if (!$isMobile) {
    [send, receive] = crossfade({ duration: 600, easing: quintOut });
  } else {
    send = () => {};
    receive = () => {};
  }

  // Unique key for crossfade animation
  $: titleKey = `title-${projectName}`;

  export let projectName: string;
  export let index: number;
  export let onProjectClick: (project: Project, index: number) => void;

  let showScrollContents = false;
  $: if ($projectsInSelectedCategory.length > 0) {
    // Delay mounting by one tick to allow fade
    tick().then(() => {
      showScrollContents = true;
    });
  } else {
    showScrollContents = false;
  }

  // Array of different animation configurations
  const animations = [
    { duration: "0.25s", curve: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" },
    { duration: "0.35s", curve: "cubic-bezier(0.68, -0.55, 0.265, 1.55)" },
    { duration: "0.28s", curve: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" },
    { duration: "0.42s", curve: "cubic-bezier(0.87, 0, 0.13, 1)" },
    { duration: "0.31s", curve: "cubic-bezier(0.23, 1, 0.32, 1)" },
    { duration: "0.38s", curve: "cubic-bezier(0.165, 0.84, 0.44, 1)" },
    { duration: "0.33s", curve: "cubic-bezier(0.19, 1, 0.22, 1)" },
    { duration: "0.29s", curve: "cubic-bezier(0.4, 0, 0.2, 1)" },
    { duration: "0.37s", curve: "cubic-bezier(0.25, 0.8, 0.25, 1)" },
  ];

  function getRandomAnimation() {
    return animations[Math.floor(Math.random() * animations.length)];
  }

  function handleMouseEnter() {
    if (titleElement) {
      const animation = getRandomAnimation();
      titleElement.style.transition = `color ${animation.duration} ${animation.curve}, -webkit-text-fill-color ${animation.duration} ${animation.curve}`;
    }
  }

  $: handleCategoryTitleClick = () => {
    if (projectName !== $appState.selectedCategory) {
      selectCategory(projectName);
    } else {
      closeGallery();
    }
    // onProjectClick(project, index);
  };

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      handleCategoryTitleClick();
    }
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      $isGalleryOpen &&
      categoryElement &&
      !categoryElement.contains(event.target as Node)
    ) {
      // Check if PhotoSwipe is currently open
      const isPhotoSwipeOpen = document.querySelector(".pswp--open") !== null;
      if (isPhotoSwipeOpen) {
        return; // Don't close gallery if PhotoSwipe lightbox is open
      }

      // Check if the click is within any project section
      const clickedElement = event.target as HTMLElement;
      const isWithinProjectSection =
        clickedElement.closest(".projectSectionWrapper") !== null;

      const clickedButton =
        clickedElement.classList.contains("scroll-end-btn") ||
        clickedElement.classList.contains("btn-svg");
      const isClickInLightBox =
        clickedElement.closest(".lightbox-overlay") !== null;
      // Only close gallery if not clicking within a project section
      if (!isWithinProjectSection && !clickedButton && !isClickInLightBox) {
        closeGallery();
      }
    }
  }

  // Svrollbar doesn't require initialization/destruction like OverlayScrollbars

  // Svrollbar handles scrollbar management automatically

  onMount(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });
</script>

<!-- in:fade={{ duration: 600 }} out:fade={{ duration: 400 }} -->
<div
  class="categoryItem"
  class:background-category={$appState.selectedCategory !== null &&
    $appState.selectedCategory !== projectName}
  class:selected-category-item={$appState.selectedCategory == projectName}
  bind:this={categoryElement}
  on:keydown={handleKeydown}
>
  {#if !$appState.selectedCategory}
    <!-- Default state: center position -->
    <h1
      in:receive={{ key: titleKey }}
      out:send={{ key: titleKey }}
      on:click={handleCategoryTitleClick}
      class="categoryTitle center-position"
      bind:this={titleElement}
      on:mouseenter={handleMouseEnter}
    >
      {projectName || `Project ${index + 1}`}
    </h1>
  {:else if $appState.selectedCategory == projectName}
    <!-- Selected state: left position with gallery -->
    {#if !$isMobile}
      <h1
        in:receive={{ key: titleKey }}
        out:send={{ key: titleKey }}
        class="categoryTitle selected-position d-flex pointer-events-none"
        bind:this={titleElement}
        on:mouseenter={handleMouseEnter}
      >
        {projectName || `Project ${index + 1}`}
        <div>
          <!-- <ProjectNav projects={$projectsInSelectedCategory}></ProjectNav> -->
        </div>
      </h1>
    {/if}
  {:else}
    <!-- Non-selected category: blurred state -->
    <h1
      class="categoryTitle center-position blurred"
      bind:this={titleElement}
      on:mouseenter={handleMouseEnter}
    >
      {projectName || `Project ${index + 1}`}
    </h1>
  {/if}
</div>

<style>
  .background-category {
    pointer-events: none;
    user-select: none;
  }

  .categoryItem {
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    width: 100%;
  }

  .categoryItem:hover {
    color: black;
  }

  .categoryTitle {
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 35px;
  }

  @media (min-width: 567px) {
    .categoryTitle {
      font-size: clamp(3rem, 8vw, 6rem);
      /* font-weight: bold; */
      font-weight: 400;
      font-family: "auto";
      color: rgb(208, 208, 208);
      -webkit-text-stroke: 1px black;
      margin: 0;
      line-height: 0.9;
      letter-spacing: -0.02em;
      /* Default transition - will be overridden by JavaScript */
      transition:
        color 0.3s ease-in-out,
        -webkit-text-fill-color 0.3s ease-in-out;
      cursor: pointer;
    }
  }

  .categoryTitle:hover {
    color: black;
    -webkit-text-fill-color: black;
  }

  .categoryTitle.center-position {
    text-align: center;
    width: 100%;
  }

  .categoryTitle.selected-position {
    text-align: left;
    position: absolute;
    top: 90px;
    left: var(--page-margin);
  }

  .categoryTitle.blurred {
    filter: blur(3px);
    opacity: 0.4;
    transition:
      filter 0.3s ease,
      opacity 0.3s ease;
    pointer-events: none;
  }

  .categoryTitle.blurred:hover {
    filter: blur(1px);
    opacity: 0.7;
  }

  /* Responsive adjustments */
  @media (min-width: 768px) {
    .categoryItem {
      padding: 20px 10px;
    }
  }
</style>
