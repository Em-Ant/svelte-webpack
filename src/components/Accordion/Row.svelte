<script>
  import { getContext } from 'svelte';
	import { ACCORDION } from './Accordion.svelte';

  const row = {};
	const { registerRow, toggle, active } = getContext(ACCORDION);
  registerRow(row);


  function scroll(node, { delay = 0, duration = 200 }) {
    const height = node.scrollHeight;
    return {
      delay,
      duration,
      css: t => `height: ${t * height}px;`
    };
  }

  const handleClick = () => {
    toggle(row);
  };
  
  $: open = $active === row;
</script>

<style>
  button {
    outline: none;
    background-color: #fff;
    min-height: 48px;
    display: block;
    border: none;
    border-bottom: 1px solid #ccc;
    width: 100%;
    cursor: pointer;
    position: relative;
    font-family: "Open Sans", sans-serif;
    color: #282828;
    padding: 0 32px 0 8px;
    text-align: left;
    font-size: 14px;
    box-sizing: border-box;
  }
  button > span.arrow {
    position: absolute;
    display: flex;
    height: 100%;
    right: 0;
    top: 0;
    padding: 0 8px;
    align-items: center;
    transition: all 0.2s ease-in;
  }
  button > span.arrow > svg {
    transition: transform 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }
  button > span.arrow > svg > g > path {
    transition: fill 0.2s ease-in-out;
  }
  button.open {
    border: none;
    box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.3);
  }
  button.open > span.arrow > svg {
    transform: rotate(-180deg);
  }
  button.open > span.arrow > svg > g > path {
    fill: #bb1b18;
  }
  button:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    background: transparent;
    transition: box-shadow 0.2s ease-in-out;
  }
  button:last-of-type:not(.open) {
    border-bottom: none;
  }
  div.content {
    overflow: hidden;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    flex-shrink: 0;
    width: 100%;
  }
  span.signal {
    display: block;
    height: 100%;
    width: 0;
    left: 0;
    top: 0;
    position: absolute;
    background-color: #bb1b18;
    transition: width 0.1s ease-in;
  }
  button:hover > span.signal,
  button.open > span.signal {
    width: 2px;
  }
  button:first-child {
    border-radius: 4px 4px 0 0;
  }
  button:first-child:hover > span.signal,
  button:first-child.open > span.signal {
    border-radius: 4px 0 0 0;
  }
  button:last-child {
    border-radius: 0 0 4px 4px;
  }
  button:last-child:hover > span.signal {
    border-radius: 0 0 0 4px;
  }
  button:focus:after {
    outline: 2px solid #639297;
    outline-offset: 1px;
  }
</style>

<button
  class:open
  type="button"
  on:click
  on:click={handleClick}>
  <span class="signal" />
  <slot name="header"></slot>
  <span class="arrow">
    <svg
      width="16"
      height="8"
      version="1.1"
      viewBox="0 0 4.2333 2.1167"
      xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(-89.648 -153.89)">
        <path
          d="m93.881 154.08a0.19308 0.19277 0 0 0-0.32364-0.13237l-1.7878
          1.6059-1.7898-1.6059a0.19308 0.19277 0 1 0-0.25736 0.28613l1.9184
          1.7227a0.19308 0.19277 0 0 0 0.25734 0l1.9184-1.7227a0.19308 0.19277 0
          0 0 0.06428-0.15379z"
          color="#000000"
          color-rendering="auto"
          dominant-baseline="auto"
          fill="#282828"
          image-rendering="auto"
          shape-rendering="auto"
          solid-color="#000000"
          style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;isolation:auto;mix-blend-mode:normal;paint-order:markers
          fill
          stroke;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal" />
      </g>
    </svg>
  </span>
</button>
{#if open}
  <div transition:scroll class="content">
    <slot />
  </div>
{/if}
