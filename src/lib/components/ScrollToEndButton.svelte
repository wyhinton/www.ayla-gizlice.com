<script lang="ts">
  import { fade } from "svelte/transition";

  export let onClick: () => void;
  export let show: boolean = true;
</script>

{#if show}
  <div
    in:fade={{ duration: 100 }}
    out:fade={{ duration: 100 }}
    class="scroll-end-gradient"
    on:click={onClick}
  >
    <button class="scroll-end-btn">
      <svg
        class="btn-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"
        />
      </svg>
    </button>
  </div>
{/if}

<style>
  .scroll-end-btn {
    outline: 2px solid white;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.9);
    border: none;
    color: white;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    z-index: 10;
    transition: background 0.2s;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  }

  .scroll-end-btn:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  .scroll-end-gradient {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(62, 60, 74, 0) 50%,
      rgba(211, 211, 211, 0.4)
    );
    width: 50px;
    z-index: 9;
  }

  /* Hide on mobile */
  @media (max-width: 567px) {
    .scroll-end-btn,
    .scroll-end-gradient {
      display: none !important;
    }
  }
</style>
