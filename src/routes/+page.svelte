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
    closeGallery,
    selectCategory,
  } from "$lib/stores/projectStore";
  import ProjectGallery from "$lib/components/ProjectGallery.svelte";
  import { isMobile } from "$lib/stores/uiStore.js";
  import { fade } from "svelte/transition";
  import VideoOverlay from "$lib/components/VideoOverlay.svelte";
  import { afterNavigate, beforeNavigate } from "$app/navigation";

  export let data: any;

  let showVideo = true;
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

  let show = false;
  let ENABLE_MAP = false;

  onMount(() => {
    show = true;
  });
  afterNavigate((nav) => {
    console.log(`%cHERE LINE :43 %c`, "color: blue; font-weight: bold", "");
  });
  beforeNavigate((nav) => {
    console.log(nav.to);
    console.log(nav.to?.route.id);
    console.log(nav);
    console.log(nav.type === "popstate" && nav.to?.route.id === "/");
    if (nav.type === "popstate" && nav.to?.route.id === "/") {
      const url = nav.to?.url;
      if (!url) return;
      console.log(url);
      const category = url.searchParams.get("category");

      console.log("Back/forward nav detected. Category:", category);

      if (category) {
        selectCategory(category);
      } else {
        closeGallery();
      }
    }
  });
</script>

<svelte:head>
  <title>Ayla Gizlice - Projects</title>
</svelte:head>
<!-- <div class:d-none={!showVideo} out:fade={{ duration: 1000 }}> -->

<!-- </div> -->

<!-- Projects List View -->
<div id="projectsListContainer" style={containerStyle}>
  {#if show && showVideo && ENABLE_MAP}
    <VideoOverlay
      on:click={() => {
        showVideo = !showVideo;
      }}
      src="data/introVideo.mp4"
    ></VideoOverlay>
  {/if}

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
      {#if !$isMobile || ($isMobile && $appState.selectedCategory === null)}
        <ProjectCategory
          {projectName}
          {index}
          onProjectClick={handleProjectClick}
        />
        <!-- content here -->
      {/if}
    {/each}
    {#if $appState.selectedCategory !== null}
      <div in:fade={{ duration: 500 }}>
        <ProjectGallery></ProjectGallery>
      </div>

      <!-- content here -->
    {/if}

    <!-- content here -->
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
