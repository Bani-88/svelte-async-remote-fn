<script lang="ts">
	import { getDelayedTime } from '../experimental.remote';
	import { LoaderCircle } from '@lucide/svelte';
</script>

<div class="container mx-auto max-w-4xl py-8">
	<a href="/" class="mb-4 inline-block text-primary hover:underline"> ← Back to patterns </a>

	<h1 class="mb-2 text-3xl font-bold">Top-level await</h1>
	<p class="mb-8 text-muted-foreground">Using {'{#await query()}'} directly in template</p>

	<div class="rounded-lg border border-border bg-card p-6">
		<h2 class="mb-4 text-xl font-semibold">Pattern Usage:</h2>
		<pre class="mb-6 overflow-x-auto rounded bg-muted p-4"><code
				>{`{#await getDelayedTime({ delay: 1500 })}
  <p>Loading...</p>
{:then data}
  <p>Time: {data.timestamp}</p>
{:catch error}
  <p>Error: {error.message}</p>
{/await}`}</code
			></pre>

		<h2 class="mb-4 text-xl font-semibold">Live Demo:</h2>
		<div class="rounded-lg bg-muted p-6">
			{#await getDelayedTime({ delay: 1500 })}
				<div class="flex items-center gap-2">
					<LoaderCircle class="size-4 animate-spin" />
					<span>Loading data (1.5s delay)...</span>
				</div>
			{:then data}
				<div class="space-y-2">
					<p class="text-lg font-semibold">✓ Data loaded successfully!</p>
					<div class="space-y-1 text-sm text-muted-foreground">
						<p>Timestamp: {data.timestamp}</p>
						<p>User ID: {data.userId}</p>
						<p>Delay: {data.delay}ms</p>
					</div>
				</div>
			{:catch error}
				<div class="text-destructive">
					<p class="font-semibold">✗ Error occurred:</p>
					<p class="text-sm">{error.message}</p>
				</div>
			{/await}
		</div>

		<div class="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
			<p class="text-sm">
				<strong>How it works:</strong> The {'{#await}'} block automatically handles the promise returned
				by the query function. It shows loading state while waiting, then displays data when resolved,
				or error if rejected. This pattern is simple but reloads on every page navigation.
			</p>
		</div>
	</div>
</div>
