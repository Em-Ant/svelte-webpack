<script>
  export let disabled = undefined;
  export let checked = undefined;
  export let error = undefined;
  export let id = undefined;
  export let attrs = {};
</script>

<style>
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
  label {
    outline: none;
    transition: box-shadow 0.2s ease-out;
    outline: none;
    display: flex;
    position: relative;
    align-items: center;
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 8px;
    cursor: pointer;
  }
  label.disabled {
    pointer-events: none;
    cursor: auto;
  }
  label > input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    margin: 0;
    top: 0;
    left: 0;
    height: 0;
    width: 0;
    z-index: -1;
  }
  span.icon > svg {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
  }
  @supports not (-ms-high-contrast: none) {
    span.icon > svg > path {
      stroke-dasharray: 20;
      stroke-dashoffset: 20;
      animation: dash 0.1s linear forwards;
    }
  }
  span.icon {
    padding: 0;
    margin: 0;
    margin-right: 8px;
    height: 24px;
    width: 24px;
    background-color: #fff;
    border-radius: 3px;
    box-sizing: border-box;
    border: 1px solid #282828;
    transition: border 0.1s ease-out, background-color 0.1s ease, box-shadow,
      0.1s ease;
  }
  input:checked + span.icon {
    border: 1px solid #1e838f;
    background-color: #1e838f;
  }
  input:checked + span.icon > svg {
    display: block;
  }
  input[aria-invalid="true"] + span.icon {
    border: 2px solid #bb1b18;
    background-color: #fff;
  }
  input[aria-invalid="true"] + span.icon > svg > path {
    stroke: #bb1b18;
  }
  input:disabled + span.icon {
    border: 2px solid #999;
    background-color: #ddd;
  }
  input:disabled:checked + span.icon {
    background-color: #999;
  }
  input:disabled:checked + span.icon > svg > path {
    stroke: #ddd;
  }
  input:focus + span.icon {
    box-shadow: 0 0 1px 1px #f2f2f2, 0 0 1px 3px rgba(28, 129, 141, 1);
  }
</style>

<label class:disabled>
  <input
    {...attrs}
    {disabled}
    {id}
    bind:checked
    on:change
    on:click
    aria-invalid={error}
    type="checkbox" />
  <span class="icon">
    <svg
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
  </span>
  <span>
    <slot />
  </span>
</label>
