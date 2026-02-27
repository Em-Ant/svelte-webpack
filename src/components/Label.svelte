<script lang="ts">
  import Tooltip from './Tooltip.svelte';
  import infoIcon from '../assets/info_light.svg?raw';
  import type { Snippet } from 'svelte';

  interface Props {
    infoOpen?: boolean;
    attrs?: Record<string, unknown>;
    infoAttrs?: Record<string, unknown>;
    closeInfoOnBlur?: boolean;
    onInfoBlur?: () => void;
    onInfoClick?: () => void;
    children?: Snippet;
    info?: Snippet;
  }

  let {
    infoOpen = $bindable(false),
    attrs = {},
    infoAttrs = {},
    closeInfoOnBlur = true,
    onInfoBlur = () => {},
    onInfoClick = () => {},
    children,
    info,
  }: Props = $props();

  let btn: HTMLButtonElement | undefined = $state();

  function onClick() {
    infoOpen = !infoOpen;
    btn?.focus();
    onInfoClick();
  }

  function onBlur() {
    if (closeInfoOnBlur) infoOpen = false;
    onInfoBlur();
  }
</script>

<div class="wrap">
  <label for={attrs.for as string} {...attrs}>
    {@render children?.()}
  </label>
  {#if info}
    <button onclick={onClick} onblur={onBlur} bind:this={btn} type="button">
      {@html infoIcon}
    </button>
  {/if}
  {#if infoOpen}
    <Tooltip attrs={infoAttrs} ref={btn}>
      {@render info?.()}
    </Tooltip>
  {/if}
</div>

<style>
  div.wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
    margin-bottom: 4px;
  }
  label {
    max-width: 180px;
    display: inline-block;
    font-family: 'Open Sans';
    font-weight: 600;
    font-size: 14px;
    flex-shrink: 0;
    flex-grow: 0;
  }
  label + button {
    height: 16px;
    width: 16px;
    display: inline-flex;
    border: none;
    border-radius: 50%;
    background: none;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-left: 4px;
    cursor: pointer;
    outline: none;
  }
  label + button:focus {
    box-shadow:
      0 0 1px 1px #f2f2f2,
      0 0 1px 3px rgba(28, 129, 141, 1);
  }
</style>
