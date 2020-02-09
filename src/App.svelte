<script>
  import Checkbox from "./components/Checkbox.svelte";
  import Radio from "./components/Radio.svelte";
  import AnimatedButton from "./components/AnimatedButton.svelte";
  import Input from "./components/Input.svelte";
  let checked = true;
  let disabled = false;
  let loading;
  let success;
  let error;
  let group;
  let value = "";

  $: if (!checked)
    setTimeout(function() {
      success = false;
    }, 500);

  $: err = error || value === "error" ? "error message test" : "";

  function click() {
    loading = true;
    setTimeout(function() {
      loading = false;
      success = true;
    }, 1500);
  }
</script>

<style>
  main {
    text-align: left;
    padding: 16px;
    max-width: 240px;
    margin: 0 auto;
    color: #333;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: 400;
    margin: 0 0 24px;
  }

  div.wrap {
    max-width: 300px;
    height: 400px;
    background-color: #e2e2e2;
    display: flex;
    flex-direction: column;
  }
  div.content {
    flex-grow: 1;
    padding: 8px;
    overflow-y: auto;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Playground</h1>
  <div class="wrap">
    <div class="content">
      <Checkbox bind:checked>visible</Checkbox>
      <Checkbox bind:checked={disabled}>disabled</Checkbox>
      <Checkbox error bind:checked={error}>error</Checkbox>
      <Radio name="a" bind:group value="1">option 1</Radio>
      <Radio {disabled} name="a" bind:group value="2">option 2</Radio>
      <Radio name="a" bind:group {error} value="3">option 3</Radio>
      <Input {disabled} error={err} bind:value postfix="$" />
      <Input {disabled} error={err} bind:value postfix="$" />
    </div>
    <AnimatedButton
      {disabled}
      {loading}
      {success}
      on:click={click}
      show={checked}>
      Click me !
    </AnimatedButton>
  </div>
</main>
