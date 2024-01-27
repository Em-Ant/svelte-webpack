<script>
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { createPopper } from "@popperjs/core";

  export let attrs = {};
  export let options = {};
  export let ref = null;
  export let boundaryElem;

  /**
   * custom tooltip element
   * must bind this to a ref prop,
   * and accept a slot as children
   */
  export let elem = null;

  let tooltip;
  let popper;

  const defaults = {
    placement: "right",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
      {
        name: "preventOverflow",
        options: {
          altAxis: true,
          boundary: boundaryElem || "clippingParents",
        },
      },
      {
        name: "arrow",
        options: {
          padding: 2,
        },
      },
      {
        name: "flip",
        options: {
          padding: 4,
          fallbackPlacements: [
            "bottom-start",
            "bottom",
            "bottom-end",
            "top-start",
            "top",
            "top-end",
            "left-start",
            "left-end",
            "left",
          ],
          flipVariations: false,
        },
      },
    ],
  };

  $: if (ref && options && tooltip && attrs) {
    destroy();
    create();
  }

  function create() {
    if (ref && tooltip && !popper) {
      popper = createPopper(ref, tooltip, { ...defaults, options });
      popper.update();
    }
  }
  function destroy() {
    if (popper) {
      popper.destroy();
      popper = null;
    }
  }
  onDestroy(function () {
    destroy();
  });
</script>

{#if ref}
  {#if elem}
    <svelte:component this={elem} bind:ref={tooltip}>
      <slot />
    </svelte:component>
  {:else}
    <div
      {attrs}
      transition:fade={{ duration: 150 }}
      class="tooltip"
      bind:this={tooltip}
    >
      <div data-popper-arrow class="arrow" />
      <slot />
    </div>
  {/if}
{/if}

<style>
  div.tooltip {
    background-color: #282828;
    color: white;
    width: 180px;
    min-height: 40px;
    display: flex;
    align-items: center;
    border-radius: 2px;
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.4);
    opacity: 1;
    transition: opacity 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    font-size: 13px;
    font-weight: normal;
    padding: 8px;
    z-index: 1;
  }
  div.arrow,
  div.arrow::before {
    position: absolute;
    width: 12px;
    height: 12px;
    z-index: -1;
  }

  div.arrow::before {
    content: " ";
    transform: rotate(45deg) scale(0.7);
    background: #282828;
  }
  :global(div.tooltip[data-popper-reference-hidden]) {
    opacity: 0 !important;
    pointer-events: none;
  }
  :global(div.tooltip[data-popper-placement^="top"] > div.arrow) {
    bottom: -6px;
  }

  :global(div.tooltip[data-popper-placement^="bottom"] > div.arrow) {
    top: -6px;
  }

  :global(div.tooltip[data-popper-placement^="left"] > div.arrow) {
    right: -6px;
  }

  :global(div.tooltip[data-popper-placement^="right"] > div.arrow) {
    left: -6px;
  }
</style>
