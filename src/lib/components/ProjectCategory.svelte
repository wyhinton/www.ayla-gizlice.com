<!-- @ts-nocheck -->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { crossfade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import {
    projectsInSelectedCategory,
    selectCategory,
    appState,
    closeGallery,
    isGalleryOpen,
  } from "$lib/stores/projectStore.js";
  import type { Project } from "../../types.js";
  import ProjectSection from "./ProjectSection.svelte";
  import { OverlayScrollbars } from "overlayscrollbars";
  import "overlayscrollbars/overlayscrollbars.css";

  let categoryElement: HTMLElement;
  let titleElement: HTMLElement;
  let scrollContainer: HTMLElement;
  let overlayScrollbars: any;

  // Create crossfade for shared element transitions
  const [send, receive] = crossfade({
    duration: 600,
    easing: quintOut,
  });

  // Unique key for crossfade animation
  $: titleKey = `title-${projectName}`;

  export let projectName: string;
  export let index: number;
  export let onProjectClick: (project: Project, index: number) => void;

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

  function handleCategoryTitleClick() {
    console.log(`%cHERE LINE :12 %c`, "color: yellow; font-weight: bold", "");

    selectCategory(projectName);
    // onProjectClick(project, index);
  }

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
      closeGallery();
    }
  }

  function initializeScrollbars() {
    if (scrollContainer && !overlayScrollbars) {
      overlayScrollbars = OverlayScrollbars(scrollContainer, {
        scrollbars: {
          theme: "os-theme-dark",
          visibility: "auto",
          autoHide: "never",
          autoHideDelay: 1300,
        },
        overflow: {
          x: "scroll",
          y: "hidden",
        },
      });
    }
  }

  function destroyScrollbars() {
    if (overlayScrollbars) {
      overlayScrollbars.destroy();
      overlayScrollbars = null;
    }
  }

  // Watch for category selection changes
  $: if (
    $appState.selectedCategory === projectName &&
    $projectsInSelectedCategory.length > 0
  ) {
    // Wait for DOM to update, then initialize scrollbars
    setTimeout(() => {
      initializeScrollbars();
    }, 100);
  } else {
    destroyScrollbars();
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      destroyScrollbars();
    };
  });
</script>

<div
  class="categoryItem"
  class:selected-category-item={$appState.selectedCategory == projectName}
  bind:this={categoryElement}
  on:keydown={handleKeydown}
  role="button"
  tabindex="0"
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
    <h1
      in:receive={{ key: titleKey }}
      out:send={{ key: titleKey }}
      on:click={handleCategoryTitleClick}
      class="categoryTitle selected-position"
      bind:this={titleElement}
      on:mouseenter={handleMouseEnter}
    >
      {projectName || `Project ${index + 1}`}
    </h1>

    {#if $projectsInSelectedCategory.length > 0}
      <div class="scroll-container d-flex" bind:this={scrollContainer}>
        <div class="d-flex">
          {#each $projectsInSelectedCategory as project}
            <ProjectSection {project} {index}></ProjectSection>
          {/each}
        </div>
      </div>
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
  .scroll-container {
    width: 100%;
    min-height: 50px; /* Ensure minimum height for OverlayScrollbars */
    flex-wrap: nowrap; /* Prevent wrapping */
    overflow-x: auto; /* Allow horizontal overflow */
  }
  .categoryItem {
    /* padding: 40px 20px; */
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    /* width: 100vw; */
    width: 100%;
    /* overflow: scroll; */
  }

  .categoryItem:hover {
    color: black;
  }

  .categoryTitle {
    font-size: clamp(3rem, 8vw, 8rem);
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
    /* width: auto;
    margin-left: 2rem;
    margin-bottom: 2rem;
    transform: scale(0.7);
    transform-origin: left center; */
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
  @media (max-width: 768px) {
    .categoryItem {
      padding: 20px 10px;
    }
  }
</style>
