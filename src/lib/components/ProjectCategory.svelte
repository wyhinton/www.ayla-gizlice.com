<!-- @ts-nocheck -->
<script lang="ts">
  import {
    projectsInSelectedCategory,
    selectCategory,
    uiState,
  } from "$lib/stores/projectStore.js";
  import type { Project } from "../../types.js";
  import ProjectSection from "./ProjectGallery.svelte";

  export let projectName: string;
  export let index: number;
  export let onProjectClick: (project: Project, index: number) => void;

  function handleClick() {
    console.log(`%cHERE LINE :12 %c`, "color: yellow; font-weight: bold", "");

    selectCategory(projectName);
    // onProjectClick(project, index);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      handleClick();
    }
  }
</script>

<div
  class="projectListItem"
  on:click={handleClick}
  on:keydown={handleKeydown}
  role="button"
  tabindex="0"
>
  {#if !$uiState.selectedCategory || $uiState.selectedCategory == projectName}
    <h1 class="projectTitle">
      {projectName || `Project ${index + 1}`}
    </h1>
  {/if}
  {$projectsInSelectedCategory.length}
  {#if $uiState.selectedCategory == projectName && $projectsInSelectedCategory.length > 0}
    {#each $projectsInSelectedCategory as project}
      <ProjectSection {project} {index}></ProjectSection>
    {/each}
  {/if}
</div>

<style>
  .projectListItem {
    margin: 20px 0;
    padding: 40px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
  }

  .projectListItem:hover {
    color: black;
  }

  .projectTitle {
    font-size: clamp(3rem, 8vw, 8rem);
    /* font-weight: bold; */
    font-weight: 400;
    font-family: "auto";
    color: rgb(208, 208, 208);
    -webkit-text-stroke: 1px black;
    margin: 0;
    line-height: 0.9;
    letter-spacing: -0.02em;
  }

  .projectCategory {
    font-size: clamp(1.5rem, 4vw, 4rem);
    font-weight: normal;
    color: #666;
    margin: 10px 0 0 0;
    line-height: 1;
    letter-spacing: 0.05em;
    opacity: 0.8;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .projectListItem {
      padding: 20px 10px;
    }
  }
</style>
