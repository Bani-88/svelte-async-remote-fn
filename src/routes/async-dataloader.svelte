<script lang="ts">
	import { getDelayedTime } from './experimental.remote';
	import { LoaderCircle } from '@lucide/svelte';

	// Top-level await inside a dynamically imported component
</script>

<div class="space-y-4">
	<div class="rounded-lg bg-blue-100 p-4 dark:bg-blue-900/30">
		<p class="text-sm font-semibold">✓ Component loaded successfully via dynamic import!</p>
		<p class="mt-1 text-xs text-muted-foreground">
			This component was lazy-loaded using {'{#await import()}'}.
		</p>
	</div>

	<div class="rounded-lg bg-muted p-4">
		<h3 class="mb-3 text-sm font-semibold">Data from top-level await inside component:</h3>
		{#await getDelayedTime({ delay: 1000 })}
			<div class="flex items-center gap-2">
				<LoaderCircle class="size-4 animate-spin" />
				<span class="text-sm">Loading data inside dynamically imported component...</span>
			</div>
		{:then data}
			<div class="space-y-1 text-sm text-muted-foreground">
				<p>✓ Data loaded inside dynamic component!</p>
				<p>Timestamp: {data.timestamp}</p>
				<p>User ID: {data.userId}</p>
				<p>Delay: {data.delay}ms</p>
			</div>
		{:catch error}
			<div class="text-sm text-destructive">
				<p>Error: {error.message}</p>
			</div>
		{/await}
	</div>
</div>
