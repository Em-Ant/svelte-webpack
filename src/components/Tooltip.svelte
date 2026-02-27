<script lang="ts">
  import { fade } from 'svelte/transition';
  import { createPopper, type Options } from '@popperjs/core';
  import { type Snippet, type Component, untrack } from 'svelte';

  interface Props {
    attrs?: Record<string, unknown>;
    options?: Partial<Options>;
    ref?: HTMLElement;
    boundaryElem?: HTMLElement | 'clippingParents';
    elem?: Component<{ tooltip?: HTMLElement; children?: Snippet }>;
    children?: Snippet;
  }

  let {
    attrs = {},
    options = {},
    ref,
    boundaryElem,
    elem: Elem,
    children,
  }: Props = $props();

  let tooltip: HTMLElement | undefined = $state();
  let popper: ReturnType<typeof createPopper> | null = null;

  const defaults: Options = {
    placement: 'right',
    strategy: 'absolute',
    modifiers: [
      {
        name: 'offset',
        options: { offset: [0, 10] },
      },
      {
        name: 'preventOverflow',
        options: {
          altAxis: true,
          boundary: untrack(() => boundaryElem) || 'clippingParents',
        },
      },
      {
        name: 'arrow',
        options: { padding: 2 },
      },
      {
        name: 'flip',
        options: {
          padding: 4,
          fallbackPlacements: [
            'bottom-start',
            'bottom',
            'bottom-end',
            'top-start',
            'top',
            'top-end',
            'left-start',
            'left-end',
            'left',
          ],
          flipVariations: false,
        },
      },
    ],
  };

  $effect(() => {
    if (ref && tooltip) {
      destroy();
      create();
    }
    return destroy;
  });

  function create() {
    if (ref && tooltip && !popper) {
      popper = createPopper(ref, tooltip, {
        ...defaults,
        ...options,
        modifiers: [...defaults.modifiers, ...(options.modifiers ?? [])],
      });
      popper.update();
    }
  }

  function destroy() {
    if (popper) {
      popper.destroy();
      popper = null;
    }
  }
</script>

{#if ref}
  {#if Elem}
    <Elem bind:tooltip {children} />
  {:else}
    <div
      {...attrs}
      transition:fade={{ duration: 150 }}
      class="tooltip"
      bind:this={tooltip}
    >
      <div data-popper-arrow class="arrow"></div>
      {@render children?.()}
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
    content: ' ';
    transform: rotate(45deg) scale(0.7);
    background: #282828;
  }
  :global(div.tooltip[data-popper-reference-hidden]) {
    opacity: 0 !important;
    pointer-events: none;
  }
  :global(div.tooltip[data-popper-placement^='top'] > div.arrow) {
    bottom: -6px;
  }
  :global(div.tooltip[data-popper-placement^='bottom'] > div.arrow) {
    top: -6px;
  }
  :global(div.tooltip[data-popper-placement^='left'] > div.arrow) {
    right: -6px;
  }
  :global(div.tooltip[data-popper-placement^='right'] > div.arrow) {
    left: -6px;
  }
</style>
