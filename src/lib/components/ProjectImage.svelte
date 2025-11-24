<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import type { Project } from "../../types.js";
  import PhotoSwipe from "photoswipe";
  import "photoswipe/style.css";
  import { appState } from "$lib/stores/projectStore.js";
  import { isMobile } from "$lib/stores/uiStore.js";
  import CloseButton from "./CloseButton.svelte";

  export let image: { small: string; large: string; index: number };
  export let project: Project;
  export let sectionIndex: number;
  export let imageIndex: number;

  let mounted = false;
  let smallLoaded = false;

  let MAX_IMAGE_HEIGHT: number;
  let MAX_IMAGE_WIDTH: number;
  function updateMaxImageSizes() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    isLandscape = w > h;

    if (isLandscape) {
      // Landscape → height limited to 66% of viewport
      MAX_IMAGE_HEIGHT = Math.round(h * 0.66);
      console.log(MAX_IMAGE_HEIGHT);
      MAX_IMAGE_WIDTH = Infinity; // width shouldn't constrain
    } else {
      // Portrait → no height limit, images just fill width
      MAX_IMAGE_HEIGHT = Infinity;
      MAX_IMAGE_WIDTH = Math.round(w * 0.9);
    }
  }
  onMount(() => {
    updateMaxImageSizes();
    window.addEventListener("resize", updateMaxImageSizes);

    return () => {
      window.removeEventListener("resize", updateMaxImageSizes);
    };
  });

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
  $: isLandscape = window.innerWidth > window.innerHeight;
  $: proxyImageUrl = getProxiedImageUrl(image.small);
  $: proxyLargeUrl = getProxiedImageUrl(image.large);
  $: imageSize = project.Image_Sizes?.[imageIndex];

  $: scaledImageSize = (() => {
    if (!imageSize) return null;

    const { small_width, small_height } = imageSize;
    if (!small_width || !small_height) return imageSize;

    // --- LANDSCAPE MODE ---
    if (isLandscape) {
      // Force height = MAX_IMAGE_HEIGHT
      const scale = MAX_IMAGE_HEIGHT / small_height;

      return {
        ...imageSize,
        small_height: MAX_IMAGE_HEIGHT,
        small_width: Math.round(small_width * scale),
      };
    }

    // --- PORTRAIT MODE ---
    // Width should be 90vw (or MAX_IMAGE_WIDTH)
    const scale = MAX_IMAGE_WIDTH / small_width;

    return {
      ...imageSize,
      small_width: Math.round(small_width * scale),
      small_height: Math.round(small_height * scale),
    };
  })();

  $: ghostStyle = scaledImageSize
    ? `height: ${MAX_IMAGE_HEIGHT}px; width: ${scaledImageSize.small_width}px`
    : "";

  onMount(() => {
    mounted = true;
    updateMaxImageSizes();
    window.addEventListener("resize", updateMaxImageSizes);
    return () => window.removeEventListener("resize", updateMaxImageSizes);
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
        maxZoomLevel: 3,
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
  class=" position-relative d-flex align-items-center justify-content-center"
  class:first={imageIndex === 0}
  style={`--max-image-height: ${MAX_IMAGE_HEIGHT}`}
>
  <button class="lightbox-trigger" type="button" on:click={openLightbox}>
    <div class="imager-wrapper">
      <!-- {JSON.stringify(imageSize)} -->
      <!-- {smallLoaded} -->
      <div style={ghostStyle} class="ghost">
        <img
          class:hidden={$appState.selectedCategory === null}
          class:visible={smallLoaded}
          class:landscape={isLandscape}
          class:portrait={!isLandscape}
          class="heroImage"
          style={`height: ${scaledImageSize?.small_height}px; width: ${scaledImageSize?.small_width}px;`}
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
    </div>
  </button>
</div>

<style>
  .hidden {
    opacity: 0;
  }
  img.heroImage:not(.visible) {
    visibility: hidden;
  }
  .heroImage {
    max-width: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
  }

  /* Landscape → apply height limit */
  .heroImage.landscape {
    max-height: var(--max-image-height);
  }

  /* Portrait → width is the constraint */
  .heroImage.portrait {
    max-width: 90vw;
  }
  /* Force images to respect scaled width on mobile */
  @media (max-aspect-ratio: 1/1) {
    .heroImage {
      max-width: 90vw;
    }
  }
  @media (max-width: 768px) {
    .heroImage {
      max-width: 90vw;
    }
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
    /* opacity: 0; */
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
