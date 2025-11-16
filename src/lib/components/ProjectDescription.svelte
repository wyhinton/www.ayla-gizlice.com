<script lang="ts">
  import type { Project } from "../../types.js";

  export let project: Project;
  export let index: number;
</script>

<div
  class="descriptionPaddingContainer py-0"
  id="descriptionPaddingContainer_{index}"
>
  <div class="descriptionDiv" id="descriptionDiv_{index}">
    <h2 class="project__title" id="title_{index}">
      {project.project_name || ""}
    </h2>
    <p class="projInfo" id="projInfo_{index}">
      {#if project.Mediums}{project.Mediums}<br />{/if}
      {#if project.Year}{project.Year}<br />{/if}
      {#if project.Collaborator && project.Collaborator !== "empty"}
        Made in collaboration with
        <a
          href={project.Collaborator_Link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.Collaborator}
        </a>
      {/if}
    </p>
    <p class="descriptionParagraph" id="descriptionParagraph_{index}">
      {@html project.project_description || ""}
    </p>
  </div>
</div>

<style>
  .descriptionPaddingContainer {
    padding: 20px;
    min-width: 300px;
  }

  .descriptionDiv {
    max-width: 300px;
    margin: 0 auto;
    text-align: left;
  }

  .sectionElementContainer {
    display: flex;
  }
  .project__title {
    text-align: left;
    border-bottom: 1px solid black;
    margin-bottom: 0px;
    line-height: 110%;
    font-size: 30px;
    margin-top: 0px;
  }

  .projInfo {
    font-size: 14px;
    color: black;
    margin: 0 0 16px 0;
    line-height: 1.4;
    font-style: italic;
  }

  .projInfo a {
    color: #007acc;
    text-decoration: none;
  }

  .projInfo a:hover {
    text-decoration: underline;
  }

  .descriptionParagraph {
    font-size: 16px;
    color: #1a1a1a;
    margin: 0;
  }

  @media (max-width: 768px) {
    .descriptionPaddingContainer {
      padding: 15px;
    }
  }
</style>
