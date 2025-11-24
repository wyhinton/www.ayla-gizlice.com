<script lang="ts">
  import {
    appState,
    projectsInSelectedCategory,
    uniqueCategories,
  } from "$lib/stores/projectStore";
  import { fade, fly } from "svelte/transition";
  import HorizontalScroll from "./HorizontalScroll.svelte";
  import ProjectSection from "./ProjectSection.svelte";
  import { isMobile } from "$lib/stores/uiStore";

  // $indexOfSelected
</script>

<div class:hidden={$appState.selectedCategory === null} class="gallery-wrapper">
  <HorizontalScroll
    height={"auto"}
    scrollbarHeight={"20px"}
    scrollbarColor="#2e2e2e99"
    scrollbarTrackColor="transparent"
    padding={"0"}
  >
    {#each $projectsInSelectedCategory as project, projectIndex}
      <div in:fade={{ duration: 500 }} out:fade={{ duration: 100 }}>
        <ProjectSection {project} index={0}></ProjectSection>
      </div>
    {/each}
  </HorizontalScroll>
</div>

<style>
  .hidden {
    pointer-events: none;
    padding: 0px !important;
  }
  .gallery-wrapper {
    position: absolute;
    top: 0px;
    height: -webkit-fill-available;
    overflow-y: auto;
    background: var(--bg);
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 125px;
    scrollbar-width: thin;
    scrollbar-color: #2e2e2e99 transparent;
  }

  /* @media (min-aspect-ratio: 1/1) {
    .gallery-wrapper {
      overflow-y: auto;
    }
  } */

  @media (min-width: 768px) and (min-aspect-ratio: 1/1) {
    .gallery-wrapper {
      width: 100%;
      overflow-y: hidden;
      top: 140px;
      top: 100px;
      z-index: 100;
      padding-left: 0px;
      padding-right: 0px;
      margin-right: 140px;
      background: transparent;
      padding-bottom: 0px;
    }
  }
</style>
