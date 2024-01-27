<script context="module" lang="ts">
	import { setContext, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	export const ACCORDION = {};

	const active = writable<{}[]>([]);
	let multipleOpen = false;

	const remove = (state: {}[], el: {}) => {
		const i = state.indexOf(el);
		if (i === -1) {
			return state;
		}
		const newState = [...state];
		newState.splice(i, 1);
		return newState;
	};

	const add = (state: {}[], el: {}) => {
		if (!state.includes(el)) {
			return [...state, el];
		}
		return state;
	};

	const set = (state: {}[], el: {}) => {
		if (!state.includes(el)) {
			return [el];
		}
		return state;
	};

	const context = {
		registerRow: (row: {}) => {
			onDestroy(() => {
				active.update((current) => (current.includes(row) ? remove(current, row) : current));
			});
		},
		toggle: (row: {}) => {
			active.update((current) => {
				if (current.includes(row)) {
					return remove(current, row);
				} else {
					return multipleOpen ? add(current, row) : set(current, row);
				}
			});
		},
		active
	};

	export type Context = typeof context;
</script>

<script lang="ts">
	setContext(ACCORDION, context);
	export let multi = false;

	$: {
		multipleOpen = multi;
	}
</script>

<ul class="paper" {...$$restProps}>
	<slot />
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	ul.paper {
		border: solid 1px #ccc;
	}
</style>
