<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import type { Project } from "../../types.js";
  import PhotoSwipe from "photoswipe";
  import "photoswipe/style.css";

  export let image: { small: string; large: string; index: number };
  export let project: Project;
  export let sectionIndex: number;
  export let imageIndex: number;

  let mounted = false;
  let smallLoaded = false;

  // Use proxy for Google Photos/Drive images to avoid CORS and enable caching
  function getProxiedImageUrl(originalUrl: string): string {
    if (
      originalUrl.includes("googleusercontent.com") ||
      originalUrl.includes("googleapis.com")
    ) {
      return `/api/image-proxy?url=${encodeURIComponent(originalUrl)}`;
    }
    return originalUrl;
  }

  $: proxyImageUrl = getProxiedImageUrl(image.small);
  $: proxyLargeUrl = getProxiedImageUrl(image.large);
  $: imageSize = project.Image_Sizes?.[imageIndex];

  $: ghostStyle = imageSize
    ? `height: 600px; width: ${imageSize.small_width}px`
    : "";

  onMount(() => {
    mounted = true;
    console.log("PhotoSwipe component mounted");
  });

  async function openLightbox() {
    console.log(
      "Opening lightbox, PhotoSwipe available:",
      !!PhotoSwipe,
      "mounted:",
      mounted
    );

    if (!mounted) {
      console.log("Component not mounted yet, opening in new tab");
      window.open(proxyLargeUrl, "_blank");
      return;
    }

    try {
      // Get actual image dimensions
      // const dimensions = await getImageDimensions(proxyLargeUrl);
      // console.log("Image dimensions:", dimensions);

      const items = [
        {
          src: proxyLargeUrl,
          width: imageSize.large_width,
          height: imageSize.large_height,
          alt: project.project_name || "Ayla Gizlice Art",
        },
      ];

      const lightbox = new PhotoSwipe({
        dataSource: items,
        index: 0,
        bgOpacity: 0.9,
        showHideAnimationType: "fade",
        showAnimationDuration: 0,
        hideAnimationDuration: 300,
        // Add padding around the image
        padding: { top: 40, bottom: 40, left: 40, right: 40 },
        // Add some additional options
        preloaderDelay: 0,
        closeOnVerticalDrag: true,
        mouseMovePan: true,
        loop: false,
      });

      console.log("Initializing PhotoSwipe lightbox");
      lightbox.init();
    } catch (error) {
      console.error("Error opening PhotoSwipe:", error);
      // Fallback to new tab if there's an error
      window.open(proxyLargeUrl, "_blank");
    }
  }
</script>

<div
  class="h-auto position-relative d-flex align-items-center justify-content-center me-2"
  class:first={imageIndex === 0}
>
  {#if !smallLoaded}
    <div style={ghostStyle} class="ghost"></div>
  {/if}
  <button class="lightbox-trigger" type="button" on:click={openLightbox}>
    <div class="imager-wrapper">
      <!-- {JSON.stringify(imageSize)} -->
      <!-- {smallLoaded} -->

      <img
        class:visible={smallLoaded}
        class="heroImage"
        id="lightBoxImage_{sectionIndex}_{image.index}"
        src={proxyImageUrl}
        on:load={() => (smallLoaded = true)}
        alt={project.project_name || "Ayla Gizlice Art"}
        referrerPolicy="no-referrer"
        on:error={() => {
          console.warn("Image failed to load:", proxyImageUrl);
        }}
      />
    </div>
  </button>
</div>

<style>
  .heroImage {
    height: 100%;
    width: auto;
    max-width: 100%;
    object-fit: contain;
    cursor: pointer;
    max-height: 600px;
  }

  .lightbox-trigger {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: block;
  }

  .lightbox-trigger:hover .heroImage {
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }

  .image-wrapper {
    position: relative;
    width: 200px; /* or dynamic */
    height: 200px; /* or dynamic */
  }

  .ghost {
    /* width: 100%; */
    /* height: 100%; */
    background: #eee;
    border-radius: 8px;
    animation: pulse 1.2s infinite ease-in-out;
  }

  img {
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  img.visible {
    opacity: 1;
  }

  @keyframes pulse {
    0% {
      background-color: #eee;
    }
    50% {
      background-color: #ddd;
    }
    100% {
      background-color: #eee;
    }
  }
</style>
