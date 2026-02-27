<script lang="ts">
  import Indicator from './Indicator.svelte';
  import { onMount, untrack } from 'svelte';
  import { spring, type Spring } from 'svelte/motion';
  import { circInOut } from 'svelte/easing';
  import type { TransitionConfig } from 'svelte/transition';

  interface TabElement {
    header: string;
    component?: string;
    active?: boolean;
    [key: string]: unknown;
  }

  interface Props {
    elements?: TabElement[];
  }

  let { elements = [] }: Props = $props();

  let _headers: HTMLButtonElement[] = $state([]);
  let ind: Spring<{ x: number; w: number }> | undefined = $state();
  let wrap: HTMLDivElement | undefined = $state();
  const initial = untrack(
    () => (elements.findIndex((d) => d && d.active) + 1 || 1) - 1,
  );
  let _active = $state(initial);
  let _prev = $state(initial);
  let animate_left = $derived(_prev >= _active);
  let _cw: HTMLDivElement | undefined = $state();
  let _c: HTMLDivElement | undefined = $state();

  $effect(() => {
    if (_c && _cw) {
      _cw.style.minHeight = `${_c.getBoundingClientRect().height}px`;
    }
  });

  function handleSet(i: number) {
    return () => {
      _prev = _active;
      _active = i;
      if (!wrap || !_headers[_active]) return;
      const baseRect = wrap.getBoundingClientRect();
      const active = _headers[_active];
      const r = active.getBoundingClientRect();
      if (ind) {
        ind.set({
          x: r.x - baseRect.x,
          w: r.width,
        });
      }
    };
  }

  onMount(() => {
    if (!wrap) return;
    const baseRect = wrap.getBoundingClientRect();
    const active = _headers[_active];
    if (!active) return;
    const r = active.getBoundingClientRect();
    ind = spring(
      {
        x: r.x - baseRect.x,
        w: r.width,
      },
      {
        stiffness: 0.1,
        damping: 0.5,
      },
    );
  });

  function fade(
    node: HTMLElement,
    params?: { delay?: number; duration?: number; out?: boolean },
  ): TransitionConfig {
    const w = node.getBoundingClientRect().width;
    const l = params?.out ? !animate_left : animate_left;
    const m = l ? -2 : 1;
    return {
      delay: params?.delay ?? 0,
      duration: params?.duration ?? 300,
      css: (t: number) => {
        const _t = circInOut(t);
        return `transform: translateX(${m * w * (1 - _t)}px); opacity: ${t}`;
      },
    };
  }
</script>

<div class="out">
  <div class="wrap" bind:this={wrap}>
    <div class="btns">
      {#each elements as tab, i}
        <button bind:this={_headers[i]} onclick={handleSet(i)}>
          {tab.header}
        </button>
      {/each}
    </div>
    <Indicator left={ind ? $ind?.x : 0} width={ind ? $ind?.w : 0} />
  </div>
</div>
<div class="content-wrap" bind:this={_cw}>
  {#each elements as tab, i}
    {#if _active === i}
      <div class="content" bind:this={_c} in:fade out:fade={{ out: true }}>
        {tab.component}
      </div>
    {/if}
  {/each}
</div>

<style>
  div.btns {
    display: flex;
  }
  div.btns > button {
    cursor: pointer;
    flex-shrink: 0;
    flex-grow: 1;
    padding: 4px 16px;
    background-color: transparent;
    border: none;
    outline: none;
    border-radius: 4px;
    box-sizing: content-box;
    border: solid 2px transparent;
    transition:
      border 150ms ease-in-out,
      background-color 150ms ease-in-out;
  }
  div.btns > button:nth-child(n + 2) {
    margin-left: 8px;
  }
  div.btns > button:focus {
    border: solid 2px rgba(28, 129, 141, 1);
  }
  div.btns > button:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
  div.out {
    overflow-x: auto;
    scrollbar-width: thin;
  }
  div.wrap {
    width: max-content;
    min-width: 100%;
  }
  div.content-wrap {
    margin-top: 16px;
    position: relative;
    overflow-x: hidden;
  }
  div.content {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
