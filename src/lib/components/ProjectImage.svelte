<script lang="ts">
  import { fade } from "svelte/transition";
  import type { Project } from "../../types.js";

  export let image: { small: string; large: string; index: number };
  export let project: Project;
  export let sectionIndex: number;
  export let imageIndex: number;
</script>

<div
  class="h-auto position-relative d-flex align-items-center justify-content-center me-2"
  class:first={imageIndex === 0}
  in:fade={{ duration: 600, delay: imageIndex * 100 }}
>
  <a
    class="lightBoxLink w-max-content"
    href={image.large}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      class="heroImage"
      id="lightBoxImage_{sectionIndex}_{image.index}"
      src={image.small}
      alt={project.project_name || "Ayla Gizlice Art"}
      referrerPolicy="no-referrer"
      loading="lazy"
      on:error={(e) => {
        console.warn("Image failed to load:", image.small);
        // Hide the container if image fails to load
        const target = e.target;
        const container = target?.parentElement?.parentElement?.parentElement;
        if (container) {
          container.style.display = "none";
        }
      }}
    />
  </a>
</div>

<style>
  .heroImage {
    height: 100%;
    width: auto;
    max-width: 100%;
    object-fit: contain;
    cursor: pointer;
  }
</style>
