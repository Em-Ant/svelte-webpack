<script>
  import { tick } from "svelte";
  export let options = [];
  export let value = undefined;
  export let elem = undefined;
  export let error = false;
  export let fluid = false;
  export let disabled = false;
  export let name = "select";
  export let attrs = {};
  let open = false;
  function enter(node, { delay = 0, duration = 100 }) {
    const height = node.scrollHeight;
    return {
      delay,
      duration,
      css: t => `height: ${t * height}px; overflow-y: hidden;`
    };
  }
</script>

<style>
  div.wrap {
    position: relative;
    min-height: 54px;
    font-family: "Open Sans", sans-serif;
  }
  div.inner {
    display: flex;
    align-items: center;
    max-width: 180px;
  }
  div.inner.fluid {
    max-width: 100%;
  }
  button.select {
    display: flex;
    align-items: center;
    height: 30px;
    box-sizing: border-box;
    flex-grow: 1;
    margin: 0;
    overflow: hidden;
    border-radius: 3px;
    border: solid 1px #282828;
    font-size: 14px;
    background-color: white;
    color: #282828;
    transition: box-shadow 0.1s ease-in-out;
    cursor: pointer;
    line-height: 14px;
    font-family: inherit;
    outline: none;
  }
  button.select:focus-within {
    box-shadow: 0 0 1px 1px #f2f2f2, 0 0 1px 3px rgba(28, 129, 141, 1);
  }
  button.select > span.value {
    flex-grow: 1;
    flex-shrink: 0;
    text-align: left;
  }
  button.select.error {
    border: solid 2px #bb1b18;
  }
  button.select:disabled {
    border: solid 2px #999;
    background-color: #ddd;
    color: #999;
    cursor: initial;
  }
  button.select > span.icon {
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }
  button.select > span.icon > svg {
    transition: transform 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }
  button.select:disabled > span.icon > svg > g > path {
    fill: #999;
  }
  button.select > span.icon.open > svg {
    transform: rotate(-180deg);
  }
  span.error-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 4px;
    overflow: hidden;
    width: 0;
    height: 22px;
    transition: width 0.1s ease-in;
  }
  span.error-icon.in {
    width: 26px;
  }
  span.error-icon > svg {
    transition: all 0.15s ease-in-out 0.05s;
    transform: scale(0.01);
    transform-origin: center;
  }
  span.error-icon.in svg {
    transform: initial;
  }
  span.error-icon > svg > path {
    fill: #bb1b18;
  }
  span.error-icon.disabled > svg > path {
    fill: #999;
  }
  input {
    opacity: 0;
    height: 0;
    width: 0;
  }
  div.options {
    z-index: 3;
    position: absolute;
    background-color: white;
    border-radius: 3px;
    width: 100%;
    max-width: 180px;
    top: 34px;
    border: 1px solid #aaa;
    box-shadow: 0 2px 5px -1px rgba(0, 0, 0, 0.3);
    max-height: 500px;
    overflow-y: auto;
  }
  div.options > p {
    z-index: 3;
    padding: 0 6px;
    margin: 0;
    min-height: 26px;
    line-height: 26px;
    font-size: 14px;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.1s ease-in-out;
  }
  div.options > p:hover {
    background-color: #eee;
  }
  div.options > p.selected {
    background-color: rgba(130, 204, 211, 0.4);
  }
  div.options > p.selected:hover {
    background-color: rgba(130, 204, 211, 0.5);
  }
  span.error-msg {
    color: #bb1b18;
    font-size: 12px;
    display: block;
    padding: 0;
    overflow: hidden;
    padding: 1px 0 2px;
    align-items: flex-end;
  }
  span.error-msg.disabled {
    color: #999;
  }
</style>

<div class="wrap">
  <div class="inner" class:fluid>
    <button
      class="select"
      tabindex="-1"
      {disabled}
      class:error
      type="button"
      on:click
      on:click|preventDefault={() => {
        open = !open;
        elem.focus();
      }}
      on:mousedown|preventDefault={() => {
        elem.focus();
      }}>
      <span class="value">{(value && (value.name || value)) || ''}</span>
      <input
        {name}
        {...attrs}
        {disabled}
        on:blur={() => (open = false)}
        bind:this={elem}
        readonly
        value={value && (value.name || value)} />
      <span class="icon" class:open>
        <svg
          width="12"
          height="12"
          version="1.1"
          viewBox="0 0 4.7625 4.7625"
          xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(-52.338 -89.642)">
            <path
              d="m54.719 94.086-2.3812-4.1244h4.7625z"
              fill="#282828"
              opacity=".97"
              style="paint-order:markers fill stroke" />
          </g>
        </svg>
      </span>
    </button>
    <span class="error-icon" class:in={!!error} class:disabled>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12
          2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1
          1zm1 4h-2v-2h2v2z" />
      </svg>
    </span>
  </div>
  {#if open}
    <div in:enter out:enter={{ delay: 100 }} class="options">
      {#each options as opt (opt && (opt.key || opt.value || opt))}
        <p
          class:selected={opt === value}
          on:mousedown|preventDefault={async () => {
            value = opt;
            await tick;
            open = false;
          }}>
          {opt && (opt.name || opt)}
        </p>
      {/each}
    </div>
  {/if}
  {#if error}
    <span transition:enter class:disabled class="error-msg">{error}</span>
  {/if}
</div>
