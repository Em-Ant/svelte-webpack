<script lang="ts">
  import info from '../assets/info.svg?raw';
  import danger from '../assets/danger.svg?raw';
  import warning from '../assets/warning.svg?raw';
  import success from '../assets/success.svg?raw';
  import type { Snippet } from 'svelte';

  interface Props {
    type?: 'info' | 'warn' | 'error' | 'success';
    fluid?: boolean;
    children?: Snippet;
  }

  let { type = 'info', fluid = false, children }: Props = $props();

  let warn = $state(false);
  let err = $state(false);
  let ok = $state(false);
  let icon = $state(info);

  $effect(() => {
    warn = type === 'warn';
    err = type === 'error';
    ok = type === 'success';
    if (warn) icon = warning;
    if (err) icon = danger;
    if (ok) icon = success;
  });
</script>

<div class:fluid class:warn class:err class:ok class="wrap">
  <span class="icon">
    {@html icon}
  </span>
  <div class="content">
    {@render children?.()}
  </div>
</div>

<style>
  div.wrap {
    display: flex;
    min-height: 60px;
    min-width: 240px;
    background-color: #fff;
    border: 1px solid #1b8d9b;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 8px;
  }
  div.wrap.fluid {
    width: 100%;
  }
  div.wrap.warn {
    border-color: #b69d03;
  }
  div.wrap.err {
    border-color: #bb1a18;
  }
  div.wrap.ok {
    border-color: #a2c14e;
  }
  div.wrap span.icon {
    display: flex;
    flex-shrink: 0;
    flex-grow: 0;
    width: 32px;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
  }
  div.wrap div.content {
    font-family: 'Open Sans';
    font-size: 14px;
    color: #282828;
    line-height: 16px;
    display: flex;
    align-items: center;
  }
</style>
