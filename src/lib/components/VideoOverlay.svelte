<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let src: string;
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("click");
  }
</script>

<div class="overlay" on:click={handleClick}>
  <video class="video" {src} muted loop autoplay playsinline preload="auto"
  ></video>
</div>

<style>
  .overlay {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    overflow: hidden;
    background-color: var(--green);
  }

  .video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Prevent flicker on start */
    background: black;
    transform: translateZ(0); /* forces GPU stabilization */
    will-change: transform; /* prevents early-frame reflow */
  }
</style>
