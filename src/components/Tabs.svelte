<script>
  import Indicator from "./Indicator.svelte";
  import { onMount } from "svelte";
  import { spring } from "svelte/motion";

  let ind;
  let base;
  let wrap;
  const handleSet = i => () => {
    const base = wrap.getBoundingClientRect().x;
    const active = document.getElementById(`t${i}`);
    const r = active.getBoundingClientRect();
    ind.set({
      x: r.x - base,
      w: r.width
    });
  };
  onMount(() => {
    const base = wrap.getBoundingClientRect().x;
    const active = document.getElementById("t1");
    const r = active.getBoundingClientRect();
    ind = spring(
      {
        x: r.x - base,
        w: r.width
      },
      {
        stiffness: 0.07,
        damping: 0.35
      }
    );
  });
</script>

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
</style>

<div class="out">
  <div class="wrap" bind:this={wrap}>
    <div class="btns">
      <button id="t1" on:click={handleSet(1)}>tab 1</button>
      <button id="t2" on:click={handleSet(2)}>tab 2</button>
      <button id="t3" on:click={handleSet(3)}>tab 3</button>
    </div>
    <Indicator left={ind && $ind.x} width={ind && $ind.w} />
  </div>
</div>
