<!-- @ts-nocheck -->
<script lang="ts">
  import ProjectCategory from "$lib/components/ProjectCategory.svelte";
  import { onMount } from "svelte";
  import type { Project } from "../types.js";
  import {
    projects,
    loading,
    error,
    loadProjects,
    uniqueCategories,
    appState,
  } from "$lib/stores/projectStore";
  import ProjectGallery from "$lib/components/ProjectGallery.svelte";
  import { isMobile } from "$lib/stores/uiStore.js";

  export let data: any;

  // Projects are now loaded globally in +layout.svelte
  $: containerStyle = !$isMobile
    ? `margin-top: 90px`
    : $isMobile && $appState.selectedCategory === null
      ? "margin-top: 90px"
      : `margin-top: 80px`;
  function handleProjectClick(project: Project, index: number) {
    console.log("Project clicked:", project.project_name);
    // Add project click logic here if needed
  }
</script>

<svelte:head>
  <title>Ayla Gizlice - Projects</title>
</svelte:head>

<!-- Projects List View -->
<div id="projectsListContainer" style={containerStyle}>
  {#if $loading}
    <div class="projectListItem loading">
      <h1 class="projectTitle">Loading projects...</h1>
    </div>
  {:else if $error}
    <div class="projectListItem error">
      <h1 class="projectTitle">Error loading projects: {$error}</h1>
    </div>
  {:else if $projects.length === 0}
    <div class="projectListItem empty">
      <h1 class="projectTitle">No projects found</h1>
    </div>
  {:else}
    {#each $uniqueCategories as projectName, index}
      <ProjectCategory
        {projectName}
        {index}
        onProjectClick={handleProjectClick}
      />
    {/each}
    <ProjectGallery></ProjectGallery>
  {/if}
</div>

<style>
  @media (min-width: 567px) {
    #projectsListContainer {
      width: 100%;
      min-height: 100vh;
    }
  }

  /* Projects List View Styles */
  #projectsListContainer {
    width: 100%;
    min-height: 100vh;
  }

  .projectListItem.loading,
  .projectListItem.error,
  .projectListItem.empty {
    cursor: default;
    margin: 20px 0;
    padding: 40px 20px;
    text-align: center;
  }

  .projectListItem.loading .projectTitle,
  .projectListItem.error .projectTitle,
  .projectListItem.empty .projectTitle {
    animation: pulse 2s infinite;
    font-size: clamp(3rem, 8vw, 8rem);
    color: rgb(208, 208, 208);
    -webkit-text-stroke: 1px black;
    margin: 0;
    line-height: 0.9;
    letter-spacing: -0.02em;
  }

  .projectListItem.error .projectTitle {
    color: #d32f2f;
    -webkit-text-stroke: 2px #ffcdd2;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  /* Responsive adjustments */
  @media (min-width: 768px) {
    #projectsListContainer {
      /* padding: 60px 10px 10px; */
    }

    .projectListItem.loading,
    .projectListItem.error,
    .projectListItem.empty {
      padding: 20px 10px;
    }
  }
</style>
