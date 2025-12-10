<script lang="ts">
  import { onMount } from "svelte";
  import type { Project } from "../../types.js";
  import {
    appState,
    getCloudflareImageUrl,
    setLightboxImage,
  } from "$lib/stores/projectStore.js";
  import GhostLoader from "./GhostLoader.svelte";

  export let image: { src: string; index: number };
  export let project: Project;
  export let sectionIndex: number;
  export let imageIndex: number;
  let imageLoaded = false;
  let imageLoadError = false; // Flag to prevent infinite retries
  let imgElement: HTMLImageElement;

  let MAX_IMAGE_HEIGHT: number;
  let MAX_IMAGE_WIDTH: number;

  const MAX_VH = 0.75;

  function updateMaxImageSizes() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    isLandscape = w > h;

    if (isLandscape) {
      // Landscape → height limited to 66% of viewport
      MAX_IMAGE_HEIGHT = Math.round(h * MAX_VH);
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

  $: isLandscape = window.innerWidth > window.innerHeight;

  // Use Cloudflare image resizing for optimal loading
  $: thumbnailUrl = getCloudflareImageUrl(
    image.src,
    isLandscape ? undefined : 800
  );

  $: imageSize = project.Image_Sizes?.[imageIndex];

  $: scaledImageSize = (() => {
    if (!imageSize) return null;

    const { small_width, small_height } = imageSize;
    if (!small_width || !small_height) return imageSize;

    // --- LANDSCAPE MODE ---
    if (isLandscape) {
      const scale = MAX_IMAGE_HEIGHT / small_height;
      return {
        ...imageSize,
        small_height: MAX_IMAGE_HEIGHT,
        small_width: Math.round(small_width * scale),
      };
    }

    // --- PORTRAIT MODE ---
    const scale = MAX_IMAGE_WIDTH / small_width;
    return {
      ...imageSize,
      small_width: Math.round(small_width * scale),
      small_height: Math.round(small_height * scale),
    };
  })();

  $: ghostStyle = scaledImageSize
    ? `width: ${scaledImageSize.small_width}px; height: ${scaledImageSize.small_height}px;`
    : "";

  function openLightbox() {
    setLightboxImage(`${sectionIndex}-${imageIndex}`);
  }
</script>

<div
  class="position-relative d-flex align-items-center justify-content-center"
  class:first={imageIndex === 0}
  style={`--max-image-height: ${MAX_IMAGE_HEIGHT}`}
>
  <button class="lightbox-trigger" type="button" on:click={openLightbox}>
    <div style={ghostStyle}>
      <GhostLoader loading={!imageLoaded}>
        <img
          bind:this={imgElement}
          class:hidden={$appState.selectedCategory === null || imageLoadError}
          class:visible={imageLoaded && !imageLoadError}
          class:landscape={isLandscape}
          class:portrait={!isLandscape}
          class="heroImage"
          style={`height: ${scaledImageSize?.small_height}px; width: ${scaledImageSize?.small_width}px;`}
          id="lightBoxImage_{sectionIndex}_{image.index}"
          src={thumbnailUrl}
          on:load={() => {
            imageLoaded = true;
            imageLoadError = false;
          }}
          alt={project.project_name || "Ayla Gizlice Art"}
          loading="lazy"
          on:error={(e) => {
            if (imageLoadError) {
              // Already tried fallback, stop retrying
              console.error(
                "Image failed to load even with fallback. Faulty image.src:",
                image.src,
                "\nProject:",
                project.project_name,
                "\nImage index:",
                imageIndex
              );
              return;
            }

            console.warn(
              "Image failed to load:",
              thumbnailUrl,
              "\nFaulty image.src:",
              image.src
            );
            imageLoadError = true;

            // Try fallback to original image path from production domain without Cloudflare processing
            const target = e.currentTarget as HTMLImageElement;
            target.src = `https://ayla-gizlice.com${image.src}`;
          }}
        />
      </GhostLoader>
    </div>
    <!-- <div class="ghost">
      <div class="image-wrapper">
        <img
          bind:this={imgElement}
          class:hidden={$appState.selectedCategory === null || imageLoadError}
          class:visible={imageLoaded && !imageLoadError}
          class:landscape={isLandscape}
          class:portrait={!isLandscape}
          class="heroImage"
          style={`height: ${scaledImageSize?.small_height}px; width: ${scaledImageSize?.small_width}px;`}
          id="lightBoxImage_{sectionIndex}_{image.index}"
          src={thumbnailUrl}
          on:load={() => {
            imageLoaded = true;
            imageLoadError = false;
          }}
          alt={project.project_name || "Ayla Gizlice Art"}
          loading="lazy"
          on:error={(e) => {
            if (imageLoadError) {
              // Already tried fallback, stop retrying
              console.error(
                "Image failed to load even with fallback. Faulty image.src:",
                image.src,
                "\nProject:",
                project.project_name,
                "\nImage index:",
                imageIndex
              );
              return;
            }

            console.warn(
              "Image failed to load:",
              thumbnailUrl,
              "\nFaulty image.src:",
              image.src
            );
            imageLoadError = true;

            // Try fallback to original image path from production domain without Cloudflare processing
            const target = e.currentTarget as HTMLImageElement;
            target.src = `https://ayla-gizlice.com${image.src}`;
          }}
        />
      </div>
    </div> -->
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
    transition: opacity 0.25s ease;
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
  }

  .ghost {
    background: #eee;
    border-radius: 8px;
    animation: pulse 1.2s infinite ease-in-out;
  }

  img {
    transition: opacity 0.25s ease;
  }

  img.visible {
    opacity: 1;
  }
</style>
