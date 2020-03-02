<script>
  import info from "../assets/info.svg";
  import danger from "../assets/danger.svg";
  import warning from "../assets/warning.svg";
  export let type = "info";
  export let fluid = false;
  let warn, err, icon;
  icon = info;
  $: {
    warn = type === "warn";
    err = type === "error";
    if (warn) icon = warning;
    if (err) icon = danger;
  }
</script>

<style>
  div.wrap {
    display: flex;
    min-height: 60px;
    max-width: 240px;
    background-color: #d0f6ff;
    border: 1px solid #216778;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 8px;
  }
  div.wrap.fluid {
    max-width: 100%;
  }
  div.wrap.warn {
    background-color: #faf8b5;
    border-color: #a80;
  }
  div.wrap.err {
    background-color: #f5cccc;
    border-color: #a00;
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
    font-family: "Open Sans";
    font-size: 14px;
    color: #282828;
    line-height: 16px;
    display: flex;
    align-items: center;
  }
</style>

<div class:fluid class:warn class:err class="wrap">
  <span class="icon">
    {@html icon}
  </span>
  <div class="content">
    <div>
      <slot />
    </div>
  </div>
</div>
