<script>
  export let left = 0;
  export let width = 1;
  let elem;

  $: if (elem) elem.style.left = `${left}px`;
  $: if (elem) elem.style.transform = `scaleX(${width})`;
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
  <span bind:this={elem} class="active" />
  <span class="line" />
</div>
