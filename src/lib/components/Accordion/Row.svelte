<script lang="ts">
	import { getContext } from 'svelte';
	import { ACCORDION, type Context } from './Accordion.svelte';

	const row = {};
	const { registerRow, toggle, active } = getContext<Context>(ACCORDION);

	registerRow(row);

	function scroll(node: HTMLElement, { delay = 0, duration = 200 } = {}) {
		const height = node.scrollHeight;
		return {
			delay,
			duration,
			css: (t: number) => `height: ${t * height}px;`
		};
	}

	const handleClick = () => {
		toggle(row);
	};

	$: open = $active.includes(row);
</script>

<li>
	<button class:open type="button" on:click on:click={handleClick}>
		<span class="signal" />
		<slot name="header" />
		<span class="arrow">
			<svg
				width="12"
				height="8"
				version="1.1"
				viewBox="0 0 4.2333 2.1167"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g transform="translate(-89.648 -153.89)">
					<path
						d="m93.881 154.08a0.19308 0.19277 0 0 0-0.32364-0.13237l-1.7878
          1.6059-1.7898-1.6059a0.19308 0.19277 0 1 0-0.25736 0.28613l1.9184
          1.7227a0.19308 0.19277 0 0 0 0.25734 0l1.9184-1.7227a0.19308 0.19277 0
          0 0 0.06428-0.15379z"
						color="#000000"
						color-rendering="auto"
						dominant-baseline="auto"
						fill="#282828"
						image-rendering="auto"
						shape-rendering="auto"
						style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;isolation:auto;mix-blend-mode:normal;paint-order:markers
          fill
          stroke;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"
					/>
				</g>
			</svg>
		</span>
	</button>
	{#if open}
		<div transition:scroll class="content">
			<slot />
		</div>
	{/if}
</li>

<style>
	li {
		list-style: none;
	}
	li:not(:last-child) {
		border-bottom: 1px solid #ccc;
	}

	button {
		outline: none;
		background-color: #fff;
		min-height: 48px;
		display: block;
		border: none;
		width: 100%;
		cursor: pointer;
		position: relative;
		font-family: 'Open Sans', sans-serif;
		color: #282828;
		padding: 0 40px 0 16px;
		text-align: left;
		font-size: 14px;
		box-sizing: border-box;
	}
	button:after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 2;
		background: transparent;
	}
	button > span.arrow {
		position: absolute;
		display: flex;
		height: 100%;
		right: 0;
		top: 0;
		padding: 0 18px;
		align-items: center;
		transition: all 0.2s ease-in;
	}
	button > span.arrow > svg {
		transition: transform 0.2s cubic-bezier(0.445, 0.05, 0.55, 0.95);
	}
	button > span.arrow > svg > g > path {
		transition: fill 0.2s ease-in-out;
	}
	button.open > span.arrow > svg {
		transform: rotate(-180deg);
	}
	button.open > span.arrow > svg > g > path {
		fill: #bb1b18;
	}
	div.content {
		overflow: hidden;
		background-color: #fff;
		flex-shrink: 0;
		width: 100%;
		border-top: 1px solid #ccc;
	}
	span.signal {
		display: block;
		height: 100%;
		width: 0;
		left: 0;
		top: 0;
		position: absolute;
		background-color: #bb1b18;
		transition: width 0.1s ease-in;
	}
	button:hover > span.signal,
	button.open > span.signal {
		width: 2px;
	}
	button:focus-visible:after {
		outline: 2px solid #639297;
		outline-offset: 4px;
	}
</style>
