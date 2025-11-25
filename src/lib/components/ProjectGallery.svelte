<script lang="ts">
  import {
    appState,
    projectsInSelectedCategory,
  } from "$lib/stores/projectStore";
  import { fade } from "svelte/transition";
  import HorizontalScroll from "./HorizontalScroll.svelte";
  import ProjectSection from "./ProjectSection.svelte";
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
        <ProjectSection {project} index={projectIndex}></ProjectSection>
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
    top: 65px;
    height: -webkit-fill-available;
    overflow-y: auto;
    background: var(--bg);
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 125px;
    scrollbar-width: thin;
    scrollbar-color: #2e2e2e99 transparent;
    padding-top: 20px;
  }
  @media (min-width: 768px) and (min-aspect-ratio: 1/1) {
    .gallery-wrapper {
      width: 100%;
      overflow-y: hidden;
      top: 200px;
      z-index: 100;
      padding-left: 0px;
      padding-right: 0px;
      margin-right: 140px;
      background: transparent;
      padding-bottom: 0px;
      padding-top: 0px;
    }
  }
</style>
