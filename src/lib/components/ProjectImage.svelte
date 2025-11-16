<script lang="ts">
  import type { Project } from "../../types.js";

  export let image: { small: string; large: string; index: number };
  export let project: Project;
  export let sectionIndex: number;
</script>

<a
  class="lightBoxLink"
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

<style>
  .heroImage {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    cursor: pointer;
  }
</style>
