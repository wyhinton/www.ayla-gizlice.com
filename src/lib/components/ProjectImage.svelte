<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import type { Project } from "../../types.js";
  import PhotoSwipe from "photoswipe";
  import "photoswipe/style.css";
  import { appState } from "$lib/stores/projectStore.js";
  import { pushState } from "$app/navigation";

  export let image: { src: string; index: number };
  export let project: Project;
  export let sectionIndex: number;
  export let imageIndex: number;
  const imageId = `${sectionIndex}-${imageIndex}`;
  let mounted = false;
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

  let unsubscribe: () => void;

  onMount(() => {
    unsubscribe = appState.subscribe((state) => {
      if (state.loading) return;

      if (state.lightboxImage === imageId) {
        // open the lightbox for THIS image
        openLightbox();

        // clear the trigger so it doesn't repeat
        appState.update((s) => ({ ...s, lightboxImage: undefined }));
      }
    });
  });

  onDestroy(() => {
    unsubscribe?.();
  });

  /**
   * Generate Cloudflare Image Resizing URL
   * @param imagePath - Path to the image (e.g., /images/artworks/image.jpg)
   * @param width - Desired width
   * @param quality - Image quality (default: 85)
   */
  function getCloudflareImageUrl(
    imagePath: string,
    width?: number,
    quality: number = 85
  ): string {
    const options = [];

    if (width) {
      options.push(`width=${width}`);
    }
    options.push(`quality=${quality}`);
    options.push("format=auto"); // Automatically choose best format (WebP, AVIF, etc.)

    // Always use production domain for images
    const productionDomain = "https://ayla-gizlice.com";
    const cloudFlareImageUrl = `${productionDomain}/cdn-cgi/image/${options.join(",")}${imagePath}`;
    // Cloudflare Image Resizing format: /cdn-cgi/image/[options]/[image-path]
    console.log(imagePath);
    console.log(cloudFlareImageUrl);
    return cloudFlareImageUrl;
  }

  function setUrlParam(key: string, value: string) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    pushState(url, {});
  }

  $: isLandscape = window.innerWidth > window.innerHeight;

  // Use Cloudflare image resizing for optimal loading
  $: thumbnailUrl = getCloudflareImageUrl(
    image.src,
    isLandscape ? undefined : 800
  );
  $: fullResUrl = getCloudflareImageUrl(image.src, 2000, 90); // High quality for lightbox

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
    ? `width: ${scaledImageSize.small_width}px; height: ${scaledImageSize.small_height}px;`
    : "";

  onMount(() => {
    mounted = true;
    updateMaxImageSizes();
    window.addEventListener("resize", updateMaxImageSizes);
    return () => window.removeEventListener("resize", updateMaxImageSizes);
  });

  async function getImageDimensions(
    src: string
  ): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () =>
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = reject;
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
      window.open(fullResUrl, "_blank");
      return;
    }

    try {
      // Get actual image dimensions
      const dimensions = await getImageDimensions(fullResUrl);
      console.log("Image dimensions:", dimensions);

      const items = [
        {
          src: fullResUrl,
          width: dimensions.width,
          height: dimensions.height,
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
      console.log(imageId);
      console.log("Initializing PhotoSwipe lightbox");
      setUrlParam("project-image", imageId);
      lightbox.on("close", () => {
        const url = new URL(window.location.href);
        url.searchParams.delete("project-image");
        pushState(url, {});
      });
      lightbox.init();
    } catch (error) {
      console.error("Error opening PhotoSwipe:", error);
      // Fallback to new tab if there's an error
      window.open(fullResUrl, "_blank");
    }
  }
</script>

<!-- {JSON.stringify(scaledImageSize)} -->
<!-- {JSON.stringify(scaledImageSize)} -->
<div
  class="position-relative d-flex align-items-center justify-content-center"
  class:first={imageIndex === 0}
  style={`--max-image-height: ${MAX_IMAGE_HEIGHT}`}
>
  <button class="lightbox-trigger" type="button" on:click={openLightbox}>
    <div class="ghost" style={ghostStyle}>
      <div class="image-wrapper">
        <!-- Loading skeleton/ghost -->

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
</style>
