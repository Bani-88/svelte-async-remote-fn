<script lang="ts">
	import { getDelayedTime } from '../experimental.remote';
	import { LoaderCircle } from '@lucide/svelte';

	// Reactive delay parameter
	let delay = $state(1000);

	// Derived query that re-runs when delay changes
	let timeQuery = $derived(getDelayedTime({ delay }));
</script>

<div class="container mx-auto max-w-4xl py-8">
	<a href="/" class="mb-4 inline-block text-primary hover:underline"> ← Back to patterns </a>

	<h1 class="mb-2 text-3xl font-bold">Derived reactive query</h1>
	<p class="mb-8 text-muted-foreground">Using $derived() to create reactive queries</p>

	<div class="rounded-lg border border-border bg-card p-6">
		<h2 class="mb-4 text-xl font-semibold">Pattern Usage:</h2>
		<pre class="mb-6 overflow-x-auto rounded bg-muted p-4"><code
				>{`let delay = $state(1000);

// Query automatically re-runs when delay changes
let timeQuery = $derived(getDelayedTime({ delay }));`}</code
			></pre>

		<h2 class="mb-4 text-xl font-semibold">Live Demo:</h2>

		<!-- Delay selector -->
		<div class="mb-4">
			<label class="mb-2 block text-sm font-medium">
				Delay: {delay}ms
				<input
					type="range"
					bind:value={delay}
					min="500"
					max="3000"
					step="500"
					class="mt-2 w-full"
				/>
			</label>
			<div class="flex gap-2 text-xs text-muted-foreground">
				<button onclick={() => (delay = 500)} class="rounded border px-2 py-1 hover:bg-accent">
					500ms
				</button>
				<button onclick={() => (delay = 1000)} class="rounded border px-2 py-1 hover:bg-accent">
					1s
				</button>
				<button onclick={() => (delay = 2000)} class="rounded border px-2 py-1 hover:bg-accent">
					2s
				</button>
				<button onclick={() => (delay = 3000)} class="rounded border px-2 py-1 hover:bg-accent">
					3s
				</button>
			</div>
		</div>

		<!-- Query result -->
		<div class="rounded-lg bg-muted p-6">
			{#if timeQuery.loading}
				<div class="flex items-center gap-2">
					<LoaderCircle class="size-4 animate-spin" />
					<span>Loading data ({delay}ms delay)...</span>
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
						<p>Delay used: {timeQuery.current.delay}ms</p>
					</div>
				</div>
			{/if}
		</div>

		<div class="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
			<p class="text-sm">
				<strong>How it works:</strong> Using
				<code class="rounded bg-muted px-1">$derived()</code> creates a reactive query that automatically
				re-runs whenever its dependencies change. Change the delay slider above and watch the query re-execute
				with the new parameter.
			</p>
		</div>
	</div>
</div>
