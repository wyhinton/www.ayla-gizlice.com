<!-- @ts-nocheck -->
<script lang="ts">
  import ProjectCategory from "$lib/components/ProjectCategory.svelte";
  import { onMount } from "svelte";
  import {
    projects,
    loading,
    error,
    uniqueCategories,
    appState,
  } from "$lib/stores/projectStore";
  import ProjectGallery from "$lib/components/ProjectGallery.svelte";
  import { isMobile } from "$lib/stores/uiStore.js";
  import { fade } from "svelte/transition";
  import VideoOverlay from "$lib/components/VideoOverlay.svelte";
  import Lightbox from "$lib/components/Lightbox.svelte";

  let showVideo = true;
  // Projects are now loaded globally in +layout.svelte
  $: containerStyle = !$isMobile
    ? `margin-top: 90px`
    : $isMobile && $appState.selectedCategory === null
      ? "margin-top: 90px"
      : `margin-top: 80px`;

  let show = false;
  let ENABLE_MAP = false;

  onMount(() => {
    show = true;
  });
</script>

<svelte:head>
  <title>Ayla Gizlice - Projects</title>
</svelte:head>

<div
  transition:fade={{ duration: 1000, delay: 1000 }}
  class:overflow-y-hidden={$appState.selectedCategory !== null}
  class:overflow-y-auto={$appState.selectedCategory === null}
  class=" project-list-wrapper overflow-x-hidden h-100-vh"
>
  <div id="projects-list-container" style={containerStyle}>
    {#if show && showVideo && ENABLE_MAP}
      <VideoOverlay
        on:click={() => {
          showVideo = !showVideo;
        }}
        src="data/introVideo.mp4"
      ></VideoOverlay>
    {/if}

    {#if $loading}
      <div class="project-list-item loading">
        <h1 class="project-title">Loading projects...</h1>
      </div>
    {:else if $error}
      <div class="project-list-item error">
        <h1 class="project-title">Error loading projects: {$error}</h1>
      </div>
    {:else if $projects.length === 0}
      <div class="project-list-item empty">
        <!-- <h1 class="project-title">No projects found</h1> -->
      </div>
    {:else}
      {#each $uniqueCategories as projectName, index}
        {#if !$isMobile || ($isMobile && $appState.selectedCategory === null)}
          <ProjectCategory {projectName} {index} />
        {/if}
      {/each}
      {#if $appState.selectedCategory !== null}
        <div in:fade={{ duration: 500 }}>
          <ProjectGallery></ProjectGallery>
        </div>
      {/if}
    {/if}
    <Lightbox></Lightbox>
  </div>
</div>

<style>
  /* Projects List View Styles */
  #projects-list-container {
    width: 100%;
    padding-bottom: 40px;
  }

  .project-list-item.loading,
  .project-list-item.error,
  .project-list-item.empty {
    cursor: default;
    margin: 20px 0;
    padding: 40px 20px;
    text-align: center;
  }

  .project-list-item.loading .project-title,
  .project-list-item.error .project-title,
  .project-list-item.empty .project-title {
    animation: pulse 2s infinite;
    font-size: clamp(3rem, 8vw, 8rem);
    color: rgb(208, 208, 208);
    -webkit-text-stroke: 1px black;
    margin: 0;
    line-height: 0.9;
    letter-spacing: -0.02em;
  }

  .project-list-item.error .project-title {
    color: #d32f2f;
    -webkit-text-stroke: 2px #ffcdd2;
  }

  /* Responsive adjustments */
  @media (min-width: 768px) {
    #projects-list-container {
      /* padding: 60px 10px 10px; */
    }

    .project-list-item.loading,
    .project-list-item.error,
    .project-list-item.empty {
      padding: 20px 10px;
    }
  }
</style>
