<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    disabled?: boolean;
    checked?: boolean;
    error?: boolean;
    id?: string;
    name?: string;
    attrs?: Record<string, unknown>;
    elem?: HTMLInputElement;
    children?: Snippet;
    onchange?: (e: Event) => void;
    onclick?: (e: MouseEvent) => void;
  }

  let {
    disabled = undefined,
    checked = $bindable(undefined),
    error = undefined,
    id = undefined,
    name = undefined,
    attrs = {},
    elem = undefined,
    children,
    onchange,
    onclick
  }: Props = $props();
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
    display: inline-flex;
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
  span.icon {
    margin: 0;
    padding: 0;
    width: 24px;
    height: 24px;
    display: block;
    position: relative;
    flex-shrink: 0;
  }
  span.icon-bg > svg {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
  }
  @supports not (-ms-high-contrast: none) {
    span.icon-bg > svg > path {
      stroke-dasharray: 20;
      stroke-dashoffset: 20;
      animation: dash 0.1s linear forwards;
    }
  }
  span.icon-bg {
    display: block;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    background-color: #fff;
    border-radius: 3px;
    box-sizing: border-box;
    border: 1px solid #282828;
    transition: border 0.1s ease-out, background-color 0.1s ease, box-shadow,
      0.1s ease;
  }
  input:checked + span.icon > span.icon-bg {
    border: 1px solid #1e838f;
    background-color: #1e838f;
  }
  input:checked + span.icon > span.icon-bg > svg {
    display: block;
  }
  input[aria-invalid="true"] + span.icon > span.icon-bg {
    border: 2px solid #bb1b18;
    background-color: #fff;
  }
  input[aria-invalid="true"] + span.icon > span.icon-bg > svg > path {
    stroke: #bb1b18;
  }
  input:disabled + span.icon > span.icon-bg {
    border: 2px solid #999;
    background-color: #f2f2f2;
  }
  input:disabled:checked + span.icon > span.icon-bg {
    background-color: #999;
  }
  input:disabled:checked + span.icon > span.icon-bg > svg > path {
    stroke: #f2f2f2;
  }
  input:focus + span.icon > span.icon-bg {
    box-shadow: 0 0 1px 1px #f2f2f2, 0 0 1px 3px rgba(28, 129, 141, 1);
  }
  span.label {
    margin-left: 8px;
  }
</style>

<div>
  <label class:disabled>
    <input
      {...attrs}
      {disabled}
      {id}
      {name}
      bind:this={elem}
      bind:checked
      onchange={onchange}
      onclick={onclick}
      aria-invalid={error ? "true" : undefined}
      type="checkbox" />
    <span class="icon">
      <span class="icon-bg">
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
    </span>
    {#if children}
      <span class="label">
        {@render children()}
      </span>
    {/if}
  </label>
</div>
