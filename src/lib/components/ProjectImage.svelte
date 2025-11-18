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

  onMount(() => {
    mounted = true;
    console.log("PhotoSwipe component mounted");
  });

  // Function to get image dimensions
  function getImageDimensions(
    src: string
  ): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        // Fallback dimensions if image fails to load
        resolve({ width: 1920, height: 1080 });
      };
      img.src = src;
    });
  }

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
      const dimensions = await getImageDimensions(proxyLargeUrl);
      console.log("Image dimensions:", dimensions);

      const items = [
        {
          src: proxyLargeUrl,
          width: dimensions.width,
          height: dimensions.height,
          alt: project.project_name || "Ayla Gizlice Art",
        },
      ];

      const lightbox = new PhotoSwipe({
        dataSource: items,
        index: 0,
        bgOpacity: 0.9,
        showHideAnimationType: "fade",
        showAnimationDuration: 300,
        hideAnimationDuration: 300,
        // Add padding around the image
        padding: { top: 40, bottom: 40, left: 40, right: 40 },
        // Add some additional options
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
  in:fade={{ duration: 600, delay: imageIndex * 100 }}
>
  <button class="lightbox-trigger" type="button" on:click={openLightbox}>
    <img
      class="heroImage"
      id="lightBoxImage_{sectionIndex}_{image.index}"
      src={proxyImageUrl}
      alt={project.project_name || "Ayla Gizlice Art"}
      referrerPolicy="no-referrer"
      on:error={() => {
        console.warn("Image failed to load:", proxyImageUrl);
      }}
    />
  </button>
</div>

<style>
  .heroImage {
    height: 100%;
    width: auto;
    max-width: 100%;
    object-fit: contain;
    cursor: pointer;
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
</style>
