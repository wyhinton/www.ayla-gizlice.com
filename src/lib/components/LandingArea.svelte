<!-- @ts-nocheck -->
<script lang="ts">
  import { onMount } from "svelte";

  export let onLandingClick: () => void;

  let landingAreaLoaded = false;

  onMount(() => {
    console.log(`%cHERE LINE :10 %c`, "color: yellow; font-weight: bold", "");

    // Add video and other initializations
    const video = document.getElementById("landingVideo") as HTMLVideoElement;
    if (video) {
      video.play().catch(console.error);
    }

    // Fade in landing area
    setTimeout(() => {
      landingAreaLoaded = true;
    }, 100);
  });

  function handleClick(e: MouseEvent) {
    console.log(
      `%cLandingArea clicked! %c`,
      "color: green; font-weight: bold",
      "",
      e
    );
    console.log("Event target:", e.target);
    console.log("Current target:", e.currentTarget);

    onLandingClick();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      handleClick();
    }
  }
</script>

<div
  id="landingArea"
  class:loaded={landingAreaLoaded}
  on:click={handleClick}
  on:keydown={handleKeydown}
  role="button"
  tabindex="0"
>
  <video
    class="landingVideo"
    id="landingVideo"
    src="/data/introVideo.mp4"
    autoplay
    muted
    loop
    playsinline
  ></video>
</div>

<style>
  #landingArea {
    position: relative !important;
    cursor: pointer;
    transition: all 0.8s ease;
    width: 100% !important;
    height: 100vh !important;
    opacity: 0;
    transform: scale(0.95);
    pointer-events: auto !important;
    z-index: 10 !important;
    overflow: visible !important;
  }

  #landingArea.loaded {
    opacity: 1;
    transform: scale(1);
  }

  #landingArea:hover {
    transform: scale(1.02);
  }

  .landingVideo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none; /* Prevent video from intercepting clicks */
  }
</style>
