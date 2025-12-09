<script lang="ts">
  import {
    getProjectImages,
    type Project,
  } from "../../types.js";
  import ProjectDescription from "./ProjectDescription.svelte";
  import ProjectImage from "./ProjectImage.svelte";
  import { closeGallery, appState } from "$lib/stores/projectStore.js";
  import CloseButton from "./CloseButton.svelte";
  import { isMobile, isPortrait } from "$lib/stores/uiStore.js";
  
export let project: Project;
  export let index: number;

  let sectionElement: HTMLElement;
  let visible: boolean = false;

  $: isInSelectedProject = project.category == $appState.selectedCategory;

  // Get all existing images for this project
  $: projectImages = getProjectImages(project);
</script>

<div class="projectSectionWrapper">
  <!-- Close button - only show when a category is selected -->
  {#if $appState.selectedCategory !== null && !$isMobile && !$isPortrait}
    <CloseButton
      onClick={(e) => {
        closeGallery();
      }}
    ></CloseButton>
  {/if}

  <section
    class="section"
    id="section_{index}"
    bind:this={sectionElement}
    class:visible={isInSelectedProject}
  >
    <div
      class="d-flex gap-4 ar-column ar-row"
      id="sectionElementContainer_{index}"
    >
      <ProjectDescription {project} {index} />
      <div class="d-flex ar-column ar-row gap-2">
        {#each projectImages as image, imageIndex}
          <div>
            <ProjectImage {image} {project} sectionIndex={index} {imageIndex} />
          </div>
        {/each}
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
</style>
