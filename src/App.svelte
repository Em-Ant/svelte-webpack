<script>
  import Checkbox from "./components/Checkbox.svelte";
  import Radio from "./components/Radio.svelte";
  import AnimatedButton from "./components/AnimatedButton.svelte";
  import Input from "./components/Input.svelte";
  import Accordion from "./components/Accordion.svelte";
  import Select from "./components/Select.svelte";
  let checked = true;
  let disabled = false;
  let loading;
  let success;
  let error;
  let group;
  let value = "";

  let input;

  let content;
  let scrolling;

  let options = ["option 1", "option 2", "option 3", "option 4"];

  $: if (!checked) {
    setTimeout(function() {
      success = false;
    }, 500);
  } else {
    setTimeout(function() {
      scrolling = content && content.scrollHeight > content.clientHeight;
    }, 200);
  }

  $: err = error || value === "error" ? "error message test" : "";

  function click() {
    loading = true;
    setTimeout(function() {
      loading = false;
      success = true;
      input && input.focus();
    }, 1500);
  }
  let o = true;
  let ctx = [];
  $: console.log(ctx);
</script>

<style>
  main {
    text-align: left;
    padding: 0 16px;
    width: 100%;
    margin: 0 auto;
    color: #333;
    display: flex;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }

  h1 {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: 400;
    margin: 16px;
  }

  p {
    font-size: 14px;
    line-height: 20px;
    margin: 8px;
  }

  div.wrap {
    width: 300px;
    height: 400px;
    margin: 0 16px 0 0;
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

<h1>Playground</h1>
<main>
  <div class="wrap">
    <div bind:this={content} class="content">
      <Checkbox bind:checked>visible</Checkbox>
      <Checkbox bind:checked={disabled}>disabled</Checkbox>
      <Checkbox error bind:checked={error}>error</Checkbox>
      <Radio name="a" bind:group value="1">option 1</Radio>
      <Radio {disabled} name="a" bind:group value="2">option 2</Radio>
      <Radio name="a" bind:group {error} value="3">option 3</Radio>
      <Select {options} name="select" {disabled} error={err} />
      <Input bind:elem={input} {disabled} error={err} bind:value postfix="$" />
      <Input fluid {disabled} error={err} bind:value postfix="$" />
    </div>
    <AnimatedButton
      {disabled}
      {loading}
      {success}
      elevate={scrolling}
      on:click={click}
      show={checked}>
      Click me !
    </AnimatedButton>
  </div>
  <div class="wrap">
    <Accordion bind:ctx>
      <span slot="header">Named slot !</span>
      <p>test</p>
      <p>test</p>
    </Accordion>
    <Accordion bind:ctx>
      <p>test</p>
      <p>test</p>
    </Accordion>
  </div>
</main>
