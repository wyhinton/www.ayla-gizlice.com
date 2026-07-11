<script lang="ts">
  export let show: boolean = false;
  export let onClick: () => void;

  function handleClick() {
    onClick();
  }
</script>

{#if show}
  <button class="scroll-start-btn" on:click={handleClick} aria-label="Scroll to previous section">
    <svg class="btn-svg" viewBox="0 0 24 24" width="24" height="24">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
    </svg>
  </button>
{/if}

<style>
  .scroll-start-btn {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.7);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: all 0.3s ease;
    z-index: 10;
    backdrop-filter: blur(10px);
  }

  .scroll-start-btn:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: translateY(-50%) scale(1.1);
  }

  .btn-svg {
    width: 24px;
    height: 24px;
    pointer-events: none;
  }

  /* Mobile positioning */
  @media (max-width: 768px) {
    .scroll-start-btn {
      left: 10px;
      width: 40px;
      height: 40px;
    }
    
    .btn-svg {
      width: 20px;
      height: 20px;
    }
  }
</style>
