<script lang="ts">
  import type { Project } from "../../types";
  import { appState } from "$lib/stores/projectStore"; // assuming this contains selectedProjectIndex

  export let projects: Project[];

  // Scroll to the project section
  function scrollToProject(i: number) {
    console.log(`descriptionDiv_${i}`);
    const el = document.getElementById(`descriptionDiv_${i}`);
    console.log(el);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      //   appState.update((s) => ({ ...s, selectedProjectIndex: i }));
    }
  }
</script>

<div class="nav">
  {#each projects as _, i}
    <div
      class="item {$appState.selectedProjectIndex === i ? 'active' : ''}"
      on:click={() => scrollToProject(i)}
    >
      {i + 1}
    </div>
  {/each}
</div>

<style>
  .nav {
    display: flex;
    gap: 0.5rem;
  }

  .item {
    cursor: pointer;
    padding: 0.4rem 0.6rem;
    border-radius: 6px;
    font-weight: 600;
    opacity: 0.5;
    transition: 0.2s ease;
  }

  .item.active {
    opacity: 1;
    background: var(--accent-color);
    color: white;
  }

  .item:hover {
    opacity: 0.8;
  }
</style>
