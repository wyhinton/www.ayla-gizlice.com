<script lang="ts">
  export let onClick: (e: MouseEvent) => void;
</script>

<button class="close-button" on:click={onClick} aria-label="Close">
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</button>

<style>
  .close-button {
    position: relative;
    width: 20px;
    height: 20px;
    border: 2px solid black;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    background: black;
    color: white;
    padding: 0;
  }

  .close-button:hover {
    background: rgba(0, 0, 0, 0.9);
    color: white;
    transform: scale(1.1);
  }

  .close-button:active {
    transform: scale(0.95);
  }

  .close-button svg {
    transition: transform 0.2s ease;
    width: 12px;
    height: 12px;
  }

  .close-button:hover svg {
    transform: rotate(90deg);
  }
</style>
