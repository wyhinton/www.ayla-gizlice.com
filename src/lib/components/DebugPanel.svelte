<!-- @ts-nocheck -->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { dev } from "$app/environment";
  import { appState } from "../stores/projectStore.js";
  // Import Prism CSS and JavaScript language support
  // import "prismjs/themes/prism-tomorrow.css";
  // import "prismjs/components/prism-json.min.js";
  // import Prism from "prismjs";
  let isVisible = false;
  let appStateValue: any = {};
  let unsubscribeApp: (() => void) | null = null;
  let Prism: any = null;
  // Subscribe to store changes
  function subscribeToStores() {
    if (unsubscribeApp) unsubscribeApp();

    unsubscribeApp = appState.subscribe((value) => {
      appStateValue = value;
    });
  }

  function handleKeydown(event: KeyboardEvent) {
    // Check for Ctrl+Shift+Space
    if (event.ctrlKey && event.shiftKey && event.code === "KeyF") {
      event.preventDefault();
      toggleDebugPanel();
    }
  }

  function toggleDebugPanel() {
    isVisible = !isVisible;
    if (isVisible) {
      // Re-highlight syntax when panel becomes visible
      setTimeout(() => {
        Prism.highlightAll();
      }, 0);
    }
  }

  function formatStateForDisplay(state: any) {
    return JSON.stringify(state, null, 2);
  }

  onMount(async () => {
    if (dev && browser) {
      const module = await import("prismjs");
      Prism = module.default ?? module;
      await import("prismjs/themes/prism-tomorrow.css");
      //@ts-ignore
      await import("prismjs/components/prism-json.min.js");

      subscribeToStores();
      document.addEventListener("keydown", handleKeydown);
    }
  });

  onDestroy(() => {
    if (browser) {
      document.removeEventListener("keydown", handleKeydown);
      if (unsubscribeApp) unsubscribeApp();
    }
  });
</script>

{#if dev && isVisible}
  <div class="debug-panel">
    <div class="debug-header">
      <h3>🐛 Store Debug Panel</h3>
      <button class="close-btn" on:click={() => (isVisible = false)}>×</button>
    </div>

    <div class="debug-content">
      <div class="state-section">
        <h4>🏪 App State</h4>
        <pre><code class="language-json"
            >{formatStateForDisplay(appStateValue)}</code
          ></pre>
      </div>
    </div>

    <div class="debug-footer">
      <small
        >Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Space</kbd> to toggle</small
      >
    </div>
  </div>
{/if}

<style>
  .debug-panel {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 400px;
    max-height: 80vh;
    background: rgba(40, 44, 52, 0.95);
    border: 1px solid #61dafb;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    font-family: "Fira Code", "Monaco", "Menlo", monospace;
    backdrop-filter: blur(10px);
    overflow: hidden;
  }

  .debug-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #61dafb;
    color: #282c34;
    border-bottom: 1px solid #4fa8c5;
  }

  .debug-header h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 20px;
    color: #282c34;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .close-btn:hover {
    background: rgba(40, 44, 52, 0.1);
  }

  .debug-content {
    max-height: calc(80vh - 100px);
    overflow-y: auto;
    padding: 0;
  }

  .state-section {
    padding: 16px;
    border-bottom: 1px solid #4a5568;
  }

  .state-section:last-child {
    border-bottom: none;
  }

  .state-section h4 {
    margin: 0 0 12px 0;
    color: #61dafb;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .state-section pre {
    margin: 0;
    padding: 12px;
    background: #1e1e1e;
    border-radius: 4px;
    border: 1px solid #4a5568;
    font-size: 11px;
    line-height: 1.4;
    overflow-x: auto;
  }

  .state-section pre code {
    color: #abb2bf;
    font-family: inherit;
  }

  .debug-footer {
    padding: 8px 16px;
    background: rgba(74, 85, 104, 0.3);
    border-top: 1px solid #4a5568;
    text-align: center;
  }

  .debug-footer small {
    color: #a0aec0;
    font-size: 10px;
  }

  kbd {
    background: #4a5568;
    border: 1px solid #718096;
    border-radius: 3px;
    color: #e2e8f0;
    font-family: inherit;
    font-size: 9px;
    padding: 2px 4px;
    margin: 0 1px;
  }

  /* Custom scrollbar */
  .debug-content::-webkit-scrollbar {
    width: 6px;
  }

  .debug-content::-webkit-scrollbar-track {
    background: #2d3748;
  }

  .debug-content::-webkit-scrollbar-thumb {
    background: #4a5568;
    border-radius: 3px;
  }

  .debug-content::-webkit-scrollbar-thumb:hover {
    background: #61dafb;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .debug-panel {
      width: calc(100vw - 40px);
      right: 20px;
      left: 20px;
      max-height: 70vh;
    }
  }
</style>
