<script lang="ts">
  interface Props {
    left?: number;
    width?: number;
  }

  let { left = 0, width = 1 }: Props = $props();

  let elem: HTMLSpanElement | undefined = $state();

  $effect(() => {
    if (elem) {
      elem.style.left = `${left}px`;
      elem.style.transform = `scaleX(${width})`;
    }
  });
</script>

<style>
  div.indicator {
    margin-top: 4px;
    position: relative;
    overflow-x: hidden;
    height: 4px;
  }
  span.line {
    display: block;
    height: 2px;
    background-color: #999;
    margin-top: 1px;
  }
  span.active {
    display: block;
    height: 4px;
    background-color: #bb1a18;
    width: 1px;
    left: 0;
    bottom: 0;
    position: absolute;
    transform-origin: left;
  }
</style>

<div class="indicator">
  <span bind:this={elem} class="active"></span>
  <span class="line"></span>
</div>
