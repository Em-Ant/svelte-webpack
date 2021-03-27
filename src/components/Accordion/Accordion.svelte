<script context="module">
	export const ACCORDION = {};
</script>

<script>
	import { setContext, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

  const rows = [];
  const active = writable(null);

  setContext(ACCORDION, {
		registerRow: row => {
			rows.push(row);
			
			onDestroy(() => {
				const i = rows.indexOf(row);
				rows.splice(i, 1);
				active.update(current => current === row ? null : current);
			});
		},
    toggle: row => {
			active.update(current => row === current ? null : row);
		},
    active
  });

</script>
<style>
    div.paper {
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4), 0 0 3px -1px rgba(0, 0, 0, 0.2);
  }
</style>

<div class="paper">
  <slot></slot>
</div>