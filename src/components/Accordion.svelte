<script>
  export let open = false;

  function scroll(node, { delay = 0, duration = 200 }) {
    const height = node.scrollHeight;
    return {
      delay,
      duration,
      css: t => `height: ${t * height}px;`
    };
  }
</script>

<style>
  button {
    outline: none;
    background-color: #fff;
    min-height: 40px;
    display: block;
    border: 1px solid #666;
    width: 100%;
    border-bottom: none;
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
    transition: transform 0.2s ease-in;
  }
  button > span.arrow > svg {
    transition: transform 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }
  button > span.arrow > svg > g > path {
    transition: fill 0.2s ease-in-out;
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
  button:focus:after {
    box-shadow: 0 0 1px 1px #f2f2f2, 0 0 1px 3px rgba(28, 129, 141, 1);
  }
  button:last-child {
    border-bottom: 1px solid #666;
  }
  div.content + button {
    border-top: none;
  }
  div.content {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #666;
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
    width: 4px;
  }
</style>

<button class:open type="button" on:click on:click={() => (open = !open)}>
  <span class="signal" />
  <slot name="header">Click me !</slot>
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
