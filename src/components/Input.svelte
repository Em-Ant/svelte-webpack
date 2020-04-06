<script>
  export let postfix = "";
  export let error = "";
  export let value = "";
  export let disabled = undefined;
  export let name = undefined;
  export let id = undefined;
  export let fluid = undefined;
  export let attrs = {};
  export let elem = undefined;
  function scroll(node, { delay = 50, duration = 100 }) {
    const height = node.scrollHeight;
    return {
      delay,
      duration,
      css: t => `height: ${t * height}px;`
    };
  }
</script>

<style>
  div.outer {
    min-height: 56px;
    font-family: "Open Sans", sans-serif;
  }
  div.inner {
    display: flex;
    align-items: center;
    width: 180px;
  }
  div.inner.fluid {
    width: 100%;
  }
  div.field {
    display: flex;
    align-items: center;
    height: 32px;
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
  }
  div.field.error {
    border: solid 2px #bb1b18;
  }
  div.field.disabled {
    border: solid 2px #999;
    background-color: #ddd;
    color: #999;
  }
  div.field:focus-within {
    box-shadow: 0 0 1px 1px #f2f2f2, 0 0 1px 3px rgba(28, 129, 141, 1);
  }
  span.postfix {
    display: inline-block;
    align-items: center;
    padding: 0 4px;
  }
  input {
    outline: none;
    border: none;
    margin: 0;
    flex-grow: 1;
    width: 0px;
    flex-shrink: 1;
    padding: 6px 0 6px 6px;
    display: inline-block;
    background-color: transparent;
    border-radius: 3px 0 0 3px;
    font-size: 14px;
    line-height: 14px;
    color: #282828;
    font-family: inherit;
  }
  input:disabled {
    color: #999;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
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

<div class="outer">
  <div class="inner" class:fluid>
    <div class="field" class:error={!!error} class:disabled>
      <input
        bind:this={elem}
        {disabled}
        {name}
        {id}
        {...attrs}
        bind:value
        on:change
        on:click />
      {#if postfix}
        <span class="postfix">{postfix}</span>
      {/if}
    </div>

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
  {#if error}
    <span transition:scroll class:disabled class="error-msg">{error}</span>
  {/if}
</div>
