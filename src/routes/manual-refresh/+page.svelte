<script lang="ts">
	import { getDelayedTime } from '../experimental.remote';
	import { LoaderCircle, RefreshCw } from '@lucide/svelte';

	// Call query once
	let timeQuery = getDelayedTime({ delay: 1000 });

	let refreshCount = $state(0);

	async function handleRefresh() {
		refreshCount++;
		await timeQuery.refresh();
	}
</script>

<div class="container mx-auto max-w-4xl py-8">
	<a href="/" class="mb-4 inline-block text-primary hover:underline"> ← Back to patterns </a>

	<h1 class="mb-2 text-3xl font-bold">Manual refresh</h1>
	<p class="mb-8 text-muted-foreground">Calling .refresh() method on demand</p>

	<div class="rounded-lg border border-border bg-card p-6">
		<h2 class="mb-4 text-xl font-semibold">Pattern Usage:</h2>
		<pre class="mb-6 overflow-x-auto rounded bg-muted p-4"><code
				>{`let timeQuery = getDelayedTime({ delay: 1000 });

async function handleRefresh() {
  await timeQuery.refresh();
}`}</code
			></pre>

		<h2 class="mb-4 text-xl font-semibold">Live Demo:</h2>

		<!-- Refresh button -->
		<div class="mb-4">
			<button
				onclick={handleRefresh}
				disabled={timeQuery.loading}
				class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{#if timeQuery.loading}
					<LoaderCircle class="size-4 animate-spin" />
					Refreshing...
				{:else}
					<RefreshCw class="size-4" />
					Refresh Data
				{/if}
			</button>
			<span class="ml-4 text-sm text-muted-foreground">Refreshed {refreshCount} times</span>
		</div>

		<!-- Query result -->
		<div class="rounded-lg bg-muted p-6">
			{#if timeQuery.loading}
				<div class="flex items-center gap-2">
					<LoaderCircle class="size-4 animate-spin" />
					<span>Loading data (1s delay)...</span>
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
				<strong>How it works:</strong> The query is called once on mount. You can manually trigger a
				refresh by calling <code class="rounded bg-muted px-1">.refresh()</code> method. This is useful
				for "Reload" buttons or polling intervals. The button is disabled during loading to prevent duplicate
				requests.
			</p>
		</div>
	</div>
</div>
