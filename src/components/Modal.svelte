<script>
  import { onMount, onDestroy } from "svelte";
  import { fade, fly } from "svelte/transition";

  import cross from "../assets/cross.svg";

  export let footer = false;
  export let mobile = false;
  export let open = false;
  export let onClose;
  export let autofocus = false;

  let close;
  let isMobile;

  function setIsMobile() {
    const { width } = document.body.getBoundingClientRect();
    if (width <= 400) isMobile = true;
    else isMobile = false;
  }
  setIsMobile();

  $: fly_y = mobile && isMobile ? 200 : -80;
  let shadow_f = false,
    shadow_h = false,
    content;

  function setShadows() {
    shadow_h = content.scrollTop !== 0;
    shadow_f =
      content.scrollHeight - content.scrollTop !== content.clientHeight &&
      content.scrollHeight !== content.clientHeight;
  }
  $: if (footer) {
    setTimeout(setShadows, 100);
  }

  let nonModalNodes;
  function lockFocus() {
    const modalNodes = Array.from(
      document.querySelectorAll("div[data-lock] *")
    );
    nonModalNodes = document.querySelectorAll('body *:not([tabindex="-1"])');

    for (var i = 0; i < nonModalNodes.length; i++) {
      var node = nonModalNodes[i];

      if (!modalNodes.includes(node)) {
        node._prevTabindex = node.getAttribute("tabindex");
        node.setAttribute("tabindex", -1);
        node.style.outline = "none";
      }
    }
  }
  function unlockFocus() {
    document.body.style.overflow = null;
    for (var i = 0; i < nonModalNodes.length; i++) {
      var node = nonModalNodes[i];
      if (node._prevTabindex) {
        node.setAttribute("tabindex", node._prevTabindex);
        node._prevTabindex = null;
      } else {
        node.removeAttribute("tabindex");
      }
      node.style.outline = null;
    }
  }
  function lockScroll() {
    document.body.style.overflow = "hidden";
  }
  function unlockScroll() {
    document.body.style.overflow = "";
  }

  function focusCloseBtn() {
    if (autofocus && onClose) {
      close.focus();
    }
  }

  onMount(function() {
    setShadows();
    lockFocus();
    lockScroll();
    focusCloseBtn();
  });
  onDestroy(function() {
    unlockFocus();
    unlockScroll();
  });
</script>

<style>
  div[data-lock] {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  div.backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: -1;
  }
  div.modal {
    min-width: 280px;
    max-width: 444px;
    width: calc(100vw - 48px);
    margin: 40px auto;
    min-height: 200px;
    max-height: calc(100vh - 200px);
    background-color: white;
    opacity: 1;
    border-radius: 4px;
    box-shadow: 0 3px 3px -1px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-content: flex-start;
  }
  div.header {
    min-height: 52px;
    transition: box-shadow 0.2s ease-in-out;
    flex-grow: 0;
    flex-shrink: 0;
    z-index: 1;
    display: flex;
  }
  div.header.shadow {
    box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.3);
  }
  div.header-content {
    flex-grow: 1;
    display: flex;
    align-items: center;
    padding-left: 16px;
  }
  div.content {
    flex-grow: 1;
    flex-shrink: 1;
    overflow-y: auto;
    padding: 0 16px;
  }
  div.footer {
    height: 0;
    transition: box-shadow 0.2s ease-in-out;
    z-index: 1;
    flex-grow: 0;
    flex-shrink: 0;
    overflow: hidden;
    transition: height 0.2s cubic-bezier(0.47, 0, 0.745, 0.715),
      box-shadow 0.2s ease-in;
  }
  div.footer > div.inner {
    overflow: hidden;
    height: 60px;
    display: flex;
    align-items: center;
  }
  div.footer.shadow {
    box-shadow: 0 -2px 3px -1px rgba(0, 0, 0, 0.3);
  }
  div.footer.in {
    height: 60px;
  }
  span.close {
    display: flex;
    height: 52px;
    width: 52px;
    justify-content: center;
    align-items: center;
  }
  button.close {
    border-radius: 50%;
    display: block;
    height: 40px;
    width: 40px;
    border: none;
    background-color: transparent;
    transition: background-color 0.2s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    outline: none;
  }
  button.close:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  button.close:active {
    background-color: rgba(26, 53, 128, 0.2);
  }
  button.close:focus {
    box-shadow: 0 0 1px 2px rgba(28, 129, 141, 1);
  }
  @media screen and (max-width: 400px) {
    div.modal.mobile {
      position: absolute;
      bottom: 0;
      margin: 0;
      width: 100vw;
      max-height: calc(100vh - 100px);
      border-radius: 8px 8px 0 0;
    }
  }
</style>

<svelte:window on:resize={setIsMobile} />
<div data-lock>
  <div
    class="backdrop"
    in:fade={{ duration: 200 }}
    out:fade={{ duration: 200 }} />
  <div
    class="modal"
    class:mobile
    in:fly={{ delay: 200, y: fly_y, duration: 200 }}
    out:fly={{ y: fly_y, duration: 200 }}>
    <div class="header" class:shadow={shadow_h}>
      <div class="header-content">
        <slot name="header" />
      </div>
      {#if onClose}
        <span class="close">
          <button
            bind:this={close}
            class="close"
            on:click={() => {
              open = false;
              if (onClose && typeof onClose === 'function') {
                onClose();
              }
            }}>
            {@html cross}
          </button>
        </span>
      {/if}
    </div>
    <div bind:this={content} on:scroll={setShadows} class="content">
      <slot />
    </div>
    <div class="footer" class:in={footer} class:shadow={shadow_f && footer}>
      <div class="inner">
        <slot name="footer" />
      </div>
    </div>
  </div>
</div>
