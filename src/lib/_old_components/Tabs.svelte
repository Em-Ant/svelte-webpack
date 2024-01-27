<script>
  import Indicator from "./Indicator.svelte";
  import { onMount } from "svelte";
  import { spring } from "svelte/motion";
  import { circInOut } from "svelte/easing";

  export let elements = [];

  let _headers = [];
  let ind;
  let base;
  let wrap;
  let _active = (elements.findIndex((d) => d && d.active) + 1 || 1) - 1;
  let _prev = _active;
  let animate_left = true;
  let _cw;
  let _c;

  $: if (_c && _cw)
    _cw.style.minHeight = `${_c.getBoundingClientRect().height}px`;

  $: animate_left = _prev >= _active;
  const handleSet = (i) => () => {
    _prev = _active;
    _active = i;
    const base = wrap.getBoundingClientRect().x;
    const active = _headers[_active];
    const r = active.getBoundingClientRect();
    ind.set({
      x: r.x - base,
      w: r.width,
    });
  };
  onMount(() => {
    const base = wrap.getBoundingClientRect().x;
    const active = _headers[_active];
    const r = active.getBoundingClientRect();
    ind = spring(
      {
        x: r.x - base,
        w: r.width,
      },
      {
        stiffness: 0.1,
        damping: 0.5,
      }
    );
  });

  function fade(node, { delay = 0, duration = 300, out = false }) {
    const w = node.getBoundingClientRect().width;
    const l = out ? !animate_left : animate_left;
    const m = l ? -2 : 1;
    return {
      delay,
      duration,
      css: (t) => {
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
        <button bind:this={_headers[i]} on:click={handleSet(i)}>
          {tab.header}
        </button>
      {/each}
    </div>
    <Indicator left={ind && $ind.x} width={ind && $ind.w} />
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
    transition: border 150ms ease-in-out, background-color 150ms ease-in-out;
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
