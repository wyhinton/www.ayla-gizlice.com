<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import {
    appState,
    projectsInSelectedCategory,
    setLightboxImage,
  } from "$lib/stores/projectStore.js";
  import { pushState } from "$app/navigation";
  import { getProjectImages, type Project } from "../../types.js";
  import { fade, scale } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  interface FlatImage {
    id: string; // "sectionIndex-imageIndex"
    src: string;
    alt: string;
    projectName: string;
  }

  // Build flat list of all images from all projects in selected category
  $: allImages = buildImageList(
    $projectsInSelectedCategory,
    $appState.lightboxImage
  );

  function buildImageList(projects: Project[], lb: string | null): FlatImage[] {
    const images: FlatImage[] = [];
    projects.forEach((project, sectionIndex) => {
      const projectImages = getProjectImages(project);
      projectImages.forEach((img, imageIndex) => {
        images.push({
          id: `${sectionIndex}-${imageIndex}`,
          src: img.src,
          alt: project.project_name || "Ayla Gizlice Art",
          projectName: project.project_name,
        });
      });
    });
    return images;
  }

  // Get lightbox state from store
  $: lightboxImageId = $appState.lightboxImage;
  $: isOpen = $appState.lightboxImage !== null;

  // Find current index in flat list
  $: currentIndex = lightboxImageId
    ? allImages.findIndex((img) => img.id == lightboxImageId)
    : -1;

  $: currentImage = currentIndex >= 0 ? allImages[currentIndex] : null;
  $: fullResUrl = currentImage
    ? getCloudflareImageUrl(currentImage.src, undefined, 90)
    : "";

  let imageLoaded = false;
  let imageError = false;
  let zoomLevel = 1;
  let isPanning = false;
  let wasPanning = false;
  let panStart = { x: 0, y: 0 };
  let panOffset = { x: 0, y: 0 };

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 4;
  const ZOOM_STEP = 0.25;

  /**
   * Generate Cloudflare Image Resizing URL
   */

  /**
   * Generate Cloudflare Image Resizing URL
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
    options.push("format=auto");
    const productionDomain = "https://ayla-gizlice.com";
    return `${productionDomain}/cdn-cgi/image/${options.join(",")}${imagePath}`;
  }

  // Reset image state when image changes
  $: if (lightboxImageId) {
    imageLoaded = false;
    imageError = false;
    zoomLevel = 1;
    panOffset = { x: 0, y: 0 };
  }

  // Manage body scroll
  $: if (browser) {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  function close() {
    // Don't close if user was just panning
    if (wasPanning) {
      wasPanning = false;
      return;
    }

    setLightboxImage(null);

    if (browser) {
      const url = new URL(window.location.href);
      url.searchParams.delete("project-image");
      pushState(url, {});
    }
  }

  function next() {
    if (allImages.length === 0) return;
    const nextIndex = (currentIndex + 1) % allImages.length;
    const nextImage = allImages[nextIndex];
    appState.update((s) => ({ ...s, lightboxImage: nextImage.id }));
    updateUrlParam(nextImage.id);
  }

  function prev() {
    if (allImages.length === 0) return;
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    const prevImage = allImages[prevIndex];
    appState.update((s) => ({ ...s, lightboxImage: prevImage.id }));
    updateUrlParam(prevImage.id);
  }

  function updateUrlParam(id: string) {
    if (browser) {
      const url = new URL(window.location.href);
      url.searchParams.set("project-image", id);
      pushState(url, {});
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!isOpen) return;

    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "+" || e.key === "=") zoomIn();
    if (e.key === "-" || e.key === "_") zoomOut();
    if (e.key === "0") resetZoom();
  }

  function zoomIn() {
    zoomLevel = Math.min(MAX_ZOOM, zoomLevel + ZOOM_STEP);
  }

  function zoomOut() {
    zoomLevel = Math.max(MIN_ZOOM, zoomLevel - ZOOM_STEP);
    // Reset pan if zoomed out to 1 or less
    if (zoomLevel <= 1) {
      panOffset = { x: 0, y: 0 };
    }
  }

  function resetZoom() {
    zoomLevel = 1;
    panOffset = { x: 0, y: 0 };
  }

  function handleWheel(e: WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    zoomLevel = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoomLevel + delta));

    if (zoomLevel <= 1) {
      panOffset = { x: 0, y: 0 };
    }
  }

  function handleMouseDown(e: MouseEvent) {
    if (zoomLevel > 1 && (e.target as HTMLElement).tagName === "IMG") {
      isPanning = true;
      wasPanning = false;
      panStart = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
    }
  }

  function handleMouseMove(e: MouseEvent) {
    if (isPanning) {
      wasPanning = true;
      panOffset = {
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      };
    }
  }

  function handleMouseUp() {
    isPanning = false;
  }

  function handleTouchStart(e: TouchEvent) {
    if (zoomLevel > 1 && e.touches.length === 1) {
      isPanning = true;
      wasPanning = false;
      panStart = {
        x: e.touches[0].clientX - panOffset.x,
        y: e.touches[0].clientY - panOffset.y,
      };
    }
  }

  function handleTouchMove(e: TouchEvent) {
    if (isPanning && e.touches.length === 1) {
      e.preventDefault();
      wasPanning = true;
      panOffset = {
        x: e.touches[0].clientX - panStart.x,
        y: e.touches[0].clientY - panStart.y,
      };
    }
  }

  function handleTouchEnd() {
    isPanning = false;
  }

  onMount(() => {
    if (!browser) return;
    window.addEventListener("keydown", handleKeydown);
  });

  onDestroy(() => {
    if (!browser) return;
    window.removeEventListener("keydown", handleKeydown);
    document.body.style.overflow = "";
  });
</script>

{#if isOpen && currentImage}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="lightbox-overlay"
    on:click={close}
    transition:fade={{ duration: 200 }}
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="lightbox-dialog"
      on:click|stopPropagation
      in:fade={{ duration: 500 }}
    >
      <button
        class="lightbox-close"
        type="button"
        on:click={close}
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <!-- Zoom Controls -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div class="zoom-controls" on:click|stopPropagation>
        <button
          class="zoom-button"
          type="button"
          on:click={zoomIn}
          disabled={zoomLevel >= MAX_ZOOM}
          aria-label="Zoom in"
          title="Zoom in (+)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>

        <button
          class="zoom-button"
          type="button"
          on:click={resetZoom}
          disabled={zoomLevel === 1 && panOffset.x === 0 && panOffset.y === 0}
          aria-label="Reset view"
          title="Reset zoom and pan (0)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
        </button>

        <button
          class="zoom-button zoom-level-button"
          type="button"
          on:click={resetZoom}
          disabled={zoomLevel === 1}
          aria-label="Current zoom level"
          title="Click to reset zoom"
        >
          <span class="zoom-level">{Math.round(zoomLevel * 100)}%</span>
        </button>

        <button
          class="zoom-button"
          type="button"
          on:click={zoomOut}
          disabled={zoomLevel <= MIN_ZOOM}
          aria-label="Zoom out"
          title="Zoom out (-)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
      </div>

      {#if allImages.length > 1}
        <button
          class="lightbox-nav lightbox-prev"
          type="button"
          on:click={prev}
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      {/if}

      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="image-container"
        on:wheel={handleWheel}
        on:mousedown={handleMouseDown}
        on:mousemove={handleMouseMove}
        on:mouseup={handleMouseUp}
        on:mouseleave={handleMouseUp}
        on:touchstart={handleTouchStart}
        on:touchmove={handleTouchMove}
        on:touchend={handleTouchEnd}
        style="cursor: {zoomLevel > 1
          ? isPanning
            ? 'grabbing'
            : 'grab'
          : 'default'}"
      >
        <figure
          class="lightbox-figure"
          transition:scale={{ duration: 250, easing: cubicOut, start: 0.95 }}
        >
          {#if !imageLoaded && !imageError}
            <div class="lightbox-loader">
              <div class="spinner"></div>
            </div>
          {/if}

          {#if imageError}
            <div class="lightbox-error">
              <p>Failed to load image</p>
            </div>
          {:else}
            <img
              class="lightbox-image"
              class:loaded={imageLoaded}
              class:zoomed={zoomLevel > 1}
              src={fullResUrl}
              alt={currentImage.alt}
              on:load={() => (imageLoaded = true)}
              on:error={(e) => {
                // Try fallback to original image path from production domain without Cloudflare processing
                const target = e.currentTarget as HTMLImageElement;
              }}
              draggable="false"
              loading="lazy"
              style="transform: scale({zoomLevel}) translate({panOffset.x /
                zoomLevel}px, {panOffset.y /
                zoomLevel}px); transition: {isPanning
                ? 'none'
                : 'transform 0.2s ease-out'};"
            />
          {/if}

          <div class="lightbox-info d-flex w-100 justify-content-between">
            <div class="lightbox-title">{currentImage.projectName}</div>
            {#if allImages.length > 1}
              <div class="lightbox-counter">
                {currentIndex + 1} / {allImages.length}
              </div>
            {/if}
          </div>
        </figure>
      </div>

      {#if allImages.length > 1}
        <button
          class="lightbox-nav lightbox-next"
          type="button"
          on:click={next}
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      {/if}
    </div>
  </div>
{/if}

<style>
  .lightbox-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.92);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
  }

  .lightbox-dialog {
    position: relative;
    max-width: 95vw;
    max-height: 95vh;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #fff;
    cursor: default;
  }

  .lightbox-figure {
    margin: 0;
    max-width: 85vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .lightbox-image {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.5s ease;
    user-select: none;
    -webkit-user-drag: none;
  }

  .lightbox-image.loaded {
    opacity: 1;
  }

  .lightbox-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    min-height: 60vh;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .lightbox-error {
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    padding: 2rem;
  }

  .lightbox-info {
    margin-top: 1rem;
    gap: 0.25rem;
  }

  .lightbox-title {
    font-size: 0.95rem;
    opacity: 0.9;
  }

  .lightbox-counter {
    font-size: 0.8rem;
    opacity: 0.6;
  }

  .lightbox-close {
    position: absolute;
    top: -3rem;
    right: 0;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    transition:
      background 0.2s ease,
      transform 0.2s ease;
  }

  .lightbox-close:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
  }

  .zoom-controls {
    position: absolute;
    bottom: -3rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .zoom-button {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 6px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    transition:
      background 0.2s ease,
      transform 0.2s ease,
      opacity 0.2s ease;
  }

  .zoom-button:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
  }

  .zoom-button:active:not(:disabled) {
    transform: scale(0.95);
  }

  .zoom-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .zoom-level-button {
    min-width: 60px;
  }

  .zoom-level {
    font-size: 0.75rem;
    font-weight: 600;
    min-width: 45px;
    text-align: center;
  }

  .lightbox-image.zoomed {
    cursor: grab;
  }

  .lightbox-image.zoomed:active {
    cursor: grabbing;
  }

  .lightbox-nav {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    user-select: none;
    transition:
      background 0.2s ease,
      transform 0.2s ease;
    flex-shrink: 0;
  }

  .lightbox-nav:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.1);
  }

  .lightbox-nav:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    .lightbox-dialog {
      flex-direction: column;
      gap: 0.5rem;
    }

    .lightbox-figure {
      max-width: 95vw;
      order: 1;
    }

    .lightbox-close {
      top: -2.5rem;
      right: 0;
      width: 36px;
      height: 36px;
    }

    .zoom-controls {
      bottom: -2.5rem;
    }

    .zoom-button {
      width: 32px;
      height: 32px;
    }

    .zoom-level {
      font-size: 0.7rem;
      min-width: 40px;
    }

    .lightbox-nav {
      width: 40px;
      height: 40px;
    }

    .lightbox-prev {
      order: 2;
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
    }

    .lightbox-next {
      order: 3;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }

    .lightbox-prev:hover,
    .lightbox-next:hover {
      transform: translateY(-50%) scale(1.1);
    }
  }
</style>
