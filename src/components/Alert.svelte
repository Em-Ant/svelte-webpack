<script>
  import info from "../assets/info.svg";
  import danger from "../assets/danger.svg";
  import warning from "../assets/warning.svg";
  import success from "../assets/success.svg";
  export let type = "info";
  export let fluid = false;
  let warn, err, ok, icon;
  icon = info;
  $: {
    warn = type === "warn";
    err = type === "error";
    ok = type === "success";
    if (warn) icon = warning;
    if (err) icon = danger;
    if (ok) icon = success;
  }
</script>

<style>
  div.wrap {
    display: flex;
    min-height: 60px;
    min-width: 240px;
    background-color: #ceeeec;
    border: 1px solid #1b8d9b;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 8px;
  }
  div.wrap.fluid {
    width: 100%;
  }
  div.wrap.warn {
    background-color: #fcf0bd;
    border-color: #b69d03;
  }
  div.wrap.err {
    background-color: #fddddd;
    border-color: #bb1a18;
  }
  div.wrap.ok {
    background-color: #ecf2c2;
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
    font-family: "Open Sans";
    font-size: 14px;
    color: #282828;
    line-height: 16px;
    display: flex;
    align-items: center;
  }
</style>

<div class:fluid class:warn class:err class:ok class="wrap">
  <span class="icon">
    {@html icon}
  </span>
  <div class="content">
    <div>
      <slot />
    </div>
  </div>
</div>
