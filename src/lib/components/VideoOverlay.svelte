<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let src: string;
  const dispatch = createEventDispatcher();

  let videoReady = false;
  let videoElement: HTMLVideoElement;

  function handleClick() {
    dispatch("click");
  }

  function handleVideoCanPlay() {
    videoReady = true;
  }

  function handleVideoError() {
    videoReady = false;
  }
</script>

<div class="overlay" on:click={handleClick}>
  <video
    bind:this={videoElement}
    class="video"
    class:loaded={videoReady}
    {src}
    muted
    loop
    autoplay
    playsinline
    preload="auto"
    on:canplay={handleVideoCanPlay}
    on:error={handleVideoError}
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
    /* Show green background until video is loaded */
    background: var(--green);
    transform: translateZ(0); /* forces GPU stabilization */
    will-change: transform; /* prevents early-frame reflow */
    /* Initially hidden until loaded */
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .video.loaded {
    opacity: 1;
  }
</style>
