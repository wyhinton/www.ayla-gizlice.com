<script lang="ts">
  import { onMount } from "svelte";
  import type { Project } from "../../types.js";
  import {
    getProjectImages,
    hasProjectImages,
    cleanGooglePhotosUrl,
  } from "../../types.js";
  import ProjectDescription from "./ProjectDescription.svelte";
  import ProjectImage from "./ProjectImage.svelte";

  export let project: Project;
  export let index: number;

  let sectionElement: HTMLElement;
  let visible: boolean = false;

  onMount(() => {
    // Animate in the section
    setTimeout(() => {
      visible = true;
    }, index * 100);
  });

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

<section
  class="section"
  id="section_{index}"
  bind:this={sectionElement}
  class:visible
>
  <div class="d-flex" id="sectionElementContainer_{index}">
    <ProjectDescription {project} {index} />

    {#if hasProjectImages(project) || hasVideo(project)}
      <div
        class="d-flex flex-row flex-md-row flex-column overflow-auto w-100 h-100"
        id="img_div{index}"
      >
        {#each projectImages as image, imageIndex}
          <div
            class="d-flex align-items-center justify-content-center px-3 px-md-3 p-sm-2"
            style="min-width: 333px; width: 333px; height: 100%;"
            id="imageContainerPadding{image.index}_{index}"
          >
            <div
              class="w-100 h-auto position-relative overflow-hidden bg-dark d-flex align-items-center justify-content-center"
              class:first={imageIndex === 0}
            >
              <ProjectImage {image} {project} sectionIndex={index} />
            </div>
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
      </div>
    {/if}
  </div>
</section>

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
  }
</style>
