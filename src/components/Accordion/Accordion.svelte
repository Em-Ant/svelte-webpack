<script module lang="ts">
  export const ACCORDION = {};
  export type AccordionContext = {
    registerRow: (row: {}) => void;
    toggle: (row: {}) => void;
    active: Writable<{} | null>;
  };
</script>

<script lang="ts">
  import { setContext, onDestroy, type Snippet } from 'svelte';
  import { writable, type Writable } from 'svelte/store';

  const active = writable<{} | null>(null);

  setContext(ACCORDION, {
    registerRow: (row: {}) => {
      onDestroy(() => {
        active.update((current) => (current === row ? null : current));
      });
    },
    toggle: (row: {}) => {
      active.update((current) => (row === current ? null : row));
    },
    active,
  });

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="paper">
  {@render children?.()}
</div>

<style>
  div.paper {
    border-radius: 4px;
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.4),
      0 0 3px -1px rgba(0, 0, 0, 0.2);
  }
</style>
