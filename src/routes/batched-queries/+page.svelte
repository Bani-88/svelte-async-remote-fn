<script lang="ts">
	import { getUserById, getPostsByUserId } from '../experimental.remote';
	import UserCard from './UserCard.svelte';
	import PostsCard from './PostsCard.svelte';

	// List of users to display - query.batch will batch all getUserById calls
	const userIds = ['alice', 'bob', 'charlie'];
</script>

<div class="container mx-auto max-w-4xl py-8">
	<div class="mb-8">
		<a href="/" class="text-sm text-muted-foreground hover:underline">&larr; Back to patterns</a>
	</div>

	<h1 class="mb-2 text-3xl font-bold">Batched Queries with query.batch()</h1>
	<p class="mb-8 text-muted-foreground">
		Using <code class="rounded bg-muted px-1 py-0.5">query.batch()</code> to solve the n+1 problem by
		batching multiple simultaneous queries into single server calls.
	</p>

	<h2 class="mb-4 text-xl font-semibold">Users</h2>
	<div class="mb-6 grid gap-4 md:grid-cols-3">
		{#each userIds as userId}
			<UserCard user={await getUserById(userId)} {userId} />
		{/each}
	</div>

	<h2 class="mb-4 text-xl font-semibold">Posts by User</h2>
	<div class="grid gap-4 md:grid-cols-3">
		{#each userIds as userId}
			<PostsCard posts={await getPostsByUserId(userId)} {userId} />
		{/each}
	</div>

	<div class="mt-8 rounded-lg border border-border bg-muted p-6">
		<h2 class="mb-2 text-lg font-semibold">How query.batch() works:</h2>
		<ul class="list-inside list-disc space-y-2 text-sm text-muted-foreground">
			<li>6 queries are called (3 users + 3 posts), but only 2 server functions are executed</li>
			<li>
				All <code class="rounded bg-background px-1 py-0.5">getUserById()</code> calls are batched together
			</li>
			<li>
				All <code class="rounded bg-background px-1 py-0.5">getPostsByUserId()</code> calls are batched
				together
			</li>
			<li>
				Each batch function receives an array of all arguments (e.g., ['alice', 'bob', 'charlie'])
			</li>
			<li>
				The batch function fetches all data in one go, then returns a resolver function for
				individual queries
			</li>
			<li>Check your server console logs to see batching in action!</li>
		</ul>
	</div>
</div>
