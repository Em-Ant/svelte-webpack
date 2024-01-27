<script lang="ts">
	import info from '$lib/assets/info.svg';
	import danger from '$lib/assets/danger.svg';
	import warning from '$lib/assets/warning.svg';
	import success from '$lib/assets/success.svg';
	export let type: 'warning' | 'info' | 'error' | 'success' = 'info';
	export let fluid = false;
	let warn: boolean, err: boolean, ok: boolean, icon: string;
	icon = info;
	$: {
		warn = type === 'warning';
		err = type === 'error';
		ok = type === 'success';
		if (warn) icon = warning;
		if (err) icon = danger;
		if (ok) icon = success;
	}
</script>

<div class:fluid class:warn class:err class:ok class="wrap">
	<span class="icon">
		<img src={icon} alt={`alert ${type} icon`} />
	</span>
	<div class="content">
		<div>
			<slot />
		</div>
	</div>
</div>

<style>
	div.wrap {
		display: flex;
		min-height: 60px;
		min-width: 240px;
		background-color: #fff;
		border: 1px solid #1b8d9b;
		box-sizing: border-box;
		padding: 8px;
	}
	div.wrap.fluid {
		width: 100%;
	}
	div.wrap.warn {
		border-color: #b69d03;
	}
	div.wrap.err {
		border-color: #bb1a18;
	}
	div.wrap.ok {
		border-color: #a2c14e;
	}
	div.wrap span.icon {
		display: flex;
		flex-shrink: 0;
		flex-grow: 0;
		width: 32px;
		align-items: center;
		justify-content: center;
		margin-right: 8px;
	}
	div.wrap div.content {
		font-size: 14px;
		color: #282828;
		line-height: 16px;
		display: flex;
		align-items: center;
	}
</style>
