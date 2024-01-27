<script lang="ts">
	import { Accordion, Row } from '$lib/components/Accordion';
	import Alert from '$lib/components/Alert.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import Select from '$lib/components/Select.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Radio from '$lib/components/Radio.svelte';
	import Button from '$lib/components/Button.svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import Slider from '$lib/components/Slider.svelte';

	let disabled = false;
	let on = false;
	let loading;
	let success;
	let error = '';
	let checked = false;
	let hasError = false;
	let group: string;
	let value = '';
	let input: HTMLInputElement;

	let sliderVal: number;

	$: hasError ? (error = 'error test') : (error = '');

	const options = ['option 1', 'option 2', 'option 3', 'option 4'];
</script>

<h1>Components Playground</h1>
<main>
	<form class="wrap pad">
		<Label for="i1">
			<span>Input</span>
			<span slot="info">info</span>
		</Label>
		<Input name="i1" {disabled} id="i1" bind:value postfix="$" {error} />
		<Label>
			<span>Select</span>
		</Label>
		<Select {options} name="select" {disabled} {error} />
		<div>
			<Checkbox {disabled} name="visible" bind:checked>open modal</Checkbox>
			<Checkbox name="disabled" bind:checked={disabled}>disabled</Checkbox>
			<Checkbox name="error" error bind:checked={hasError}>error</Checkbox>
		</div>
		<div class="mt">
			<Radio name="radio" bind:group value="1">option 1</Radio>
			<Radio {disabled} name="radio" bind:group value="2">option 2</Radio>
			<Radio name="radio" bind:group error={!!error} value="3">option 3</Radio>
		</div>
		<div class="mt">
			<Toggle name="toggle_1" bind:on>toggle 1</Toggle>
			<Toggle name="toggle_2" on={!on} {disabled} error={hasError}>toggle 2</Toggle>
		</div>
		<div class="mt-2">
			<Button {disabled} secondary={on} type="submit">Submit</Button>
		</div>
	</form>
	<div class="wrap pad">
		<Accordion>
			<Row>
				<span slot="header">Click Me!</span>
				<p>test</p>
			</Row>
			<Row>
				<span slot="header">Named slot</span>
				<p>test II</p>
			</Row>
		</Accordion>
		<div class="alerts">
			<Alert fluid type="info">Info message !</Alert>
			<Alert fluid type="success">Success message !</Alert>
			<Alert fluid type="warning">Warning message !</Alert>
			<Alert fluid type="error">Error message !</Alert>
		</div>
	</div>
	<div class="wrap pad">
		<Slider step={10} showPopover bind:value={sliderVal}>
			<span slot="popover">{`${sliderVal} %`}</span>
		</Slider>
	</div>
</main>

<style>
	main {
		text-align: left;
		padding: 0 16px;
		width: 100%;
		margin: 0 auto;
		color: #333;
		display: flex;
		flex-wrap: wrap;
	}

	h1 {
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

	.wrap {
		width: 100%;
		height: 520px;
		margin: 0 16px 16px 0;
		background-color: #e2e2e2;
		overflow-y: auto;
		align-items: flex-start;
		flex-shrink: 0;
	}
	.wrap.pad {
		padding: 8px;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
		.wrap {
			max-width: 300px;
		}
	}
	div.alerts {
		margin: 8px 0;
		width: 100%;
	}
	div.alerts > :global(div.wrap:not(:last-of-type)) {
		margin-bottom: 8px;
	}
	.mt {
		margin-top: 8px;
	}
	.mt-2 {
		margin-top: 16px;
	}
</style>
