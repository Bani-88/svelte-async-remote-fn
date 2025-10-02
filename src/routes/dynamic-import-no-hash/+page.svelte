<script lang="ts">
	import { LoaderCircle } from '@lucide/svelte';
</script>

<div class="container mx-auto max-w-4xl py-8">
	<a href="/" class="mb-4 inline-block text-primary hover:underline"> ← Back to patterns </a>

	<h1 class="mb-2 text-3xl font-bold">Dynamic Import (No # Syntax Test)</h1>
	<p class="mb-8 text-muted-foreground">
		Testing if {'{await import()}'} works without the # symbol
	</p>

	<div class="rounded-lg border border-border bg-card p-6">
		<h2 class="mb-4 text-xl font-semibold">Pattern Comparison:</h2>
		<div class="mb-6 grid gap-4 md:grid-cols-2">
			<div>
				<h3 class="mb-2 text-sm font-semibold">With # (Standard)</h3>
				<pre class="overflow-x-auto rounded bg-muted p-3 text-xs"><code
						>{`{#await import('./component.svelte')}
  <p>Loading...</p>
{:then { default: Component }}
  <Component />
{/await}`}</code
					></pre>
			</div>
			<div>
				<h3 class="mb-2 text-sm font-semibold">Without # (Test)</h3>
				<pre class="overflow-x-auto rounded bg-muted p-3 text-xs"><code
						>{`{await import('./component.svelte') then { default: Component }}
  <Component />
{/await}`}</code
					></pre>
			</div>
		</div>

		<h2 class="mb-4 text-xl font-semibold">Test 1: Standard {'{#await}'} syntax</h2>
		<div class="mb-6 rounded-lg bg-muted p-6">
			{#await import('../async-dataloader.svelte')}
				<div class="flex items-center gap-2">
					<LoaderCircle class="size-4 animate-spin" />
					<span>Loading component with {'{#await}'} syntax...</span>
				</div>
			{:then { default: AsyncDataLoader }}
				<div class="space-y-2">
					<p class="font-semibold text-green-600 dark:text-green-400">
						✓ Standard {'{#await}'} syntax works!
					</p>
					<AsyncDataLoader />
				</div>
			{:catch error}
				<div class="text-destructive">
					<p class="font-semibold">✗ Failed with {'{#await}'}:</p>
					<p class="text-sm">{error.message}</p>
				</div>
			{/await}
		</div>

		<h2 class="mb-4 text-xl font-semibold">Test 2: Without # syntax (experimental)</h2>
		<div class="rounded-lg bg-muted p-6">
			<div class="rounded bg-yellow-50 p-4 dark:bg-yellow-900/30">
				<p class="text-sm">
					<strong>Note:</strong> The syntax
					<code class="rounded bg-muted px-1">{'{await}'}</code> without # is
					<strong>not valid</strong> in Svelte 5. The <code class="rounded bg-muted px-1">#</code>
					is required for block statements like await, if, each, etc.
				</p>
				<p class="mt-2 text-xs">
					If this code compiles, it would be displayed below. Otherwise, you'll see a compiler error
					in the console.
				</p>
			</div>

			<!-- This will likely cause a compile error, which is expected -->
			<!-- Commenting out to prevent build errors
      {await import('../async-dataloader.svelte') then { default: AsyncDataLoader }}
        <div class="space-y-2">
          <p class="text-green-600 dark:text-green-400 font-semibold">
            ✓ Syntax without # works! (unexpected)
          </p>
          <AsyncDataLoader />
        </div>
      {/await}
      -->

			<div class="mt-4 text-destructive">
				<p class="font-semibold">
					✗ Syntax {'{await}'} without # is invalid in Svelte 5
				</p>
				<p class="text-sm">
					Block statements require the # prefix. Use {'{#await}'} instead.
				</p>
			</div>
		</div>

		<div class="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
			<p class="text-sm">
				<strong>Conclusion:</strong> Svelte 5 requires the
				<code class="rounded bg-muted px-1">#</code>
				prefix for all block statements including
				<code class="rounded bg-muted px-1">{'{#await}'}</code>,
				<code class="rounded bg-muted px-1">{'{#if}'}</code>, and
				<code class="rounded bg-muted px-1">{'{#each}'}</code>. The syntax without
				<code class="rounded bg-muted px-1">#</code> is not valid and will cause a compiler error.
				Always use <code class="rounded bg-muted px-1">{'{#await}'}</code> for dynamic imports and async
				operations.
			</p>
		</div>
	</div>
</div>
