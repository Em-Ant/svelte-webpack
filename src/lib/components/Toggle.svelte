<script lang="ts">
	export let disabled = false;
	export let on: boolean | undefined = false;
	export let error: boolean | undefined = undefined;
	export let ref: HTMLInputElement | undefined = undefined;
</script>

<div>
	<label class:disabled>
		<input
			{...$$restProps}
			{disabled}
			bind:this={ref}
			bind:checked={on}
			on:change
			on:click
			aria-invalid={error}
			type="checkbox"
		/>
		<span class="hole">
			<span class="toggle" />
		</span>
		<span>
			<slot />
		</span>
	</label>
</div>

<style>
	label {
		outline: none;
		transition: box-shadow 0.2s ease-out;
		outline: none;
		display: inline-flex;
		position: relative;
		align-items: center;
		font-family: 'Open Sans', sans-serif;
		font-size: 14px;
		line-height: 16px;
		margin-bottom: 8px;
		cursor: pointer;
	}
	label.disabled {
		pointer-events: none;
		cursor: auto;
	}
	label > input[type='checkbox'] {
		position: absolute;
		opacity: 0;
		margin: 0;
		top: 0;
		left: 0;
		height: 0;
		width: 0;
		z-index: -1;
	}
	span.hole {
		margin: 0;
		padding: 0;
		width: 48px;
		height: 24px;
		display: block;
		position: relative;
		margin-right: 8px;
		flex-shrink: 0;
		border-radius: 12px;
		box-shadow: inset 3px 3px 4px -1px rgba(0, 0, 0, 0.4);
		box-sizing: border-box;
		background-color: #aaa;
		position: relative;
		transition: background-color 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);
	}
	span.toggle {
		position: relative;
		top: 2px;
		left: 2px;
		display: block;
		height: calc(100% - 4px);
		width: calc(50% - 4px);
		background-color: white;
		border-radius: 11px;
		box-shadow: 2px 2px 3px -1px rgba(0, 0, 0, 0.2);
		transition: left 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95), box-shadow 0.2s ease-in-out,
			background-color 0.1s ease-in-out;
	}
	input:checked + span.hole {
		background-color: #1e838f;
	}
	input:checked + span.hole > span.toggle {
		left: calc(50% + 2px);
		box-shadow: -2px 2px 3px -1px rgba(0, 0, 0, 0.2);
	}
	input[aria-invalid='true'] + span.hole {
		background-color: #c06361;
	}
	input[aria-invalid='true']:checked + span.hole {
		background-color: #bb1b18;
	}
	input:disabled + span.hole {
		background-color: #a0a0a0;
	}
	input:disabled:checked + span.hole {
		background-color: #639297;
	}
	input[aria-invalid='true']:disabled + span.hole {
		background-color: #967a7a;
	}
	input:disabled + span.hole > span.toggle {
		background-color: #f2f2f2;
	}
	input:focus + span.hole {
		box-shadow: inset 3px 3px 4px -1px rgba(0, 0, 0, 0.4), 0 0 2px 1px #f2f2f2,
			0 0 1px 3px rgba(28, 129, 141, 1);
	}
</style>
