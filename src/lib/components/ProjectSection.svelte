<script lang="ts">
  import { onMount } from "svelte";
  import {
    cleanGooglePhotosUrl,
    getProjectImages,
    hasProjectImages,
    type Project,
  } from "../../types.js";
  import ProjectDescription from "./ProjectDescription.svelte";
  import ProjectImage from "./ProjectImage.svelte";
  import { closeGallery, appState } from "$lib/stores/projectStore.js";
  import { fade } from "svelte/transition";

  export let project: Project;
  export let index: number;

  let sectionElement: HTMLElement;
  let visible: boolean = false;

  $: isInSelectedProject = project.category == $appState.selectedCategory;

  function getVideoUrl(project: Project): string {
    const videoUrl = project.Video_Link || "";
    return cleanGooglePhotosUrl(videoUrl);
  }

  function hasVideo(project: Project): boolean {
    const videoUrl = getVideoUrl(project);
    return !!videoUrl && videoUrl !== "empty";
  }

  // Get all existing images for this project
  $: projectImages = getProjectImages(project);
</script>

<div class="projectSectionWrapper">
  <!-- Close button - only show when a category is selected -->
  {#if $appState.selectedCategory !== null}
    <button
      class="close-button"
      on:click={(e) => {
        e.preventDefault();
        closeGallery();
      }}
      aria-label="Close gallery"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6L6 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6 6L18 18"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  {/if}

  <section
    class="section me-4"
    id="section_{index}"
    bind:this={sectionElement}
    class:visible={isInSelectedProject}
  >
    <div class="d-flex g-2" id="sectionElementContainer_{index}">
      <ProjectDescription {project} {index} />
      <div class="d-flex g-2">
        {#if hasProjectImages(project) || hasVideo(project)}
          {#each projectImages as image, imageIndex}
            <div>
              <ProjectImage
                {image}
                {project}
                sectionIndex={index}
                {imageIndex}
              />
            </div>
          {/each}

          <!-- {#if hasVideo(project)}
              <div class="videoDiv" id="videoDiv_{index}">
                <iframe
                  class="videoIframe"
                  id="videoIframe_{index}"
                  src={getVideoUrl(project)}
                  title="Project Video"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
            {/if} -->
        {/if}
      </div>
    </div>
  </section>
</div>

<style>
  .section {
    opacity: 0;
    transform: translateX(50px);
    transition:
      opacity 0.8s ease,
      transform 0.8s ease;
  }

  .section.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .close-button {
    position: fixed;
    top: 120px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid black;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .close-button:hover {
    background: rgba(0, 0, 0, 0.9);
    color: white;
    transform: scale(1.1);
  }

  .close-button:active {
    transform: scale(0.95);
  }

  .close-button svg {
    transition: transform 0.2s ease;
  }

  .close-button:hover svg {
    transform: rotate(90deg);
  }

  .videoDiv {
    width: 333px;
    height: 100%;
    padding-left: 15px;
    padding-right: 15px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .videoIframe {
    width: 100%;
    height: 60%;
    border: none;
  }

  /* Mobile responsive styles - now handled by Bootstrap utilities */
  @media (max-width: 768px) {
    .videoDiv {
      width: 100%;
      padding: 10px;
    }

    .close-button {
      top: 100px;
      right: 15px;
      width: 45px;
      height: 45px;
    }

    .close-button svg {
      width: 20px;
      height: 20px;
    }
  }
</style>
