<!-- @ts-nocheck -->
<script lang="ts">
  import ProjectSection from "$lib/components/ProjectSection.svelte";
  import LandingArea from "$lib/components/LandingArea.svelte";
  import ProjectItem from "$lib/components/ProjectItem.svelte";
  import { onMount } from "svelte";
  import type { Project } from "../types.js";
  import {
    projects,
    loading,
    error,
    selectedProject,
    isGalleryOpen,
    galleryVisible,
    showProjectsList,
    loadProjects,
    selectProject as selectProjectAction,
    showGallery,
    closeGallery,
    setGalleryVisible,
  } from "$lib/stores/projectStore.js";

  export let data: any;
  let mainWrapper: HTMLElement;
  let sectionsContainer: HTMLElement;

  const GOOGLE_SHEETS_URL = "1ctMIVgrlfw0s9tYHcwuLuGjnrzI1YCaESEF18C4sIxM";

  onMount(async () => {
    // Fetch Google Sheets data using store
    await loadProjects(GOOGLE_SHEETS_URL);
  });

  function selectProject(project: Project, index: number) {
    selectProjectAction(project);

    // Animate gallery in
    setTimeout(() => {
      setGalleryVisible(true);
      if (mainWrapper) {
        mainWrapper.style.opacity = "1";
        mainWrapper.style.transform = "translate(0, 0)";
        mainWrapper.style.backgroundColor = "rgba(208, 208, 208, 1)";
      }
      if (sectionsContainer) {
        sectionsContainer.style.opacity = "1";
      }
    }, 100);
  }

  function showProjectGallery() {
    console.log("SHOWING PROJECT GALLERY");
    showGallery();

    // Animate gallery in
    setTimeout(() => {
      setGalleryVisible(true);
      if (mainWrapper) {
        mainWrapper.style.opacity = "1";
        mainWrapper.style.transform = "translate(0, 0)";
        mainWrapper.style.backgroundColor = "rgba(208, 208, 208, 1)";
      }
      if (sectionsContainer) {
        sectionsContainer.style.opacity = "1";
      }
    }, 100);
  }

  function handleCloseGallery() {
    setGalleryVisible(false);
    if (mainWrapper) {
      mainWrapper.style.opacity = "0";
      mainWrapper.style.transform = "translate(0, 100px)";
      mainWrapper.style.backgroundColor = "rgba(208, 208, 208, 0)";
    }
    if (sectionsContainer) {
      sectionsContainer.style.opacity = "0";
    }

    setTimeout(() => {
      closeGallery();
    }, 500);
  }

  function scrollToTop() {
    if (sectionsContainer) {
      sectionsContainer.scrollTo({ left: 0, behavior: "smooth" });
    }
  }
</script>

<svelte:head>
  <title>Ayla Gizlice - Projects</title>
</svelte:head>
<div
  on:click={(e) => {
    console.log("fff");
  }}
>
  <!-- Show video landing when no gallery is open and projects list is not shown -->
  <div
    on:click={(e) => {
      console.log("fff");
    }}
  >
    {#if !$isGalleryOpen && !$showProjectsList}
      <LandingArea onLandingClick={showProjectGallery} />
    {/if}
  </div>

  <!-- Projects List View -->
  {#if $showProjectsList && !$isGalleryOpen}
    <div id="projectsListContainer">
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
        {#each $projects as project, index}
          <ProjectItem {project} {index} onProjectClick={selectProject} />
        {/each}
      {/if}
    </div>
  {/if}

  {#if $isGalleryOpen}
    <div id="mainContentSection" class="testHeightEasingClass">
      <div class="testholder" id="testHolder">
        <div
          class="scrollTopButton"
          id="scrollTopButton"
          on:click={scrollToTop}
          on:keydown={(e) => e.key === "Enter" && scrollToTop()}
          role="button"
          tabindex="0"
          style="display: block;"
        ></div>

        <div
          class="closeButton"
          id="galleryCloseButton"
          on:click={handleCloseGallery}
          on:keydown={(e) => e.key === "Enter" && handleCloseGallery()}
          role="button"
          tabindex="0"
          style="display: block;"
        ></div>

        <div
          class="main-wrapper"
          on:click={(e) => {
            console.log(e);
          }}
          bind:this={mainWrapper}
        >
          <p id="mobileProjectNameDisplay">
            {$selectedProject?.project_name || ""}
          </p>

          <div
            class="sections"
            id="sectionContainer"
            bind:this={sectionsContainer}
            data-js="sections-wrapper"
          >
            {#if $selectedProject}
              <ProjectSection project={$selectedProject} index={0} />
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .scrollTopButton {
    background-image: url("/data/arrow_upward-24px.svg");
    background-size: 24px 24px;
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    cursor: pointer;
  }

  .closeButton {
    background-image: url("/data/highlight_off-24px.svg");
    background-size: 24px 24px;
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    cursor: pointer;
  }

  .scrollTopButton:hover,
  .closeButton:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  /* Loading, error, and empty state styles */
  .projectNameContainer.loading {
    animation: pulse 2s infinite;
    color: rgba(255, 255, 255, 0.8);
    cursor: default;
  }

  .projectNameContainer.error {
    background-color: rgba(255, 0, 0, 0.2);
    color: #ff6b6b;
    cursor: default;
    border: 1px solid rgba(255, 0, 0, 0.5);
  }

  .projectNameContainer.empty {
    color: rgba(255, 255, 255, 0.6);
    cursor: default;
    font-style: italic;
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

  /* Projects List View Styles */
  #projectsListContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    padding: 20px;
    background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
    z-index: 5;
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

  /* Responsive adjustments */
  @media (max-width: 768px) {
    #projectsListContainer {
      padding: 10px;
    }

    .projectListItem.loading,
    .projectListItem.error,
    .projectListItem.empty {
      padding: 20px 10px;
    }
  }
</style>
