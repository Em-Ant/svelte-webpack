<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    disabled?: boolean;
    error?: boolean;
    id?: string;
    value?: string;
    name?: string;
    group?: string;
    attrs?: Record<string, unknown>;
    elem?: HTMLInputElement;
    children?: Snippet;
    onchange?: (e: Event) => void;
    onclick?: (e: MouseEvent) => void;
  }

  let {
    disabled = undefined,
    error = undefined,
    id = undefined,
    value = undefined,
    name = undefined,
    group = $bindable(undefined),
    attrs = {},
    elem = undefined,
    children,
    onchange,
    onclick,
  }: Props = $props();

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.checked) group = target.value;
  }
</script>

<div>
  <label class:disabled>
    <input
      {...attrs}
      {disabled}
      {id}
      {value}
      {name}
      bind:this={elem}
      checked={!!group && group === value}
      onchange={(e) => {
        handleChange(e);
        onchange?.(e);
      }}
      {onclick}
      type="radio"
    />
    <span class="icon"></span>
    {#if children}
      <span class="label">
        {@render children()}
      </span>
    {/if}
  </label>
</div>

<style>
  label {
    outline: none;
    transition: box-shadow 0.2s ease-out;
    outline: none;
    display: inline-flex;
    position: relative;
    align-items: center;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 8px;
    cursor: pointer;
  }
  label.disabled {
    pointer-events: none;
    cursor: auto;
  }
  label > input {
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
    padding: 0;
    margin: 0;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background-color: #fff;
    box-sizing: border-box;
    border: 1px solid #282828;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    transition:
      border 0.1s ease-out,
      background-color 0.1s ease,
      box-shadow,
      0.1s ease;
  }

  input:checked + span.icon {
    border: 1px solid #1e838f;
    background-color: #1e838f;
  }
  input + span.icon:after {
    content: '';
    display: block;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: white;
    transition: all 0.15s ease-in-out;
    transform: scale(0.1);
  }
  input:checked + span.icon:after {
    transform: scale(1);
  }
  input[aria-invalid='true'] + span.icon {
    border: 2px solid #bb1b18;
    background-color: white;
  }
  input[aria-invalid='true']:checked + span.icon:after {
    background-color: #bb1b18;
  }
  input:disabled + span.icon {
    border: 2px solid #999;
    background-color: #f2f2f2;
  }
  input:disabled:checked + span.icon {
    background-color: #999;
  }
  input:focus + span.icon {
    box-shadow:
      0 0 1px 1px #f2f2f2,
      0 0 1px 3px rgba(28, 129, 141, 1);
  }
  span.label {
    margin-left: 8px;
  }
</style>
