<script lang="ts">
	// import Tooltip from "./Tooltip.svelte";
	import infoIcon from '../assets/info_light.svg';

	export let infoOpen = false;
	export let closeInfoOnBlur = true;
	export let onInfoBlur = () => {};
	export let onInfoClick = () => {};

	let btn: HTMLButtonElement;

	function onClick() {
		infoOpen = !infoOpen;
		btn && btn.focus();
	}
	function onBlur() {
		if (closeInfoOnBlur) infoOpen = false;
	}
</script>

<div class="wrap">
	<label {...$$restProps}>
		<slot />
	</label>
	{#if $$slots.info}
		<button
			on:click={onClick}
			on:click={onInfoClick}
			on:blur={onBlur}
			on:blur={onInfoBlur}
			bind:this={btn}
			type="button"
		>
			<img src={infoIcon} alt={`info icon`} />
		</button>
	{/if}
	{#if infoOpen}
		<slot name="info" />
	{/if}
</div>

<style>
	div.wrap {
		position: relative;
		display: inline-flex;
		align-items: center;
		margin-bottom: 4px;
	}
	label {
		max-width: 180px;
		display: inline-block;
		font-weight: 600;
		font-size: 14px;
		flex-shrink: 0;
		flex-grow: 0;
	}
	label + button {
		height: 16px;
		width: 16px;
		display: inline-flex;
		border: none;
		border-radius: 50%;
		background: none;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin-left: 4px;
		cursor: pointer;
		outline: none;
	}
	label + button:focus {
		box-shadow: 0 0 1px 1px #f2f2f2, 0 0 1px 3px rgba(28, 129, 141, 1);
	}
</style>
