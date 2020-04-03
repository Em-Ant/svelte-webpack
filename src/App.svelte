<script>
  import Checkbox from "./components/Checkbox.svelte";
  import Radio from "./components/Radio.svelte";
  import Button from "./components/Button.svelte";
  import Input from "./components/Input.svelte";
  import Accordion from "./components/Accordion.svelte";
  import Select from "./components/Select.svelte";
  import Alert from "./components/Alert.svelte";
  import Toggle from "./components/Toggle.svelte";
  import Modal from "./components/Modal.svelte";
  let checked = false;
  let disabled = false;
  let on;
  let loading;
  let success;
  let error;
  let group;
  let value = "";
  let input;

  let content;
  let scrolling;

  let options = ["option 1", "option 2", "option 3", "option 4"];

  let footer = false;

  $: if (!checked) {
    setTimeout(function() {
      success = false;
      footer = false;
    }, 500);
  }

  $: err = error || value === "error" ? "error message test" : "";

  function click() {
    loading = true;
    setTimeout(function() {
      loading = false;
      success = true;
      open = true;
      input && input.focus();
    }, 1500);
    setTimeout(function() {
      footer = false;
      checked = false;
    }, 2000);
  }
  let ctx = [];
</script>

<style>
  main {
    text-align: left;
    padding: 0 16px;
    width: 100%;
    margin: 0 auto;
    color: #333;
    display: flex;
    flex-wrap: wrap;
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

  div.wrap,
  form.wrap {
    width: 300px;
    height: 400px;
    margin: 0 16px 16px 0;
    background-color: #e2e2e2;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    flex-shrink: 0;
  }
  .wrap.pad {
    padding: 8px;
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
  div.alerts {
    margin: 8px 0;
  }
  div.alerts > :global(div.wrap:not(:last-of-type)) {
    margin-bottom: 8px;
  }
  div.t {
    background-color: #ddd;
    height: 800px;
  }
  div.btn {
    flex-grow: 1;
    padding: 0 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<h1>Playground</h1>
<main>
  {#if checked}
    <Modal {footer} mobile bind:open={checked}>
      <h3 slot="header">Modal</h3>
      <div class="t" on:click={() => (footer = !footer)} />
      <div class="btn" slot="footer">
        <Button fluid on:click={click} {loading} {success} {disabled}>
          Click me !
        </Button>
      </div>

    </Modal>
  {/if}
  <form class="wrap" on:submit|preventDefault>
    <div bind:this={content} class="content">
      <Checkbox {disabled} name="c1" bind:checked>visible</Checkbox>
      <Checkbox name="c2" bind:checked={disabled}>disabled</Checkbox>
      <Checkbox name="c3" error bind:checked={error}>error</Checkbox>
      <Radio name="r" bind:group value="1">option 1</Radio>
      <Radio {disabled} name="r" bind:group value="2">option 2</Radio>
      <Radio name="r" bind:group {error} value="3">option 3</Radio>
      <Toggle name="t1" bind:on>toggle 1</Toggle>
      <Toggle name="t2" on={!on} {disabled} {error}>toggle 2</Toggle>
      <Select {options} name="s" {disabled} error={err} />
      <Input
        name="i1"
        bind:elem={input}
        {disabled}
        error={err}
        bind:value
        postfix="$" />
    </div>
  </form>
  <div class="wrap pad">
    <Accordion bind:ctx>
      <span slot="header">Named slot !</span>
      <p>test</p>
      <p>test</p>
    </Accordion>
    <Accordion bind:ctx>
      <p>test</p>
      <p>test</p>
    </Accordion>
    <div class="alerts">
      <Alert fluid type="info">Info message !</Alert>
      <Alert fluid type="success">Success message !</Alert>
      <Alert fluid type="warn">Warning message !</Alert>
      <Alert fluid type="error">Error message !</Alert>
    </div>
  </div>
</main>
