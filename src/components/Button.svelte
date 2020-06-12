<script>
  export let disabled = false;
  export let id = undefined;
  export let loading = undefined;
  export let success = undefined;
  export let fluid = false;
  export let small = false;
  export let secondary = false;
  export let type = "button";
  export let attrs = {};
  export let elem = undefined;
</script>

<style>
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dashoffset: 20;
    }
    30% {
      stroke-dashoffset: 20;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
  button {
    min-height: 40px;
    min-width: 120px;
    font-family: inherit;
    font-weight: 600;
    font-size: 14px;
    display: flex;
    background-color: #1e838f;
    justify-content: center;
    align-items: center;
    color: white;
    margin: 0;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 4px;
    padding: 8px;
    flex-shrink: 0;
    flex-grow: 0;
    transition: background-color 0.2s ease-in-out;
  }
  button.secondary {
    background-color: white;
    color: #282828;
    border: 1px solid #282828;
  }
  button.secondary:hover {
    background-color: #eee;
  }
  button.small {
    min-height: 32px;
    min-width: 100px;
  }
  button.fluid {
    flex-grow: 1;
    width: 100%;
  }
  button:hover {
    background-color: #1b7883;
  }
  button:active {
    background-color: #2295a1;
  }
  button:disabled {
    background-color: darkgrey;
    cursor: initial;
  }
  button.secondary:disabled {
    background-color: #f2f2f2;
    border-color: #666;
    color: #666;
  }
  button:focus {
    box-shadow: 0 0 1px 1px #f2f2f2, 0 0 1px 3px rgba(28, 129, 141, 1);
  }
  button > svg.loader {
    animation: spin 1000ms linear infinite;
  }
  @supports not (-ms-high-contrast: none) {
    button > svg.check > path {
      stroke-dasharray: 20;
      stroke-dashoffset: 20;
      animation: dash 0.1s linear forwards;
      justify-self: flex-end;
    }
  }
</style>

<button
  class:fluid
  class:small
  class:secondary
  bind:this={elem}
  on:click
  {disabled}
  {id}
  {type}
  {...attrs}>
  {#if loading}
    <svg
      class="loader"
      width="18"
      height="18"
      version="1.1"
      viewBox="0 0 4.2333 4.2333"
      xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(-104.98 -184.32)">
        <path
          d="m107.09 184.32v0.4717c0.91041 0 1.6426 0.73456 1.6426 1.645 0
          0.91039-0.73224 1.6431-1.6426 1.6431-0.91039
          0-1.6431-0.73272-1.6431-1.6431h-0.47356c0 1.1663 0.95033 2.1167 2.1167
          2.1167s2.1167-0.95034
          2.1167-2.1167c0-1.1663-0.95034-2.1167-2.1167-2.1167z"
          color="#000000"
          color-rendering="auto"
          dominant-baseline="auto"
          fill="#fff"
          image-rendering="auto"
          shape-rendering="auto"
          solid-color="#000000"
          style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;isolation:auto;mix-blend-mode:normal;paint-order:markers
          fill
          stroke;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal" />
      </g>
    </svg>
  {:else if success}
    <svg
      class="check"
      version="1.1"
      height="24"
      width="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 6,13.7857 9.25,17 19,8"
        fill="none"
        stroke="#fff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2.6" />
    </svg>
  {:else}
    <slot />
  {/if}
</button>
