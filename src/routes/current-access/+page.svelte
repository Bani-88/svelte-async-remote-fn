<script lang="ts">
	import { getDelayedTime } from '../experimental.remote';
	import { LoaderCircle } from '@lucide/svelte';

	// Call query and store the result
	let timeQuery = getDelayedTime({ delay: 1500 });
</script>

<div class="container mx-auto max-w-4xl py-8">
	<a href="/" class="mb-4 inline-block text-primary hover:underline"> ← Back to patterns </a>

	<h1 class="mb-2 text-3xl font-bold">Direct .current access</h1>
	<p class="mb-8 text-muted-foreground">Accessing query().current property in script</p>

	<div class="rounded-lg border border-border bg-card p-6">
		<h2 class="mb-4 text-xl font-semibold">Pattern Usage:</h2>
		<pre class="mb-6 overflow-x-auto rounded bg-muted p-4"><code
				>{`let timeQuery = getDelayedTime({ delay: 1500 });

// Access properties:
// timeQuery.current - the data (or undefined if loading)
// timeQuery.loading - boolean loading state
// timeQuery.error - error object (or undefined)`}</code
			></pre>

		<h2 class="mb-4 text-xl font-semibold">Live Demo:</h2>
		<div class="rounded-lg bg-muted p-6">
			{#if timeQuery.loading}
				<div class="flex items-center gap-2">
					<LoaderCircle class="size-4 animate-spin" />
					<span>Loading data (1.5s delay)...</span>
				</div>
			{:else if timeQuery.error}
				<div class="text-destructive">
					<p class="font-semibold">✗ Error occurred:</p>
					<p class="text-sm">{timeQuery.error.message}</p>
				</div>
			{:else if timeQuery.current}
				<div class="space-y-2">
					<p class="text-lg font-semibold">✓ Data loaded successfully!</p>
					<div class="space-y-1 text-sm text-muted-foreground">
						<p>Timestamp: {timeQuery.current.timestamp}</p>
						<p>User ID: {timeQuery.current.userId}</p>
						<p>Delay: {timeQuery.current.delay}ms</p>
					</div>
				</div>
			{/if}
		</div>

		<div class="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
			<p class="text-sm">
				<strong>How it works:</strong> The query returns an object with reactive properties. You
				access <code class="rounded bg-muted px-1">.current</code> for the data,
				<code class="rounded bg-muted px-1">.loading</code> for loading state, and
				<code class="rounded bg-muted px-1">.error</code>
				for errors. This gives you more control over the UI than {'{#await}'}.
			</p>
		</div>
	</div>
</div>
