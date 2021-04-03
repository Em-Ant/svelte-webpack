<script>
  import { onMount, onDestroy } from 'svelte';

  export let  min = 0;
  export let max = 100;
  export let step = 1;
  export let value = 0;
  let showPopover = $$slots.popover;

  let progress;
  let arrow;
  let wrap;
  let popover;

  const getData = () => {
    return {
      progress,
      arrow,
      popover,
      wrap,
      value
    }
  }

  function getPosition(value, wrap) {
    const out = {}
    if(wrap) {
      const ratio = value / (max - min);
      const adjustment = 16 - 32 * ratio;
      const { width, left, right } = wrap.getBoundingClientRect();
      out.x = width * ratio + adjustment;
      out.wrapLeft = left;
      out.wrapRight = right;
      out.wrapWidth = width;
    }
    if (popover) {
      const { width } = popover.getBoundingClientRect();
      out.popoverWidth = width;
    }
    return out;
  };

  function setDynamicStyles(value, wrap, progress, popover, arrow) {
    const {x, popoverWidth, wrapRight, wrapLeft } = getPosition(value, wrap);
    if (arrow) arrow.style.left = `${x}px`;
    if (progress) progress.style.width = `${x}px`;
    if (popover) {
      popover.style.left = `${x - popoverWidth / 2}px`;
      const { left, right } = popover.getBoundingClientRect();
      if (right > wrapRight) {
        popover.style.left = `${x - popoverWidth / 2 - (right - wrapRight)}px`;
      }
      if (left < wrapLeft) {
        popover.style.left = '0';
      }
    }
  }
  const onResize = () => {
    const {value, wrap, progress, popover, arrow} = getData();
    setDynamicStyles(value, wrap, progress, popover, arrow);
  }
  onMount(() => window.addEventListener('resize', onResize));
  onDestroy(() => window.removeEventListener('resize', onResize));

  $: setDynamicStyles(value, wrap, progress, popover, arrow);

</script>

<style>
  div.track {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 11px; /* (handle height - track height) / 2 */
    border-radius: 50px;
    height: 10px;
    box-shadow: inset 3px 3px 4px -1px rgba(0, 0, 0, 0.4);
    background-color: #ccc;
  }
  div.progress {
    position: absolute;
    left: 0;
    bottom: 11px;
    border-radius: 5px 0 0 5px;
    height: 10px;
    background-color: #1c818d;
  }
  input[type='range'] {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 32px;
    margin: 0;
    padding: 0;
    -webkit-appearance: none;
    width: 100%;

    background: transparent;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    margin-top: 0;
    box-sizing: border-box;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    border: 7px solid #fff;
    background: #1c818d;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.14), 0px 6px 8px rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }
  input[type='range']::-moz-range-thumb {
    box-sizing: border-box;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    border: 7px solid #fff;
    background: #1c818d;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.14), 0px 6px 8px rgba(0, 0, 0, 0.12);
    cursor: pointer;    
  }
  input[type='range']::-ms-thumb {
    box-sizing: border-box;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    border: 7px solid #fff;
    background: #1c818d;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.14), 0px 6px 8px rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }
  div.wrap {
    position: relative;
    display: flex;
    padding: 0;
    height: 32px;
    width: 100%;
    margin: 0;
  }
  div.wrap.mt {
    margin-top: 40px;
  }

  div.wrap:focus-within > div.track {
    box-shadow: inset 3px 3px 4px -1px rgba(0, 0, 0, 0.4), 0 0 1px 1px #f2f2f2, 0 0 1px 3px rgba(28, 129, 141, 1);
  }
  div.popover {
    position: relative;
    min-width: 80px;
    min-height: 32px;
    max-width: 254px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1c818d;
    color: white;
    font-family: 'Open Sans';
    font-weight: 700;
    border-radius: 4px;
    padding: 8px;
    box-sizing: border-box;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.14);
    top: -40px; /* track height + 8px distance */
  }
  span.arrow {
    position: absolute;
    background-color: #1c818d;
    height: 6px;
    width: 6px;
    transform: translateX(-3px) rotate(45deg);
    bottom: 37px;
    z-index: 1;
  }
  div.outer {
    display: flex;
    margin-bottom: 8px;
  }
</style>

<div class="outer">
  <div class="wrap" class:mt={showPopover} bind:this={wrap}>
    {#if showPopover}
      <span class="arrow" bind:this={arrow} />
      <div class="popover" bind:this={popover}>
        <slot name="popover"></slot>
      </div>
    {/if}
    <div class="track" />
    <div class="progress" bind:this={progress}/>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      on:change
      on:click
      bind:value
      {...$$restProps}
    />
  </div>
</div>