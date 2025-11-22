<script lang="ts">
  import {
    appState,
    projectsInSelectedCategory,
    uniqueCategories,
  } from "$lib/stores/projectStore";
  import { fade, fly } from "svelte/transition";
  import HorizontalScroll from "./HorizontalScroll.svelte";
  import ProjectSection from "./ProjectSection.svelte";
  // $indexOfSelected
</script>

<div class:hidden={$appState.selectedCategory === null} class="scroll-wrapper">
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
  }
  .scroll-wrapper {
    width: 100%;
    position: absolute;
    top: 140px;
    z-index: 100;
    /* margin-left: var(--page-margin); */
    margin-right: 140px;
    /* --svrollbar-track-width: 20px;
    --svrollbar-track-background: #ec4f27;
    --svrollbar-track-opacity: 1;

    --svrollbar-thumb-width: 10px;
    --svrollbar-thumb-background: orange;
    --svrollbar-thumb-opacity: 1; */
  }
</style>
