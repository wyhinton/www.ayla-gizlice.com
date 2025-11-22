<script lang="ts">
  export let show: boolean = false;
  export let enter: string = "fade-in";
  export let exit: string = "fade-out";

  let el: HTMLDivElement | null = null;
  let visible: boolean = show;

  // Run whenever `show` changes
  $: {
    if (show && !visible) {
      // Make the element appear in the DOM
      visible = true;

      // Allow DOM to mount before adding class
      requestAnimationFrame(() => {
        if (el) el.classList.add(enter);
      });
    }

    if (!show && visible && el) {
      // Remove enter class, apply exit class
      el.classList.remove(enter);
      el.classList.add(exit);

      const handle = () => {
        el?.removeEventListener("transitionend", handle);
        visible = false; // Remove from DOM
        el?.classList.remove(exit);
      };

      el.addEventListener("transitionend", handle);
    }
  }
</script>

{#if visible}
  <div bind:this={el}>
    <slot />
  </div>
{/if}

<style>
  .fade-in {
    opacity: 0;
    transition: opacity 0.12s ease;
  }

  .fade-in {
    opacity: 1;
  }

  .fade-out {
    opacity: 1;
    transition: opacity 0.12s ease;
  }

  .fade-out {
    opacity: 0;
  }
</style>
